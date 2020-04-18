<h1 align="center">
    <a href="https://emilydelacruz.com" target="_blank"><img src="https://emilydelacruz.com/files/connection.png" alt="atom graphic" width="80"></a>
    <br>
    Life Overview Base
</h1>

<p align="center"><em>A bird's-eye view.</em></p>

<p align="center">
    <a href="https://github.com/emdecr/edc/releases">
        <img src="https://img.shields.io/badge/release-v1.0-blue.svg" alt="release badge version 1.0">
    </a>
    <a href="https://emilydelacruz.com">
        <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%EF%B8%8E%20by-emdecr-red.svg" alt="emdecr badge">
    </a>
    
</p>

# Intro

Author: Emily Dela Cruz

_**What is this? Why does it exist?**_

I was inspired by <a href="https://busterbenson.com/the-life-of/buster/" target="_blank">Buster Benson's project</a> and decided to create a version with React. This repo is the bones of what powers <a href="https://emilydelacruz.com/life-overview" target="_blank">the live version on my site</a>.

Fire up your own copy, and let me know how it goes!

# Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Content

The components are being filled with data from a single array full of objects.
In <a href="https://emilydelacruz.com/life-overview" target="_blank">my own project</a> I've created an endpoint that brings back an array with specifically formatted objects. Each object has `week`, `date`, `title` and `content` keys.

It's looks like this:

```json
[
  {
    "week": 1,
    "date": "April 15, 2020",
    "title": "Example Heading 1",
    "content": "This is the content"
  },
  {
    "week": 5,
    "date": "May 20, 2020",
    "title": "Example Heading 2",
    "content": "This is the content"
  }
]
```

`week` is calculated by my API, and is how many weeks there are from my birthday to the date of the single record.

In the future, I'm hoping to make this more flexible...

If you don't want to rely on an API for your content, you can make a static JSON file your source.
Delete `App.js` and rename `AppJSON.js` to `App.js`. `AppJSON.js` pulls from [`src/json/records.json`](https://github.com/emdecr/life-overview-base/blob/master/src/json/records.json). You can use a tool like [this one](https://www.timeanddate.com/date/duration.html) to calculate the values for `week`.

## Today Indicator

Its placement is calculated with `weeksBetween` from a helper function in [`src/helpers/index.js`](https://github.com/emdecr/life-overview-base/blob/master/src/helpers/index.js).
You'll need to replace `start` with your own birthday/start date.

## Where else you need to change things...

`startYear` in [`src/components/WeekBirthday.js`](https://github.com/emdecr/life-overview-base/blob/master/src/components/WeekBirthday.js) needs to be changed to the year of whatever your birth/start date year is.

## Weeks with custom background colours

In <a href="https://emilydelacruz.com/life-overview" target="_blank">my project</a> I have several `Week.js` components that have a different background colour to highlight specific moments/periods. In this base project, there's a few weeks that have a red background. It's pulling from `exampleBackground`, a helper function in [`src/helpers/index.js`](https://github.com/emdecr/life-overview-base/blob/master/src/helpers/index.js). It checks against the `Week.js` component's `weekId` prop, and if it matches any values in the array found in `exampleBackground`, that week gets a specific background colour (`.week.example-background` selector found in `Week.css`). Again, you can use a tool like [this one](https://www.timeanddate.com/date/duration.html) to find the correct number.

# Feature Roadmap

- Make project conform to at least WCAG AA
- Create a formatted array of objects from a different API's response array
  - ie. No need to pull from an array with a specfic response
- Create different views
  - Public
  - Auth-protected (show more details)
- Better mobile style and functionality

# Credits

Thank you to <a href="https://busterbenson.com/" taarget="_blank">Buster Benson</a> for sharing his work publicly.

Badges in this README.md provided by [shields.io](https://shields.io/#your-badge).
