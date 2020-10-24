const fs = require('fs')
const chalk = require('chalk')



const listNotes = () => {
    console.log(chalk.bgCyanBright.red('Your notes..'))
    let notes = loadNotes()
    notes.forEach((note) => console.log(note.title));
}
const addNote = (title, body) => {
    const notes = loadNotes()
    //Logic to find if there is any duplicate notes present
    //const duplicateNotes = notes.filter((note) => note.title === title)
    
    if(!(notes.find((note) => note.title === title))){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen.blue('New node added!'))
    }

    else{
        console.log(chalk.red.inverse('Note title already taken!'))
    }
    //Since at the start we did not have a json file to store the data so we will push the data at the json by using an array
    
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.italic.blueBright(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.inverse.red('No Note Found!!!'))
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green('Note Name '+chalk.white(title)+' has been removed succesfully'))
        saveNotes(notesToKeep)
        
    }

    else{
        console.log(chalk.bold.red('No Note Found!!!'))
    }
   
}

const loadNotes = () => {
    //Since we dont have any file in the project ecosystem as of now so we basically do the try catch block of statement.
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }

    catch(e){
        return []
    }
   
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}


