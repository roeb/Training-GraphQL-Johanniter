import { MockList } from '@graphql-tools/mock';
import { faker } from '@faker-js/faker';

faker.setLocale('de');

export default {
  Query: () => ({
    attendees: () => new MockList([2, 20]),
  }),
  Attendee: () => ({
    id: () => faker.datatype.number({ min: 0, max: 89 }),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    userName: () => faker.internet.userName(),
    emailAddress: () => faker.internet.email(),
  }),
};
