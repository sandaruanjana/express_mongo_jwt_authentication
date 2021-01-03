import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

import db from './config/db';

import UserRoute from './route/UserRoute';
import passport from "passport";


dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

require('./config/passport');


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/user',UserRoute);


type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

db.then(()=>{
    const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });

      if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
      }
}).catch(err=>{
    console.log('try Again!') ;
});

