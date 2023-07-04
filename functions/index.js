require("dotenv").config({ path: "./.env" });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const apiKey = process.env.PALM_API_KEY

exports.generateStory = functions.https.onRequest(async(req , res)=>{
  // return res.status(200).send({message : "hi"})
  // Check if the user is verified or not
  // const prompt = req.body.prompt;
  // if(!prompt){
  //   return res.status(400).send({
  //     message : "Bad Request!"
  //   })
  // }
  // const userId = req.body.userId;

  // only to verified users of the website
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}` ,{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(
      {
        "prompt" : {
          "text" :"Write a story about sankalp dying alone."
        }
      }
    )
  }).then((res)=>{
    return res.json() 
  })
  console.log(response)
  return res.status(200).send(response)
})



// doc("feed").getDocs()