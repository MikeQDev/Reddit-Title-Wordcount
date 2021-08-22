# Reddit Title Wordcount

Given a subreddit, gathers the N-top posts, extracts the titles, and applies a Big Data technique - wordcount (word frequency count) - to find most commonly used words

Objective is to be aware of commonly-used words/jargon for niche audiences, in order to write better copy

Sample usage:
`node index.js SelfImprovement`

Sample .env file:
```
USER_AGENT=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36
CLIENT_ID=redditAppId
CLIENT_SECRET=xredditAppSecret
REDDIT_USERNAME=redditUser
REDDIT_PASSWORD=redditPass
```
