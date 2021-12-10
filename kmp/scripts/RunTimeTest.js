import { KMP } from "./KMP";

export function TestRunTime() {
  let testPattern = "abc";
  let numberOfTests = 400;
  let testString = "abcaaa";
  let startTime = 0;
  let endTime = 0;
  let totalTime = 0;
  let lengthOfString = 0;
  let data = [];

  for (let i = 0; i < numberOfTests; i++) {
    startTime = performance.now();
    KMP(testPattern, testString);
    endTime = performance.now();
    lengthOfString = testString.length;

    totalTime = endTime - startTime;
    let record = { x: lengthOfString, y: totalTime };
    data.push(record);

    testString += GetRandomCharacters();

    //if (i % 5 == 0) {
    //  testString += testPattern; // periodically add in our pattern
    //}
  }

  return data;
}

function GetRandomCharacters() {
  let randomCharacters = "";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  let numberOfCharactersToAdd = 300;
  for (let i = 0; i < numberOfCharactersToAdd; i++) {
    randomCharacters += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return randomCharacters;
}
