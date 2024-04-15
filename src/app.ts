import express, { Request, Response } from 'express';
import { setRoutes } from './routes';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
setRoutes(app);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});