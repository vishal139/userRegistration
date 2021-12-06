import express from 'express'
import { UserController } from '../Controller';

const router = express.Router();

router.post("/register",UserController.register);

export default router;