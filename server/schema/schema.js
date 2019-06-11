const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

/**
 * schema for BookType with id, name, genre fields
 */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

/**
 * RootQuery: how one enters the graph
 * 
 * args allow for searching a specific book,
 * 
 * resolve function allows for retrieving data and uses args property (can also be async and allows for API calls)
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
})