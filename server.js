// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const db = require("../note_taker/db/db.json");



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });   

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    });

app.get("/api/notes", function(req, res) {
  
  res.sendFile(path.join(__dirname, 'db/db.json'));
  
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

})
  

  



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });