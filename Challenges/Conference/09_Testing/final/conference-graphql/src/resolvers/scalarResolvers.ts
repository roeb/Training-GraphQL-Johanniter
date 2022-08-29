import { GraphQLScalarType, Kind } from 'graphql';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return new Date(value as Date).toISOString();
    },
    parseValue(value) {
      return new Date(value as Date);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),
};
