import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import statsRoute from './routes/stats';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/stats', statsRoute);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    (!err) ? console.log(`Connection to MongoDB succcessful`) : console.log('Connection to MongoDB failed');
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));