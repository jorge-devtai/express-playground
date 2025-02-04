import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World');
})


const PORT = process.env.PORT;

app.listen(PORT, () => {    
    console.log(`Server is running on port http://localhost:${PORT}`);
}) ;
