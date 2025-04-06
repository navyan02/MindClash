require("dotenv").config();
const PORT = process.env.PORT || 3000;
require("firebase/firestore");
const firebase = require("firebase-admin");
const express = require("express");
const http = require("http");
const cors = require("cors");
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: process.env.FIREBASE_DB_URL,
});


const db = firebase.firestore();
const app = express();

const whitelist = [
  "http://localhost:8000",
  "http://localhost:9000",
  "https://dominate-fe.onrender.com",
  "http://dominate-fe.onrender.com",
  "http://dominate.codes",
  "https://dominate.codes",
  "https://0be9-153-33-24-118.ngrok-free.app", // your ngrok URL
];

const corsOptions = {
  origin: function (origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/leaderboard", async (req, res) => {
  const snapshot = await db.collection("leaderboard")
    .orderBy("score", "desc")
    .limit(100)
    .get();
  const leaderboard = [];
  snapshot.forEach((doc) => leaderboard.push(doc.data()));
  res.send(leaderboard);
});

app.get("/stats", async (req, res) => {
  const snapshot = await db.collection("rooms").get();
  const rooms = [];
  const activeRooms = [];
  let activePlayers = 0;
  snapshot.forEach((doc) => {
    const { gameStart, gameEnd, players } = doc.data();
    rooms.push(true);
    if (gameStart && !gameEnd) {
      activeRooms.push(true);
      activePlayers += players.length;
    }
  });
  res.send({
    activeRooms: activeRooms.length,
    gamesPlayed: rooms.length,
    online: activePlayers,
  });
});

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: function (origin, callback) {
      const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    },
  },
});

io.on("connection", (socket) => {
  require("./game")(socket, io, firebase);
  require("./users")(socket, io);
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
