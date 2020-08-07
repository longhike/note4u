const path = require("path");
const fs = require("fs");
const db = require("../db/db.json");

module.exports = (app) => {
    // get the current db as json and log it in the console
    app.get("/api/notes", (req, res) => {

        res.sendFile(path.join(path.join(__dirname, "../"), "./db/db.json"))

        console.log(db);
    })

    // post a new note to the db as json
    app.post("/api/notes", (req, res) => {
        // declare a variable currentNotes that contains the parsed db as JSON
        let currentNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
        // logs the entire request
        console.log(req);
        // logs the object of the specific new note
        console.log(req.body);
        // assigning a variable newNote that is the new note object
        let newNote = req.body
        // assigning a variable noteID that makes into an ID the position of the new object re: the others in the array of objects
        let noteID = currentNotes.length.toString()
        // adds the new ID to the new note
        newNote.id = noteID
        // we're pushing the new note into the current array of notes
        currentNotes.push(newNote)
        // overwrite the current db.json with the new array of note objects (using writeFileSync instead of writeFile because writeFile wants a callback function)
        fs.writeFileSync("./db/db.json", JSON.stringify(currentNotes))
        // send the new note in the response
        res.json(newNote)
        console.log(res);

    })

    app.delete("/api/notes/:id", (req, res) => {
        // declare a variable currentNotes that contains the parsed db as JSON
        // NOTE: This is giving me a path error that I can't resolve
        let currentNotes = JSON.parse(fs.readFileSync(".db/db.json", "utf8"))
        console.log(currentNotes);
        
    })
    
}