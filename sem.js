'use strict';
/*
 * Abstractions:
 */
const walk = x => true; //vi
const beat = (x,y) => true; //vt
const exist = x => x; //there is - operator
const any = x => x; //any - op
const is = (x,y) => true;
const not = x => !x; //- op ?
/*
 * Operators:
 */
let Or = "||";
let And = '&&';
/*
 * Applications: binding
 */
let John = "is('man','john')"; //&&
let Walk = "walk(any('man'))"; //Function()
let Not = "not(true)"; //&&
let Beat = "beat('john','drums')";
let Any = "any('john')";
/*
 * Abstraction & Applications
 */
 /* let John = ((x,y) => true)('john','man');
 * let Walk = (x => (x => true))('man');
 * let Not = (x => !x)(true);
 * console.log(John && Walk && Not);
 */
/*
 * Evaluations:
 */
//console.log(beat(any('man'),'drums'));
//console.log(not(is(any('woman'),'beautiful')));
//any man beat drums
//console.log(eval(John + Walk + Or + Not + Beat));
let s = process.argv[2];//node sem "John Walk Not Beat"
console.log(eval(eval(s.split(' ').map(x=>{return x;}).join('+ And +')))); //is('man','john')&&walk(any('man'))&&not(true)&&beat('john','drums')
