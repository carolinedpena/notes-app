const fs = require('fs')
const chalk = require('chalk');

// Function to create JSON file for add/removing notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
};

// Function for loading notes from JSON file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
};

// Function for adding new notes to JSON file
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
};

// Function for removing notes from JSON file
const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => note.title !== title);
    
    if (notes.length !== notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }

};

//Function for listing saved note titles 
const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse.green('Your notes:'))

    notes.forEach(note => {
        console.log(note.title)
    });
};

//Function for printing out body of a note
const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title);

    if (noteToRead) {
        console.log(chalk.green.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red('No such note found!'))
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
