'use strict';
require('dotenv').config()
const snoowrap = require('snoowrap');
const fs = require('fs');
const Occurrences = require('occurences');

if(process.argv.length !== 3){
  console.log(`Usage: ${process.argv.slice(0,2)} <subreddit>`);
  process.exit(1);
}

const subReddit = process.argv[2];
const options = {
 time: 'all', // hour, day, week, month, year, all
 limit: 1000
};

const generatedDirectory = `generated/${subReddit}/`;

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});


const main = async() => {
  const allTitles = await r.getTop(subReddit, options).map(post => post.title); // Get topics from subreddit

  fs.mkdirSync(generatedDirectory, { recursive: true }); // Create generated dir

  // Write all topics to file
  fs.writeFile(generatedDirectory+'/topics.json', JSON.stringify(allTitles), err => {
    if (err) {
      console.error(err);
      return;
    }
  });

  const allTitleWords = allTitles.join(' ').replace(/[^A-Za-z\s]/g,'').toLowerCase(); // Convert topics to single string
  const x = new Occurrences(allTitleWords).getSorted().filter(e=>{ return e.number > 1 }); // Perform word-count
  // Write word-count to file
  fs.writeFile(generatedDirectory+'/wordcount.json', JSON.stringify(x), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

main();
