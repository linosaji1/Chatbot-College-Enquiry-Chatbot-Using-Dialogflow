const dialogflow = require("@google-cloud/dialogflow");
const { Console } = require("console");
require("dotenv").config();
const express = require("express");

const fs = require("fs");
const CREDENTIALS = JSON.parse(fs.readFileSync("src/key.json"));

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log(responses);
  const result = responses[0].queryResult;
  console.log(result);

  return {
    response: result.fulfillmentText,
  };
};

const webApp = express();
webApp.use(
  express.urlencoded({
    extended: true,
  })
);
webApp.use(express.json());
webApp.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const PORT = 5000;

webApp.post("/", async (req, res) => {
  let queryText = req.body.message;
  let sessionId = req.body.sessionId;
  let responseData = await detectIntent("en", queryText, sessionId);
  res.send(responseData);
});

webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
