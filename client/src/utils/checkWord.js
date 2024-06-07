function checkIfTwoWordMatch(correctWord, guessWord) {
    let correctWordArray = correctWord.toLowerCase().split("");
    let guessWordArray = guessWord.toLowerCase().split("");
    let resultArray = [];
   
    let correctposition = [];
  
    //Denna funktion kollar om samma index i de två olika arrays har samma index.
    for (let i = 0; i < correctWordArray.length; i++) {
      let count = 0;
      if (guessWordArray[i] === correctWordArray[i]) {
        resultArray.push({
          letter: guessWordArray[i],
          result: "correct",
        });
  
        correctposition.push(guessWordArray[i]);
      }  else if (correctWord.includes(guessWordArray[i])) {
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
            result: "wrong-location",
          });
        } else {
          resultArray.push({
            letter: guessWordArray[i],
            result: "wrong",
          });
        }
      } else {
        resultArray.push({
          letter: guessWordArray[i],
          result: "wrong",
        });
      }
    }
  
    return resultArray;
  }

  export default checkIfTwoWordMatch;