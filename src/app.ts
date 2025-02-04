import express  from 'express';
import router  from './products/productsRouter';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json())


app.use('/products', router);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});