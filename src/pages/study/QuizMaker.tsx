import { useState, useEffect } from 'react';
import { Plus, Play, Edit, Trash2, CheckCircle, XCircle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';
import { Quiz, QuizQuestion, QuizResult } from '@/types';
import { saveQuiz, getQuizzes, getQuiz, saveQuizResult, getProgress, updateProgress } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

const QuizMaker = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isTaking, setIsTaking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (user) {
      const userQuizzes = getQuizzes(user.id);
      setQuizzes(userQuizzes);
    }
  }, [user]);

  const createNewQuiz = () => {
    setQuizTitle('');
    setQuestions([{
      id: `q_${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    }]);
    setIsCreating(true);
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q_${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const saveQuizData = () => {
    if (!user || !quizTitle.trim() || questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()))) {
      toast({
        title: "Error",
        description: "Please fill in all fields for the quiz and questions.",
        variant: "destructive",
      });
      return;
    }

    const quiz: Quiz = {
      id: `quiz_${Date.now()}`,
      title: quizTitle,
      questions,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    saveQuiz(quiz);
    
    const userQuizzes = getQuizzes(user.id);
    setQuizzes(userQuizzes);
    
    setIsCreating(false);
    toast({
      title: "Quiz Created!",
      description: "Your quiz has been saved successfully.",
    });
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    setIsTaking(true);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    if (!currentQuiz || !user) return;

    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === currentQuiz.questions[index].correctAnswer
    ).length;

    const result: QuizResult = {
      id: `result_${Date.now()}`,
      quizId: currentQuiz.id,
      score: correctAnswers,
      totalQuestions: currentQuiz.questions.length,
      timeTaken: 0, // Could implement timer
      completedAt: new Date().toISOString(),
      userId: user.id,
    };

    saveQuizResult(result);

    // Update progress
    const progress = getProgress(user.id);
    const updatedProgress = {
      ...progress,
      quizzes: {
        quizzesTaken: progress.quizzes.quizzesTaken + 1,
        correctAnswers: progress.quizzes.correctAnswers + correctAnswers,
        totalQuestions: progress.quizzes.totalQuestions + currentQuiz.questions.length,
        lastQuiz: new Date().toISOString(),
      }
    };
    updateProgress(updatedProgress);

    toast({
      title: "Quiz Completed!",
      description: `You scored ${correctAnswers}/${currentQuiz.questions.length} (${Math.round((correctAnswers / currentQuiz.questions.length) * 100)}%)`,
    });

    setIsTaking(false);
    setCurrentQuiz(null);
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/10 to-primary/10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Create Quiz</h1>
              <p className="text-muted-foreground text-lg">Build a custom quiz to test your knowledge</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setIsCreating(false)} variant="outline">Cancel</Button>
              <Button onClick={saveQuizData} className="btn-success">Save Quiz</Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="card-elevated">
              <CardContent className="p-6">
                <Label htmlFor="quizTitle" className="text-lg font-semibold mb-2 block">Quiz Title</Label>
                <Input
                  id="quizTitle"
                  placeholder="Enter quiz title..."
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="text-lg"
                />
              </CardContent>
            </Card>

            {questions.map((question, questionIndex) => (
              <Card key={question.id} className="card-elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                    {questions.length > 1 && (
                      <Button
                        onClick={() => removeQuestion(questionIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`question-${questionIndex}`} className="font-medium mb-2 block">Question</Label>
                    <Input
                      id={`question-${questionIndex}`}
                      placeholder="Enter your question..."
                      value={question.question}
                      onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="font-medium mb-2 block">Answer Options</Label>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroup
                            value={question.correctAnswer.toString()}
                            onValueChange={(value) => updateQuestion(questionIndex, 'correctAnswer', parseInt(value))}
                          >
                            <RadioGroupItem value={optionIndex.toString()} />
                          </RadioGroup>
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                            className="flex-1"
                          />
                          {question.correctAnswer === optionIndex && (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="card-elevated border-dashed">
              <CardContent className="p-6 text-center">
                <Button onClick={addQuestion} variant="ghost" className="w-full">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Another Question
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isTaking && currentQuiz) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-success/10 to-primary/10 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{currentQuiz.title}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {currentQuestionIndex + 1} / {currentQuiz.questions.length}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="progress-bar h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                      className={`w-full justify-start p-4 h-auto ${
                        selectedAnswers[currentQuestionIndex] === index ? 'btn-primary' : ''
                      }`}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevQuestion}
                  variant="outline"
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                  <Button
                    onClick={finishQuiz}
                    className="btn-success"
                    disabled={selectedAnswers[currentQuestionIndex] === -1}
                  >
                    Finish Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="btn-primary"
                    disabled={selectedAnswers[currentQuestionIndex] === -1}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 to-primary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Quiz Maker</h1>
            <p className="text-muted-foreground text-lg">
              Create and take custom quizzes to test your knowledge
            </p>
          </div>
          <Button onClick={createNewQuiz} className="btn-success">
            <Plus className="w-5 h-5 mr-2" />
            Create Quiz
          </Button>
        </div>

        {quizzes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="card-study">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{quiz.title}</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>{quiz.questions.length} questions</span>
                    <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => startQuiz(quiz)}
                      className="btn-primary flex-1"
                      size="sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="card-elevated text-center py-12">
            <CardContent>
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Quizzes Yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first quiz to start testing your knowledge
              </p>
              <Button onClick={createNewQuiz} className="btn-success">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizMaker;