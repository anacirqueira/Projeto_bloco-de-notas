import NotesView from "./NotesView";
import NotesApi from "./NotesAPI";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

   _refreshNotes() {
     const notes = NotesApi.getAllNotes();

     this.setNotes(notes);

     if(notes.length > 0) {
       this._setActiveNote(notes[0]);
     }
    
    }

    _setNotes(notes) {
      this.notes = notes;
      this.view.updateNoteList(notes);
      this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
      this.activeNote = note;
      this.view.updateActiveNote(note);
    }

    _handlers() {
      return {
        onNoteSelect: noteId => {
          const selectedNote = this.notes.find(note => note.id == noteId);
          this._setActiveNote(selectedNote);
        },

        onNoteAdd: () => {
          const newNote = {
            title: "New Note",
            body: "Take note..."
          };

          NotesApi.saveNote(newNote);
          this._refreshNotes();
        },

        onNoteEdit: (title, body) => {
          NotesApi.saveNote({
            id: this.activeNote.id,
            title,
            body
          });

          this._refreshNotes();
        },

        onNoteDelete: noteId => {
          NotesApi.deleteNote(noteId);
          this._refreshNotes();
        },
      };
    }
}