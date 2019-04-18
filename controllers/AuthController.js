import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ERROR } from '../modules';

import { User } from '../models/';

export default class {
    signUp = async (req, res) => {
        try {
            let user = new User({
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles
            });

            await user.save();

            let token = jwt.sign({ id: user.id }, process.env.JWT_KEY || 'your-key');

            return res.json({ token, user });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }
    signIn = async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                throw new Error(ERROR.EMAIL);
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                throw new Error(ERROR.PASSWORD);
            }

            return res.json({ token: jwt.sign({ id: user.id }, process.env.JWT_KEY || 'your-key') });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }
}