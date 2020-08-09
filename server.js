// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const { json } = require("express");



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================
// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });   

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    });

//API Routes
app.get("/api/notes", function(req, res) {
  
  fs.readFile("./db/db.json", "utf8", function(error, data){
    if(error){
      console.log(error);
    }
    else{
      // console.log(JSON.parse(data));
      return JSON.parse(data);
    }
  })
  
});
app.get('/api/notes/:id', function(req, res){
  var chosen = req.params.id;
  console.log(chosen);  
  
 //creates a dynamic route and sends back json information
  for(var i = 0; i < db.length; i++){
    if(chosen === db[i].id){
      return res.json(db[i]);      
    }
  }
  return res.send("ID not found");

});

// Create New Notes - POST request
app.post("/api/notes", function(req, res){
  var newNote = req.body;

  newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);

  db.push(newNote);
  
  res.json(newNote);
})
  

  



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });