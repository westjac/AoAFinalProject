// start of KMP algorithm
export function KMP(pattern, text) {
    let M = pattern.length;
    let N = text.length;
    let lps = new Array(M).fill(0);
    let j = 0;
    let i = 0;
    let calculatedLps = CalculateLPSArray(pattern, M, lps);
    let indexLocations = [];
    //let numberOfOccurences = 0;
  
    while (i < N) {
      if (pattern[j] == text[i]) {
        i += 1;
        j += 1;
      }
  
      if (j == M) {
        indexLocations.push(i - j); // add index of match
        //console.log("Found pattern at index " + (i - j));
        //numberOfOccurences += 1;
        j = calculatedLps[j - 1];
      } else if (i < N && pattern[j] != text[i]) {
        if (j != 0) {
          j = calculatedLps[j - 1];
        } else {
          i += 1;
        }
      }
    }
  
    //return numberOfOccurences;
    return indexLocations;
  }
  
  function CalculateLPSArray(pattern, M, lps) {
    let size = 0;
    let i = 1;
  
    while (i < M) {
      if (pattern[i] == pattern[size]) {
        size += 1;
        lps[i] = size;
        i += 1;
      } else {
        if (size != 0) {
          size = lps[size - 1];
        } else {
          lps[i] = 0;
          i += 1;
        }
      }
    }
  
    return lps;
  }

