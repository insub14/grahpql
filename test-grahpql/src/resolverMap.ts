import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, string: string): string {
      return string;
    },
  },
};

export default resolverMap;