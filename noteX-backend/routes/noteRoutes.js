import { Router } from 'express';
import { createNoteController, deleteNoteController, getAllNotesController, getOneNoteController, updateNoteController } from '../controllers/noteController.js';

const router = Router();

// routing
router.get('/:id', getOneNoteController);

router.post('/create', createNoteController);

router.put('/update', updateNoteController);

router.delete('/:id', deleteNoteController);

router.get('/', getAllNotesController);

export default router;