import express from 'express';
import middleware from './middleware';
import { api as apiRoutes, auth as authRoutes } from './routes';
import 'dotenv/config';

const app = express();

app.use('/api', middleware, apiRoutes);
app.use('/auth', authRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`));