"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const nots_svcs_1 = require("../srvics/nots.svcs");
const noteService = new nots_svcs_1.NoteService();
class NoteController {
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield noteService.getAllNotes();
                res.status(200).json(notes);
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    getNoteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield noteService.getNoteById(Number(req.params.id));
                if (note) {
                    res.status(200).json(note);
                }
                else {
                    res.status(404).send('Note not found');
                }
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = req.body;
                yield noteService.createNote(note);
                res.status(201).send('Note created successfully');
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = req.body;
                yield noteService.updateNote(Number(req.params.id), note);
                res.status(200).send('Note updated successfully');
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield noteService.deleteNote(Number(req.params.id));
                res.status(200).send('Note deleted successfully');
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
}
exports.NoteController = NoteController;
