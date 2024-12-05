"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apollo_server_1 = require("apollo-server");
const prisma = new client_1.PrismaClient();
const typeDefs = (0, apollo_server_1.gql) `
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo!
    updateTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;
const resolvers = {
    Query: {
        getTodos: async (_, args, context) => {
            return await context.prisma.todo.findMany();
        },
    },
    Mutation: {
        addTodo: (_, { title }, context) => {
            return context.prisma.todo.create({
                data: {
                    title,
                    completed: false,
                }
            });
        },
        updateTodo: (_, { id, completed }, context) => {
            return context.prisma.todo.update({
                where: { id },
                data: { completed },
            });
        },
        deleteTodo: (_, { id }, context) => {
            return context.prisma.todo.delete({
                where: { id },
            });
        },
    },
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ prisma }),
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
//# sourceMappingURL=server.js.map