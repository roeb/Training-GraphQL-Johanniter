import 'graphql-import-node';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '../src/resolvers';
import typeDefs from '../src/typeDefs';
import SpeakerData from '../src/data/speakerData';
import SessionData from '../src/data/sessionData';
import AttendeeData from '../src/data/attendeeData';
import { mysqlConnection, mssqlConnection } from '../src/dbConfig';
import mocks from '../src/mocks';

let apolloServer: ApolloServer | undefined;

beforeAll(() => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                speakerDb: new SpeakerData(mysqlConnection),
                sessionApi: new SessionData(),
                attendeeApi: new AttendeeData(),
            };
        },
        mocks: mocks,
    });

    apolloServer = server;
});

export const GET_ALL_ATTENDEES = gql`
    query GetAllAttendees {
        attendees {
            id
            firstName
            lastName
            emailAddress
            userName
        }
    }
`;

test('Get_All_Attendess_Should_No_Be_Empty', async () => {
    if (apolloServer === undefined) throw new Error('Apollo Server is missing');

    const result = await apolloServer.executeOperation({
        query: GET_ALL_ATTENDEES,
    });
    expect(result.errors).toBeUndefined();
    expect(result.data).toBeDefined();
    expect(result.data?.attendees.length).toBeGreaterThanOrEqual(2);
    expect(result.data?.attendees[0].firstName).toBeDefined();
});
