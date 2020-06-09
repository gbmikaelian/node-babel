import Controller from './Controller';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ERROR } from 'src/modules';

import User from 'src/models/User';

class AuthController extends Controller {
    async signUp (req, res) {
        try {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });

            await user.save();

            const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

            return res.json({ token, user });
        } catch (e) {
            super.handleError(res, e);
        }
    }

    async signIn (req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                throw new Error(ERROR.EMAIL);
            }
            if (!req.body.password) {
                throw new Error(ERROR.PASSWORD);
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                throw new Error(ERROR.PASSWORD);
            }

            return res.json({ token: jwt.sign({ id: user.id }, process.env.JWT_KEY) });
        } catch (e) {
            super.handleError(res, e);
        }
    }
}

export default AuthController;
