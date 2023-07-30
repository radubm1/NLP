// Load wink-nlp package.
const winkNLP = require( 'wink-nlp' );
// Load english language model — light version.
const model = require( 'wink-eng-lite-web-model' );
// Instantiate winkNLP.
const nlp = winkNLP( model );
// Initiate helpers
const its = nlp.its;

const text = 'John eats apples in the back. Paula runs freely on the alley';

const doc = nlp.readDoc( text );
			
let pred = new Map();

let program='';

doc.sentences()
        .each((e) => {
			e.tokens()
			    .each((e) => {
				  // Extract type of entity using .out() with “its.value”
				  // as input parameter.
					pred.set(e.out(its.pos),e.out(its.value));					
				} );
				console.log(pred.get('VERB') + '(' + pred.get('PROPN') + ',' + pred.get('NOUN') + ')');
        } );

console.log(program);