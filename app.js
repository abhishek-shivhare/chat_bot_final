const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require("express");
var bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const path = require("path");
let port = process.env.PORT || 8000;

const app = express();
 // A unique identifier for the given session
 const sessionId = uuid.v4();



// =======================server============================
// // thiis is middle ware 
// app.use('/',(req,res,next)=>{
//   console.log(req.url);
//   next();
// })

var transcript = "";

app.use(express.static(path.join(__dirname,'final_chat_bot')));
app.use(express.json({limit:'1mb'}));

app.use(function (req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials',true);

  next();
})

app.get('/',(req,res)=>{
 
  res.status(200);
  res.sendFile(path.join(__dirname,'final_chat_bot','index.html'));
});

app.post('/api',(req,res)=>{
  transcript = req.body.transcript;
  console.log(transcript);
  runSample(transcript).then((data)=>{
    const d= {Reply : data}
    res.send(JSON.stringify(d));
  }).catch((err)=>{
    console.log("error");
    console.error(err);
  })
})

//  post method 



// const server = http.createServer((req, res) => {


//   if(req.url=="/"){

//     // appPost(req,res);
//     fs.readFile("final_chat_bot/index.html","utf-8",(err,html)=>{
//       res.writeHead(200, { 'content-type': 'text/html' });
//       res.end(html);
//       // console.log(req.url);
//     });
//   }
//   else if(req.url.match("\.css$")){
//     var cssPath = path.join(__dirname,'final_chat_bot',req.url);
//     // console.log(cssPath);
//     var fileStream = fs.createReadStream(cssPath,"utf-8");
//     res.writeHead(200, { 'content-type': 'text/css' });
//     fileStream.pipe(res);

//   }
//   else if(req.url.match("\.js$")){
//     var jsPath = path.join(__dirname,'final_chat_bot',req.url);
//     var fileStream = fs.createReadStream(jsPath,"utf-8");
//     // console.log(jsPath);
//     res.writeHead(200, { 'content-type': 'text/js' });
//     fileStream.pipe(res);
//     // console.log(fileStream);
//   }
//   else if(req.url.match("\.jpg$")){
//     var pngpath = path.join(__dirname,'final_chat_bot',req.url);
//     var fileStream = fs.createReadStream(pngpath);
//     // console.log(jsPath);
//     res.writeHead(200, { 'content-type': 'text/jpg' });
//     fileStream.pipe(res);
//   }
 


// });



// // =======================server============================

// // =================
// const appPost = (req,res)=>{
//   // console.log("REQ: ",req)

//   let transcript = req.body;


// console.log("jebs euheswk s");
// console.log(JSON.parse(transcript));

// // ============================ data fetch==============================


// /**
//  * Send a query to the dialogflow agent, and return the query result.
//  * @param {string} projectId The project to be used
//  */
// async function runSample(projectId = 'robo-chat-gxnh') {
//   // A unique identifier for the given session
//   const sessionId = uuid.v4();

//   // Create a new session
//   const sessionClient = new dialogflow.SessionsClient({
//       keyFilename:"(your key)"});
//   const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  

//   // The text query request.
//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         // The query to send to the dialogflow agent
//         text: "what is set",
//         // The language used by the client (en-US)
//         languageCode: 'en-US',
//       },
//     },
//   };

//   // Send request and log result
//   const responses = await sessionClient.detectIntent(request);
//   console.log('Detected intent');
//   const result = responses[0].queryResult;
//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);
//   if (result.intent) {
//     console.log(`  Intent: ${result.intent.displayName}`);
//   } else {
//     console.log(`  No intent matched.`);
//   }
//   console.log(result.fulfillmentText);
// }

// runSample();


// // ============================ data fetch==============================








//   // res.send({
//   //   success: true,
//   //   message: "APIs working properly"
//   // });
// }
// // app.post("/",appPost);

// // ======================


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(transcript,projectId = '{your project id}') {
 

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"{Enter your key}"});
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: transcript,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  console.log(result.fulfillmentText);

  return result.fulfillmentText;
}

// runSample();

// server.listen(8000 ,()=>{
//   console.log("linstening");
//   });

app.listen(port,()=>{
  console.log("listening ")
})
