require("dotenv").config({ path: "./.env" });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const {onRequest} = require("firebase-fucn")
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineInt, defineString } = require("firebase-functions/params");

// const { onRe } = require("firebase-functions/v2/https");

const cors = require("cors")({ origin: true });

admin.initializeApp();

// const minInstancesConfig = defineInt("10");
// const welcomeMessage = defineString("WELCOME_MESSAGE");
const apiKey = process.env.PALM_API_KEY;

const auth = admin.auth();

const firestore = admin.firestore();

// exports.saveStory = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(400).send("INVALID REQUEST!");
//   }
//   const story = req.body.story;
//   const token = req.body.token;

//   if (!prompt || !token) {
//     return res.status(400).send({
//       message: "Missing Body Fields"
//     });
//   }

//   let userId, email;
//   try {
//     const decoded = await auth.verifyIdToken(token);
//     userId = decoded.uid;
//     email = decoded.email;
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       message: "Unverified User!."
//     });
//   }

//   try {
//     await firestore.collection("story").add({
//       userId: userId,
//       story: story,
//       likes: 0,
//       comments: []
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// exports.testFunction = functions.https.testFunction(async(req))

// exports.generateStory = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(400).send("INVALID REQUEST!.");
//   }

//   const prompt = req.body.prompt;
//   const token = req.body.token;

//   if (!prompt || !token) {
//     return res.status(400).send({
//       message: "Missing Body Fields"
//     });
//   }

//   let userId, email;
//   try {
//     const decoded = await auth.verifyIdToken(token);
//     userId = decoded.uid;
//     email = decoded.email;
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       message: "Unverified User!."
//     });
//   }
//   // console.log(userId, email);
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         prompt: {
//           text: prompt
//         }
//       })
//     }
//   ).then((res) => {
//     return res.json();
//   });
//   // console.log(response)
//   return res.status(200).send(response);
// });

// exports.getGreeting = onCall(
//   { cors: [/firebase\.com$/, "flutter.com"] },
//   (request) => {
//     return "Hello, world!";
//   }
// );

// const { onCall } = require("firebase-functions/v2/https");

// exports.getGreeting = onCall(
//   { cors: [/firebase\.com$/, "flutter.com"] },
//   (request) => {
//     return "Hello, world!";
//   }
// );

const getStory = async (prompt) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: {
          text: prompt
        }
      })
    }
  ).then((res) => {
    return res.json();
  });

  return response.candidates[0].output;
};

exports.postStory = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(400).send({
        messaage: "Bad Request!"
      });
    }
    const accessToken = req.body.token;
    const story = req.body.story;

    let userId, email;

    try {
      const decoded = await auth.verifyIdToken(accessToken);
      userId = decoded.uid;
      email = decoded.email;

      // store the story in the database
      await firestore.collection("story").add({
        userId: userId,
        content: story,
        likes: 0,
        comments: []
      });

      return res.status(200).send({
        message: "Posted The story."
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: "Unverified User!."
      });
    }
  });
});

exports.generateStory = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(400).send({
        messaage: "Bad Request!"
      });
    }
    const accessToken = req.body.token;
    const prompt = req.body.prompt;

    let userId, email;
    try {
      const decoded = await auth.verifyIdToken(accessToken);
      userId = decoded.uid;
      email = decoded.email;
      const story = await getStory(prompt);
      return res.status(200).send({ story: story });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: "Unverified User!."
      });
    }
  });
});

// exports.verifyUser = functions.https.onRequest(async (req, res) => {
//   cors(req, res, async () => {
//     if (req.method !== "POST") {
//       return res.status(400).send({
//         messaage: "Bad Request!"
//       });
//     }
//     console.log(userId);
//     console.log(email);

//     return res.status(200).send({
//       message: "You have been verified"
//     });
//   });
// });
