const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

// creating a message with simple validation and adding the time the message was created/sent
app.post("/messages", (req, res) => {
  const { from, text } = req.body; // getting the data from both the name and message fields by targetting the name attribute of both
  const messageObj = {
    id: messages.length, 
    from, 
    text, 
    timeSent: new Date().toLocaleDateString()
  }
  if (!from || !text) {
    return res.status(404).send({ message: "please fill in both the name and message"})
  }else{
  messages.push(messageObj);
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port 3000!");
});
