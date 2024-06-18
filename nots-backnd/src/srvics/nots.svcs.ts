import { poolPromise } from '../config/sql.config';
import { Note } from '../interfaces/int';
import * as sql from 'mssql';

export class NoteService {
  public async getAllNotes(): Promise<Note[]> {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Notes');
    return result.recordset;
  }

  public async getNoteById(id: number): Promise<Note | null> {
    const pool = await poolPromise;
    const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Notes WHERE id = @id');
    return result.recordset.length ? result.recordset[0] : null;
  }

  public async createNote(note: Note): Promise<void> {
    const pool = await poolPromise;
    await pool.request()
      .input('title', sql.NVarChar, note.title)
      .input('content', sql.NVarChar, note.content)
      .query('INSERT INTO Notes (title, content, createdAt, updatedAt) VALUES (@title, @content, GETDATE(), GETDATE())');
  }

  public async updateNote(id: number, note: Note): Promise<void> {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, note.title)
      .input('content', sql.NVarChar, note.content)
      .query('UPDATE Notes SET title = @title, content = @content, updatedAt = GETDATE() WHERE id = @id');
  }

  public async deleteNote(id: number): Promise<void> {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Notes WHERE id = @id');
  }
}
