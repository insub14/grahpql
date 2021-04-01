import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { Query, Resolver } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/userResolver';
import { ProjectResolver } from './resolvers/projectResolver';

dotenv.config();

const schema = buildSchemaSync({
  resolvers: [UserResolver, ProjectResolver],
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
const apolloServer = new ApolloServer({ schema });

apolloServer.applyMiddleware({ app, cors: false });

const prod: boolean = process.env.NODE_ENV === 'production';
const port = prod ? process.env.PORT : 3000;

app.use(morgan('dev'));
app.use(compression());

app.listen(port, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:${port}/graphql`))
