import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    country: String,
    email: {
        type: String,
        required: [true, 'email field is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    roles: String
}, {
    timestamps: true
});

userSchema.post('validate', (doc, next) => {
    doc.password = bcrypt.hashSync(doc.password, 10);

    return next();
});

userSchema.statics.seed = async function () {
    try {
        const users = await this.find();
        if (!users.length) {
            const user = new User({
                email: 'admin@gmail.com',
                password: '123456',
                role: 'admin'
            });
            user.save((err) => {
                if (err) console.log(err);
            });
        }
    } catch (e) {
        console.log(e);
    }
};

const User = mongoose.model('User', userSchema);

User.seed();

export default User;