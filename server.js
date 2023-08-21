const express = require('express');
const app = express();
const db = require('./helper');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.get('/',(req,res) =>{
    res.send("Hello World")

})
app.get('/getnotes',db.getNotes);
app.get("/getnoteById/:id",db.getNoteById);
app.put("/updateNoteById/:id",db.updateNoteById);
app.post("/CreateNote",db.createNote);
app.delete("/deleteNotebyId/:id",db.deleteNotebyId);

app.listen(3000,() => {
    console.log("Listening at Port 3000")
});
