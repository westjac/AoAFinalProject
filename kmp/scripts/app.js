export async function GetRedditPosts(patternToMatch) {
  var posts = "";

  console.log("Getting reddit data...");
  posts = await GetData();

  posts = posts.toLowerCase();

  console.log("Running KMP...");

  var numberOfMatches = KMP(patternToMatch, posts);

  console.log("Matches from KMP: " + numberOfMatches);

  return numberOfMatches;
}

async function GetData() {
  var returnString = "";
  var topComment = "";

  const response = await fetch(
    "https://www.reddit.com/r/wallstreetbets/top/.json?limit=100"
  );

  const posts = await response.json();
  var redditPosts = posts.data.children;

  redditPosts.forEach((post) => {
    topComment = post.data.permalink;
    returnString += GetComments(topComment);
    returnString += post.data.title;
    returnString += post.data.selftext;
  });

  return returnString;
}

// This function will have N^2 complexity*************
async function GetComments(commentLink) {
  const commentRes = await fetch(`https://www.reddit.com/${commentLink}.json`);

  const comments = await commentRes.json();
  var text = "";

  comments.forEach((comment) => {
    var children = comment.data.children;

    children.forEach((child) => {
      text += child.data.body;
    });
    text += comment.data;
  });

  return text.toLowerCase();
}


// start of KMP algorithm
function KMP(pattern, text) {
  let M = pattern.length;
  let N = text.length;
  let lps = new Array(M).fill(0);
  let j = 0;
  let i = 0;
  let calculatedLps = CalculateLPSArray(pattern, M, lps);
  let numberOfOccurences = 0;

  while (i < N) {
    if (pattern[j] == text[i]) {
      i += 1;
      j += 1;
    }

    if (j == M) {
      //console.log("Found pattern at index " + (i - j));
      numberOfOccurences += 1;
      j = calculatedLps[j - 1];
    } else if (i < N && pattern[j] != text[i]) {
      if (j != 0) {
        j = calculatedLps[j - 1];
      } else {
        i += 1;
      }
    }
  }

  return numberOfOccurences;
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
