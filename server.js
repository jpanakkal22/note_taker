// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// Routes
// =============================================================

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  }); 

//API Routes
app.get("/api/notes", function(req, res) {
  
  fs.readFile("./db/db.json", "utf8", function(error, data){
    if(error){
      console.log(error);
    }
    else{      
      res.json(JSON.parse(data));
    }
  })  
});

// Create New Notes - POST request
app.post("/api/notes", function(req, res){
  var newNote = req.body;
  newNote.id = Date.now()

  fs.readFile("./db/db.json", "utf8", function(error, data){
    if(error){
      console.log(error);
    }
    else{
      var notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Success!");
          res.json(newNote);
        }
      })    
    }
  })  
});

app.delete('/api/notes/:id', function(req, res){
  var chosen = req.params.id;
  console.log(chosen);
  var array = [];
  
 //creates a dynamic route and sends back json information
  for(var i = 0; i < db.length; i++){
    if(chosen !== db[i].id){
      array.push(db[i]);
    }
  }
  fs.writeFile("./db/db.json", JSON.stringify(array), function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Success!");
      res.json(array);      
    }
  })  
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });