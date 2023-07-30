// Load required packages and modules
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const pl = require("tau-prolog");

// Create a new session
const session = pl.create(1000);

// Instantiate winkNLP
const nlp = winkNLP(model);

// Define helper functions
const its = nlp.its;
const showAnswer = x => console.log(session.format_answer(x));

// Get command line argument
const inputItem = process.argv[2];

// Define the program and goal
let program = `
    s(S0,S) :- np(S0,S1), vp(S1,S).
    np(S0,S) :- det(S0,S1), noun(S1,S).
    vp(S0,S) :- verb(S0,S1), np(S1,S).
    vp(S0,S) :- iv(S0,S).
    iv(S0,S) :- S0=[walks|S].
`;

const text = 'A boy eats the apples in the back. A woman runs freely on the alley';
const doc = nlp.readDoc(text);
let entityMap = new Map();

// Extract entities from the text
doc.sentences().each((sentence) => {
    sentence.tokens().each((token) => {
        entityMap.set(token.out(its.value), token.out(its.pos));
    });
});

// Add entity rules to the program
const mapEntriesToString = (entries) => {
    return Array.from(entries, ([k, v]) => `\n  ${v.toLowerCase()}(S0,S) :- S0=[${k.toLowerCase()}|S].`).join("") + "\n";
}
console.log(mapEntriesToString([...entityMap.entries()]));

program += mapEntriesToString([...entityMap.entries()]);

const goal = `
    s([the, boy, eats,the,apples],[]).
`;

// Consult the program, query the goal, and show the answers
session.consult(program, {
    success: function() {
        session.query(goal, {
            success: function() {
                session.answers(showAnswer);
            }
        })
    }
});