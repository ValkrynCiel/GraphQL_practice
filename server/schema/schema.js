const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLInt,
  GraphQLID
} = graphql;

//dummy data
let books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' }
]

let authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Prachett', age: 66, id: '3' }
]

/**
 * schema for BookType with id, name, genre, author fields
 * 
 * resolve function in author uses parent param (e.g. the book that is found)
 */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

/**
 * schema for AuthorType with id, name, age fields
 */
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
})