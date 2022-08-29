import 'reflect-metadata';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import 'graphql-import-node';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import application from './application';

dotenv.config({ path: __dirname + '/.env' });

const executor = application.createApolloExecutor();
const schema = application.schema;

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
    schema: schema,
    executor: executor,
    validationRules: [depthLimit(7)],
});

app.use(cors());
app.use(compression());

server.start().then((res) => {
    server.applyMiddleware({ app, path: '/graphql' });
    httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
});
