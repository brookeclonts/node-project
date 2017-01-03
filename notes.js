const fs = require('fs');

fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

removeNote = (title) => {
    let notes = fetchNotes();
    let newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);

    if (notes.length !== newNotes.length) {
        console.log(`note with title ${title} has been removed`);
    } else {
        console.log(`note with title ${title} was not found`);
    }
};

getNote = (title) => {
    let notes = fetchNotes();
    let filteredNote = notes.filter((note) => note.title === title);
    return filteredNote[0];
};

getAll = () => {
    return fetchNotes();
};

logNote = (note) => {
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}


module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    logNote
};