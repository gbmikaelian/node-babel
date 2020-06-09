import Controller from './Controller';

export default class extends Controller {
    async me (req, res) {
        try {
            return res.json({ success: true, user: req.user });
        } catch (e) {
            super.handleError(res, e);
        }
    }
}