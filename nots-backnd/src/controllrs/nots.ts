import { Request, Response } from 'express';
import { NoteService } from '../srvics/nots.svcs';
import { Note } from '../interfaces/int';

const noteService = new NoteService();

export class NoteController {
  public async getNotes(req: Request, res: Response): Promise<void> {
    try {
      const notes = await noteService.getAllNotes();
      res.status(200).json(notes);
    } catch (err:any) {
      res.status(500).send(err.message);
    }
  }

  public async getNoteById(req: Request, res: Response): Promise<void> {
    try {
      const note = await noteService.getNoteById(Number(req.params.id));
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).send('Note not found');
      }
    } catch (err:any) {
      res.status(500).send(err.message);
    }
  }

  public async createNote(req: Request, res: Response): Promise<void> {
    try {
      const note: Note = req.body;
      await noteService.createNote(note);
      res.status(201).send('Note created successfully');
    } catch (err:any) {
      res.status(500).send(err.message);
    }
  }

  public async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const note: Note = req.body;
      await noteService.updateNote(Number(req.params.id), note);
      res.status(200).send('Note updated successfully');
    } catch (err:any) {
      res.status(500).send(err.message);
    }
  }

  public async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      await noteService.deleteNote(Number(req.params.id));
      res.status(200).send('Note deleted successfully');
    } catch (err:any) {
      res.status(500).send(err.message);
    }
  }
}
