import express from 'express';
import { PORT } from './config/env.js';
import authRouter from "./routes/authRouter.js"
import userRoter from "./routes/userRouter.js"
import errorMiddleware from "./middleware/error.middleware.js"
import { connectToDatabase } from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import subScriptionRouter from './routes/subscriptionRouter.js';
import workflowRouter from './routes/workflow.route.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRoter)
app.use("/api/v1/subScription", subScriptionRouter)
app.use("/api/v1/workflow", workflowRouter)

app.use(errorMiddleware)
app.get('/', function (req, res) {
  res.send('welcome to subscription tracing API');
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectToDatabase();
});