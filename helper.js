
const client = require('./db');
const sql = require('sql-bricks-postgres')
const createNote = (req,res) => {
    // sql.insert('note',{note:note}).toParams()
    try {
        const {note} = req.body;
        if(!note){
            throw Error("Send note in request body");
        }
        client.query("INSERT INTO notes (note) VALUES ($1)",
        [note],
        (err,data) =>{
            res.status(201).json({
                error:null,
                message:"Created new Note",
            });
        }
        );
    } catch (error) {
        res.status(500).json({
            error:error.message,
            message:"Failed to create new note",
        })
    }
}

// Funtion to get all Notes from DB

const getNotes = (req,res) => {
    // "SELECT * FROM notes",
    try {
        client.query(sql.select().from('notes').toParams(), (err,data) => {
            if(err) throw err;
            res.status(200).json({
                err:null,
                notes:data.rows,
            })
        })
    } catch (error) {
        res.status(500).json({
            err: error.message,
            notes:null,
        })
    }
}

// Funtion to get Notes by ID from DB

const getNoteById = (req,res) =>{
    //"SELECT * FROM notes WHERE id=$1",[id]
    try {
        const id = req.params.id;
        client.query(sql.select().from('notes').where({id:id}).toParams(),(err,data) => {
            if(err) throw err;

            res.status(200).json({
                err:null,
                note:data.rows[0],
            })
        })
    } catch (error) {
        res.status(500).json({
            err:error.message,
            note:null,
        })
    }
}

const updateNoteById = (req,res) =>{
    //"UPDATE notes SET note = $1 WHERE id = $2",
    //[note,id]
    try {
        const {id} = req.params;
        const {note} = req.body;
        client.query(
            sql.update('notes',{note,note}).where({id,id}).toParams()
            ,
            (err,data) => {
                if(err) throw err;
                res.status(201).json({
                    err:null,
                    message:'Update note',
                })
            }
        )
    } catch (error) {
        res.status(500).json({
            err:error.message,
            message:"Failed to update note"
        })
    }
}

// // Funtion to Delete node from DB

const deleteNotebyId = (req,res) =>{
    // "DELETE FROM notes WHERE id=$1",[id]
    try {
        const {id} = req.params;
        client.query(sql.delete('notes').where({id:id}).toParams(),(err,data) => {
            if(err) throw err;
            res.status(200).json({
                error:null,
                message:"Note deleted",
            })
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message:'Failed to delete note',
        })
    }
}

module.exports = {
    createNote,
    getNoteById,
    getNotes,
    updateNoteById,
    deleteNotebyId,
}