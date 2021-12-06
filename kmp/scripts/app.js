import { KMP } from "./KMP";

export async function GetRedditPosts(patternToMatch) {
  var posts = "";

  console.log("Getting reddit data...");
  posts = await GetData();

  posts = posts.toLowerCase();

  console.log("Running KMP...");

  var matchLocations = KMP(patternToMatch, posts);

  console.log("Matches from KMP: " + matchLocations.length);

  return matchLocations.length;
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
