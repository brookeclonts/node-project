console.log('start app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note', // description for help
    demand: true, // makes required
    alias: 't' //if you don't want to type '--title' every time
};
const bodyOptions = {
    describe: 'Body or description of note', // description for help
    demand: true, // makes required
    alias: 'b' //if you don't want to type '--title' every time
};
const argv = yargs
    .command('add', 'add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'list all notes')
    .command('read', 'read a note', {
        title: titleOptions
    })
    .command('remove', 'remove note', {
        title: titleOptions
    })
    .help()
    .argv;

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('note created');
        console.log('--');
        notes.logNote(note);
    } else {
        console.log('note title taken');
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing all ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command ==='read' || command === 'get') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('note found');
        console.log('--');
        notes.logNote(note);
    } else {
        console.log('note not found');
    }
} else if (command ==='remove') {
    let noteRemoved = notes.removeNote(argv.title, argv.body);
    let message = noteRemoved ? 'Note was removed' : 'Could not find it!';
    console.log(message);
} else {
    console.log('command not recognized');
}