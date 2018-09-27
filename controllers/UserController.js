import Controller from './Controller';
// import User from '../models/User';
// import { ERROR } from '../modules';

export default class extends Controller {
    static async me (req, res) {
        try {
            return res.json({ success: true, user: req.user });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }
}