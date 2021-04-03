import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/userResolver';
import { ProjectResolver } from './resolvers/projectResolver';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { refreshToken } from './refreshToken';
import { CodeResolver } from './resolvers/codeResolver';

dotenv.config();

const schema = buildSchemaSync({
  resolvers: [
    UserResolver, 
    ProjectResolver,
    CodeResolver
  ],
});


const app = express();
async function initialize() {
  try {
    await createConnection();
    console.log('DB Connected');
  } catch (e) {
    console.log(e);
  }
}
initialize();
const apolloServer = new ApolloServer({ 
  schema,
  context: ({ req, res }) => ({ req, res }),
});


const prod: boolean = process.env.NODE_ENV === 'production';
const port = prod ? process.env.PORT : 7777;

app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.post('/refresh-token', refreshToken)

apolloServer.applyMiddleware({ app, cors: false, path:"/" });

app.listen(port, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:${port}`))
