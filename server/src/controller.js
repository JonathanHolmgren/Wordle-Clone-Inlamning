// const targetWords = require('./targetWords.json');
import targetWords from './targetWords.json' assert { type: 'json' };

function generateNewWord() {
  return targetWords[Math.floor(Math.random() * targetWords.length)];
}

function checkIfTwoWordMatch(correctWord, guessWord) {
  let correctWordArray = correctWord.toLowerCase().split('');
  let guessWordArray = guessWord.toLowerCase().split('');
  let resultArray = [];
  let count = 0;
  let correctposition = [];

  //Denna funktion kollar om samma index i de två olika arrays har samma index.
  for (let i = 0; i < correctWordArray.length; i++) {
    if (guessWordArray[i] == correctWordArray[i]) {
      resultArray.push({
        letter: guessWordArray[i],
        result: 'correct',
      });

      correctposition.push(guessWordArray[i]);
    } else if (correctWord.includes(guessWordArray[i])) {
      correctWordArray.forEach((currentLetter, index) => {
        if (currentLetter === guessWordArray[i]) {
          if (index !== i && !correctposition.includes(currentLetter)) {
            count++;
          }
        }
      });

      if (count <= 1 && !correctposition.includes(guessWordArray[i])) {
        resultArray.push({
          letter: guessWordArray[i],
          result: 'wrong-location',
        });
      } else {
        resultArray.push({
          letter: guessWordArray[i],
          result: 'wrong',
        });
      }
    } else {
      resultArray.push({
        letter: guessWordArray[i],
        result: 'wrong',
      });
    }
  }

  return resultArray;
}

checkIfTwoWordMatch('CYKLA', 'HALLÅ');

console.log(checkIfTwoWordMatch('CYKLA', 'HALLÅ'));

export { generateNewWord, checkIfTwoWordMatch };
