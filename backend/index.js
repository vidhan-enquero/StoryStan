require("dotenv").config({ path: "./.env" });

const express = require("express");
// const { Server } = require("socket.io");

// Started the application
const app = express();

// Middleware for telling which kind of requests that we will be accepting
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});

app.use(express.json());

const notificationServer = require("http").createServer(app);

const io = new Server(notificationServer, {
  cors: {
    origin: "*",
  },
});

// const socketNamespace = io.of("/notifications");

const usersSocket = new Map();

io.on("connection", (socket) => {
  console.log("Client connected for notifications");

  socket.on("authenticate", async ({ accessToken }) => {
    const userId = await getUserId(accessToken);
    if (userId === undefined) {
      return;
    } else {
      usersSocket.set(userId, socket.id);
      console.log(usersSocket);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of usersSocket.entries()) {
      if (socketId === socket.id) {
        usersSocket.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

notificationServer.listen(4001, () => {
  console.log("Notification Server listening on port 4001");
});

module.exports = {
  usersSocket: usersSocket,
  socketNamespace: io,
};

const signup = require("./auth/signup");
const login = require("./auth/login");
const logout = require("./auth/logout");
const { token } = require("./auth/token");
const update = require("./auth/update");
const trade = require("./users/trade");
const support = require("./supportapi/support");
const buysell = require("./users/buysell");
const forgotpass = require("./auth/forgotpass");

const verifyUser = require("./auth/verify");

const userinfo = require("./auth/userinfo");
const transaction = require("./users/transaction");
const setProfilePic = require("./users/setProfilePic");
const getProfilePic = require("./users/getProfilePic");
const orders = require("./users/orders");
const portfolio = require("./users/portfolio");
const shares = require("./users/shares");
const walletBalance = require("./users/walletbalance");
const deposit = require("./users/deposit");
const withdraw = require("./users/withdraw");
const transactions = require("./users/transactions");
const { getUserId } = require("./auth/usd");

// Serve the Socket.IO client library
// app.get("/socket.io/socket.io.js", (req, res) => {
//   res.sendFile(__dirname + "/node_modules/socket.io-client/dist/socket.io.js");
// });

// Set up routes for login, register, tokens, etc.
app.use("/api/auth/login", login);
app.use("/api/auth/signup", signup);

app.use("/api/auth/logout", logout);
// TODO: Implement the token api for refreshing the tokens
app.use("/api/auth/tokens", token);
app.use("/api/auth/forgotpass", forgotpass);
app.use("/api/auth/update", update);
// Set up other routes for your application
app.use("/api/users", buysell);
app.use("/api/users/trade", trade);
// app.use("/posts", posts);
app.use("/api/support", support);
app.use("/api/auth/verifyUser", verifyUser);

app.use("/api/userinfo", userinfo);
app.use("/api/users/transaction", transaction);
app.use("/api/users/getProfileImage", getProfilePic);
app.use("/api/users/setProfileImage", setProfilePic);
app.use("/api/users/orders", orders);
app.use("/api/users/portfolio", portfolio);
app.use("/api/users/walletbalance", walletBalance);
app.use("/api/users/deposit", deposit);
app.use("/api/users/withdraw", withdraw);
app.use("/api/users/shares", shares);
app.use("/api/users/transactions", transactions);

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
