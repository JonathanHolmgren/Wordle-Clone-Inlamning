import { describe, it, expect } from '@jest/globals';
import { checkIfTwoWordMatch } from '../src/controller';

// Detta test gör at

describe('checkIfTwoWordMatch', () => {
  // Detta test är enbart för att jag skulle se så jag fick ut en array med ett objekt med attibuten letter och result.
  it('This test see if the return value has 5 letter', () => {
    const resultArray = checkIfTwoWordMatch('CYKLA', 'HALLÅ');
    expect(resultArray.length).toBe(5);
    resultArray.forEach((result) => {
      expect(result).toHaveProperty('letter');
      expect(result).toHaveProperty('result');
    });
  });

  //Testa test gjode jag för att kolla så resultaten blev som önskat.
  it('This test is to se if the game is "works"', () => {
    const resultArray = checkIfTwoWordMatch('BLOWN', 'CLOUD');
    expect(resultArray[0].result).toBe('wrong');
    expect(resultArray[1].result).toBe('correct');
    expect(resultArray[2].result).toBe('correct');
    expect(resultArray[3].result).toBe('wrong');
    expect(resultArray[4].result).toBe('wrong');
  });

  it('This test is to see if the first L is incorrect becuase the other L in the guess is correct', () => {
    const resultArray = checkIfTwoWordMatch('CYKLA', 'HALLÅ');
    expect(resultArray[2].result).toBe('wrong');
  });

  it('This test is to see if the first L is correct and the other L will return incorrect. Becuase There are no more L in the correct word', () => {
    const resultArray = checkIfTwoWordMatch('COLTS', 'PILLS');
    expect(resultArray[2].result).toBe('correct');
    expect(resultArray[3].result).toBe('wrong');
  });
});

/*
Jag började köra TDD men gick över snabbt till och endast skriva koden för att jag hade 
svårt att komma få vilka tester jag skulle göra. Men i efterhand så kanske de hade varit bättre och
fortsätta då man la mer tid på att "skriva lite kod hoppas det funkar" istället för utgå från ett resultat
man vill ha och därefter koda. 

Angående Fyrstegsmodellen så trodde jag att jag hade lyckats formullera en lösningen men hade problem 
att få ner det i kod och då från gick jag fyrstegsmodellen till och exprementera fram rätt lösning. 
Tror nog många buggar och onödig kod blev resultatet. 

*/
