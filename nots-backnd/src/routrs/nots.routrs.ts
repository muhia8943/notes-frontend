import { Router } from 'express';
import { NoteController } from '../controllrs/nots';

const router: Router = Router();
const noteController = new NoteController();

router.get('/notes', noteController.getNotes);
router.get('/notes/:id', noteController.getNoteById);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

export default router;