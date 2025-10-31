import { useState, useEffect } from 'react';
import { Save, Plus, BookOpen, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { CornellNote } from '@/types';
import { saveCornellNote, getCornellNotes, getProgress, updateProgress } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

const CornellNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<CornellNote[]>([]);
  const [currentNote, setCurrentNote] = useState<CornellNote>({
    id: '',
    title: '',
    notes: '',
    cues: '',
    summary: '',
    createdAt: '',
    userId: user?.id || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      const userNotes = getCornellNotes(user.id);
      setNotes(userNotes);
    }
  }, [user]);

  const createNewNote = () => {
    setCurrentNote({
      id: '',
      title: '',
      notes: '',
      cues: '',
      summary: '',
      createdAt: '',
      userId: user?.id || '',
    });
    setIsEditing(true);
  };

  const saveNote = () => {
    if (!user || !currentNote.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    const noteToSave: CornellNote = {
      ...currentNote,
      id: currentNote.id || `note_${Date.now()}`,
      createdAt: currentNote.createdAt || new Date().toISOString(),
      userId: user.id,
    };

    saveCornellNote(noteToSave);
    
    // Update progress
    const progress = getProgress(user.id);
    const updatedProgress = {
      ...progress,
      cornellNotes: {
        notesCreated: progress.cornellNotes.notesCreated + (currentNote.id ? 0 : 1),
        lastNote: new Date().toISOString(),
      }
    };
    updateProgress(updatedProgress);

    // Refresh notes list
    const userNotes = getCornellNotes(user.id);
    setNotes(userNotes);
    
    setIsEditing(false);
    toast({
      title: "Note Saved!",
      description: "Your Cornell note has been saved successfully.",
    });
  };

  const loadNote = (note: CornellNote) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-focus/10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Cornell Notes</h1>
              <p className="text-muted-foreground text-lg">
                Organize your learning with the proven Cornell note-taking system
              </p>
            </div>
            <Button onClick={createNewNote} className="btn-primary mt-4 md:mt-0">
              <Plus className="w-5 h-5 mr-2" />
              New Note
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="card-study cursor-pointer" onClick={() => loadNote(note)}>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {note.notes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                          <p className="text-sm line-clamp-3">{note.notes}</p>
                        </div>
                      )}
                      {note.summary && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Summary</p>
                          <p className="text-sm line-clamp-2 text-primary">{note.summary}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="card-elevated text-center py-12">
              <CardContent>
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Notes Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first Cornell note to start organizing your learning
                </p>
                <Button onClick={createNewNote} className="btn-primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Note
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-focus/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              {currentNote.id ? 'Edit Note' : 'New Cornell Note'}
            </h1>
            <p className="text-muted-foreground text-lg">
              Structure your learning with the Cornell method
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Back to Notes
            </Button>
            <Button onClick={saveNote} className="btn-success">
              <Save className="w-5 h-5 mr-2" />
              Save Note
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Note Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <Card className="card-elevated">
              <CardContent className="p-6">
                <Label htmlFor="title" className="text-lg font-semibold mb-2 block">Note Title</Label>
                <Input
                  id="title"
                  placeholder="Enter note title..."
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="text-lg"
                />
              </CardContent>
            </Card>

            {/* Cornell Layout */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Cues Section */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg text-accent">Cues & Keywords</CardTitle>
                  <CardDescription>Key points, questions, and concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write down key terms, questions, and important concepts..."
                    value={currentNote.cues}
                    onChange={(e) => setCurrentNote({ ...currentNote, cues: e.target.value })}
                    className="min-h-[300px] resize-none"
                  />
                </CardContent>
              </Card>

              {/* Notes Section */}
              <div className="md:col-span-2">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Main Notes</CardTitle>
                    <CardDescription>Detailed notes from lecture or reading</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Take detailed notes here during lectures or while reading. Focus on main ideas, examples, and important details..."
                      value={currentNote.notes}
                      onChange={(e) => setCurrentNote({ ...currentNote, notes: e.target.value })}
                      className="min-h-[300px] resize-none"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Summary Section */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg text-success">Summary</CardTitle>
                <CardDescription>Summarize the main points in your own words</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a brief summary of the main points and key takeaways..."
                  value={currentNote.summary}
                  onChange={(e) => setCurrentNote({ ...currentNote, summary: e.target.value })}
                  className="min-h-[120px] resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Cornell Method Guide */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Cornell Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-accent mb-2">1. Cues & Keywords</h4>
                  <p className="text-muted-foreground">Write key terms, questions, and concepts that relate to your notes.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">2. Main Notes</h4>
                  <p className="text-muted-foreground">Take detailed notes during lectures or while reading.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-success mb-2">3. Summary</h4>
                  <p className="text-muted-foreground">Summarize the main points in your own words.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Use abbreviations and symbols</p>
                <p>• Leave white space for clarity</p>
                <p>• Review within 24 hours</p>
                <p>• Use the cues section for self-testing</p>
                <p>• Make connections between ideas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CornellNotes;