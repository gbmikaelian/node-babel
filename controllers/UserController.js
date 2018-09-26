import Controller from './Controller';
import User from '../models/User';

export default class extends Controller {
    static async me (req, res) {
        try {
            let user = await User.findById(req.user._id);
            return res.json({ user });
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    }
}