import 'graphql-import-node';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import SessionData from './data/sessionData';
import SpeakerData from './data/speakerData';
import { mssqlConnection, mysqlConnection } from './dbConfig';
import AttendeeData from './data/attendeeData';
import { ApolloServerPluginUsageReporting } from 'apollo-server-core';

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    dataSources: () => {
        return {
            speakerDb: new SpeakerData(mysqlConnection),
            sessionApi: new SessionData(),
            attendeeApi: new AttendeeData(),
        };
    },
    validationRules: [depthLimit(7)],
    plugins: [
        ApolloServerPluginUsageReporting({
            sendVariableValues: { all: true },
            sendHeaders: { all: true },
            generateClientInfo: ({ request }) => {
                const headers = request.http && request.http.headers;
                if (headers) {
                    return {
                        clientName: headers['apollographql-client-name'],
                        clientVersion: headers['apollographql-client-version'],
                        userAgent: headers['user-agent'],
                    };
                } else {
                    return {
                        clientName: 'Unknown Client',
                        clientVersion: 'Unversioned',
                        userAgent: 'Unkown userAgent',
                    };
                }
            },
        }),
    ],
});

app.use(cors());
app.use(compression());

server.start().then((res) => {
    server.applyMiddleware({ app, path: '/graphql' });

    const httpServer = createServer(app);
    httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
});
