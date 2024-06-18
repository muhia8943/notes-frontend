import express from 'express';
import bodyParser from 'body-parser';
import noteRouter from './routrs/nots.routrs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api', noteRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
