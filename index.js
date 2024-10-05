const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.use(express.json())

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {

  const dateParams = req.params.date;

  const date = dateParams ? new Date( isNaN(dateParams) ? dateParams : Number(dateParams)) : new Date()

  const unix = date.getTime();  
  const utc = date.toUTCString();
  
  if (!unix || utc === "Invalid Date") {
      return res.status(400).json({error : "Invalid Date"});   
  }

  res.status(200).json({unix, utc})
}) 

app.use((req, res) => {
  res.status(400).send("<h1>Route Not Found 😔</h1> <a href='/'>Home</a>")
})


const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
