// import 'reflect-metadata';
// import { ApolloServer } from 'apollo-server-express';
// import express from 'express';
// import { buildSchema, Query, Resolver } from 'type-graphql';
// // import { createConnection } from 'type'

// @Resolver()
// class HelloResolver {
//   @Query(() => String, { name: 'helloWorld'})
//   async hello() {
//     return "hello world";
//   }
// }

// const main = async () => {
//   const schema = await buildSchema({
//     resolvers: [HelloResolver],
//   });

//   const apolloServer = new ApolloServer({ schema });

//   const app = express();

//   apolloServer.applyMiddleware({ app });

//   app.listen(4000, () => {
//     console.log('server started on http://localhost:4000/graphql');
//   })
// };

// main();

