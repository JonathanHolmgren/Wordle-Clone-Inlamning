
const targetWords = require('./targetWords.json');


const targetWord = targetWords[Math.floor(Math.random() * targetWords.length)]



  function checkIfTwoWordMatch(correctWord, guessWord) {
    let correctWordArray = correctWord.split("");
    let guessWordArray = guessWord.split("");
    let resultArray = [];
    let count = 0;
    let correctposition = [];
  
    //Denna funktion kollar om samma index i de två olika arrays har samma index.
    for (let i = 0; i < correctWordArray.length; i++) {
      if (guessWordArray[i] == correctWordArray[i]) {
        resultArray.push({
          letter: guessWordArray[i],
          result: "correct",
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
            result: "misplaced",
          });
        } else {
          resultArray.push({
            letter: guessWordArray[i],
            result: "incorrect",
          });
        }
      } else {
        resultArray.push({
          letter: guessWordArray[i],
          result: "incorrect",
        });
      }
    }
  
    return resultArray;
  }
  
  checkIfTwoWordMatch("CYKLA", "HALLÅ");


  console.log(checkIfTwoWordMatch("CYKLA", "HALLÅ"))
