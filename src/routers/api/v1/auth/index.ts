import express from 'express';
import AuthController from '../../../../controllers/authController';

const router = express.Router();

router.post('/auth/login', express.json(), AuthController.login);

router.post('/auth/logout', express.json(), AuthController.logout);

export default router;
