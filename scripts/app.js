import snoowrap from "snoowrap";

scrapeSubreddit();

async function scrapeSubreddit() {
  const r = new snoowrap({
    userAgent: "A random string.",
    clientId: "Client ID from oauth setup",
    clientSecret: "Client Secret from oauth setup",
    refreshToken: "Token from the oauth setup",
  });

  const subreddit = await r.getSubreddit("realEstate");
  const topPosts = await subreddit.getTop({ time: "week", limit: 3 });

  let data = [];

  topPosts.forEach((post) => {
    data.push({
      link: post.url,
      text: post.title,
      score: post.score,
    });
  });

  console.log(data);
}

async function GetSubRedditPosts() {
  try {
    const res = await axios.get(
      "https://www.reddit.com/r/wallstreetbets/hot.json"
    );
    ConvertToText(res.data);
  } catch (err) {
    console.log(err);
  }

  // fetch("https://www.reddit.com/r/wallstreetbets/hot.json")
  //   .then(function (res) {
  //     return res.json(); // Convert the data into JSON
  //   })
  //   .then(function (data) {
  //     console.log(data.data); // Logs the data to the console
  //     ConvertToText(data.data);
  //   })
  //   .catch(function (err) {
  //     console.log(err); // Log error if any
  //   });
}

function ConvertToText(data) {
  var posts = data.children;
  var text = "";
  for (let i = 0; i < posts.length; i++) {
    var currentPost = posts[i].data;
    text += currentPost.title + currentPost.selfText;
  }

  console.log(text.toLowerCase());
  KMP("moon", text.toLowerCase());
}

// KMP algorithm
function KMP(pattern, text) {
  let M = pattern.length;
  let N = text.length;
  let lps = new Array(M).fill(0);
  let j = 0;
  let i = 0;
  let calculatedLps = CalculateLPSArray(pattern, M, lps);

  while (i < N) {
    if (pattern[j] == text[i]) {
      i += 1;
      j += 1;
    }

    if (j == M) {
      console.log("Found pattern at index " + (i - j));
      j = calculatedLps[j - 1];
    } else if (i < N && pattern[j] != text[i]) {
      if (j != 0) {
        j = calculatedLps[j - 1];
      } else {
        i += 1;
      }
    }
  }
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
