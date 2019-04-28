const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4444;
require('dotenv').config({ path: '.env' });

const cors = require('cors');
const corsOptions = {
  origion: 'http://localhost:3000',
  credentials: true
};

const jwt = require('jsonwebtoken');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const User = require('./models/User');
const { Story, Comment } = require('./models/Story');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(cors(corsOptions));

app.use(async (req, resp, next) => {
    const token = req.headers.authorization;

    if (token && token !== 'null') {
        try {
            const currentUser = await jwt.verify(token, process.env.TOKEN_SECRET);
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err);
        }
    }

    next();
});

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
  schema,
  context: {
    currentUser,
    User,
    Story,
    Comment
  }
})));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.err(err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
