const path = require("path");
const fs = require("fs");
const DB = path.join(__dirname, '../db/db.json')

const fetchDB = () => JSON.parse(fs.readFileSync(DB, "utf8"))
const putDB = (data) => fs.writeFileSync("./db/db.json", JSON.stringify(data))

module.exports = (app) => {
    // get the current db as json and log it in the console
    app.get("/api/notes", (req, res) => {
        res.sendFile(DB)
    })

    // post a new note to the db as json
    app.post("/api/notes", (req, res) => {
        // declare a variable currentNotes that contains the parsed db as JSON
        const currentNotes = fetchDB();
    
        // logs the object of the specific new note
        console.log(req.body);
        // assigning a variable newNote that is the new note object
        const newNote = req.body
    
        const lastNoteId = currentNotes.length ? currentNotes[currentNotes.length - 1].id : 0
        
        newNote.id = lastNoteId + 1

        // we're pushing the new note into the current array of notes
        currentNotes.push(newNote)
        // overwrite the current db.json with the new array of note objects (using writeFileSync instead of writeFile because writeFile wants a callback function)
        putDB(currentNotes)
        // send the new note in the response
        res.json(newNote)
    })

    app.delete("/api/notes/:id", (req, res) => {
        const currentNotes = fetchDB();

        // get id of item to delete
        const deleteId = parseInt(req.params.id);

        const updatedNotes = []
        for (i = 0; i < currentNotes.length; i++) {
            if (deleteId !== currentNotes[i].id) {
                updatedNotes.push(currentNotes[i])
            }
        }

        putDB(updatedNotes)
        res.sendStatus(200)
    })

}