
export default class Controller {
    assign (content, receiver, Model) {
        for (const key in content) {
            if (Model && !Model.protectedFields.includes(key)) {
                try {
                    receiver[key] = JSON.parse(content[key]);
                } catch (error) {
                    receiver[key] = content[key];
                }
            }
        }
    }

    handleError (res, e, status) {
        try {
            e = JSON.parse(e.message);
        } catch (e) {}

        if (e.name === 'BadRequestError') {
            res.status(400).json(Object.values(e.errors)[0]);
        } else if (e.name === 'ValidationError') {
            res.status(400).json(Object.values(e.errors)[0]);
        } else if (e.name === 'ConflictError') {
            res.status(409).json({ message: Object.values(e.errors)[0] });
        } else if (status) {
            res.status(status).json({ message: e.message });
        } else {
            res.status(502).json({ message: e.message });
        }
        console.log(e);
    }
}