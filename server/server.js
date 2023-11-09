const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
// ---------kenny
const cors = require("cors");
// ----------kenny

const Profile = require("./models/Profile");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

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
  // cors allows https...etc--kenny
  app.use(cors());
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  // -------kenny
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // -----------kenny

  app.get("/", cors(), (req, res) => {});

  app.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
      const check = await Profile.findOne({ username: username });

      if (check) {
        res.json("exists");
      } else {
        res.json("notexist");
      }
    } catch (e) {
      res.json("notexist");
    }
  });

  app.get("/Signup", cors(), (req, res) => {});

  app.post("/Signup", async (req, res) => {
    const { username, email, password } = req.body;

    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const check = await Profile.findOne({ email: email });

      if (check) {
        res.json("Already exists");
      } else {
        res.json("not exist");
        await Profile.insertMany({ data });
      }
    } catch (e) {
      res.json("notexist");
    }
  });
  // --------kenny

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
