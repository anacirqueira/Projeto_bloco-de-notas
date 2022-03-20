import NotesView from "./NotesView";
import NotesApi from "./NotesAPI";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  
}