const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

//oauth
const cors = require('cors');
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');




const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //oauth
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/getAccessToken', async function (req, res) {

    const params = '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret=' + process.env.GITHUB_CLIENT_SECRET + '&code=' + req.query.code;

    await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then ((data) => {
      res.redirect(process.env.ROOT_URL + `/profile/?token=${data.access_token}`)
    })
  });

  //getUserData
  //access token is going to be passed in as an authorization header

  app.get('/getUserData', async function (req, res) {
    req.get('Authorization'); //Bearer ACCESSTOKEN
    await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization' : req.get('Authorization') //Bearer ACCESSTOKEN
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      res.json(data);
    });
    
  })


  

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
    });
  });
};

// Call the async function to start the server
startApolloServer();
