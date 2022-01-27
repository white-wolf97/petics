import express from 'express';
import AuthController from '../../../../controllers/authController';

const authController = new AuthController();

const router = express.Router();

router.post('/auth/login', express.json(), authController.login);

router.post('/auth/logout', express.json(), authController.logout);

export default router;
