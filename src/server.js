import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'src/middlewares/passport';
import { api as apiRoutes, auth as authRoutes } from 'src/routes';
import { name } from '../package';

const app = express();

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

app.use(passport.initialize());

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(name);
});

app.use('/auth', authRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('%s is listening at port %s', name, port));