import express from 'express';
import Hello from './hello.js';
import cors from 'cors';
import Lab5 from './Lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js';
import moongose from "mongoose";
import UserRoutes from './users/routes.js';
import session from "express-session";
import "dotenv/config";

const app = express();   
moongose.connect("mongodb://127.0.0.1:27017/kanbas");
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
app.use(express.json());
ModuleRoutes(app);
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
