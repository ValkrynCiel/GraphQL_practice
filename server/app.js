const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

/**
 * middleware that allows express to pass off graphql queries to module
 */
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3001, () => {
  console.log('now listening for requests on port 3001');
});