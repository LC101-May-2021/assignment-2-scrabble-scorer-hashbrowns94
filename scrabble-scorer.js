// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
const vowelTest = /[aeiou]/i

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

function initialPrompt() {
   let userWord = input.question("Let's play some scrabble! Enter a word: ");
   return userWord;
};

let simpleScore = word => {
  let counter = 0;
  word.split('').forEach(letter => counter++);
  return counter;
};

let vowelBonusScore = word => {
  let counter = 0;
  word.split('').forEach(letter => letter.match(vowelTest) ? counter = counter + 3 : counter++);
  return counter;
};

let scrabbleScore = function(word, obj){
  let counter = 0;
  let arr = word.toLowerCase().split('');
  for (letter in obj) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === letter) {
          counter += Number(obj[letter]);
        }
      }
    }
  return counter;
};

const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scoringFunction: simpleScore,
  },
  {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoringFunction: vowelBonusScore,
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoringFunction: scrabbleScore,
  },
];

function scorerPrompt(arr, word) {
  let score = 0;
  let scoreSelector = input.question(`Which scoring algorithm would you like to use?\n
  0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description} \n
  1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description} \n
  2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description} \n
Enter 0, 1, or 2: `);
  if (Number(scoreSelector) === 0) {
    score = arr[0].scoringFunction(word);
  } else if (Number(scoreSelector) === 1) {
    score = arr[1].scoringFunction(word);
  } else if (Number(scoreSelector) === 2) {
    score = arr[2].scoringFunction(word);
  }
  return console.log(`Score for ${word}: ${score}`);
}

function transform(obj){
  let newPointStructure = {};
  for (item in obj) {
    let temp = obj[item];
    for (let i = 0; i < temp.length; i++){
      let letter = temp[i]
      //assign a new key value pair
      if (obj['1'].includes(letter)) {
        newPointStructure[letter.toLowerCase()] = 1;
      } else if (obj['2'].includes(letter)){
        newPointStructure[letter.toLowerCase()] = 2;
      } else if (obj['3'].includes(letter)){
        newPointStructure[letter.toLowerCase()] = 3;
      } else if (obj['4'].includes(letter)){
        newPointStructure[letter.toLowerCase()] = 4;
      } else if (obj['5'].includes(letter)){
        newPointStructure[letter.toLowerCase()] = 5;
      } else if (obj['8'].includes(letter)){
        newPointStructure[letter.toLowerCase()] = 8;
      } else if (obj['10'].includes(letter)){
        newPointStructure[letter.toLowerCase()] = 10;
      }
    }
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
  scorerPrompt(scoringAlgorithms, word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

