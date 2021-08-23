# MyAnimeList User Stats

## Description

Generate statistics similar to [AniList](https://anilist.co/) ([example](https://anilist.co/user/triplezko/stats/anime/overview)) using data from your [MyAnimeList](https://myanimelist.net/) profile.

Frontend uses React, bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Backend uses NodeJS. [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2) is used to authenticate users to use their MyAnimeList statistics.

## Installation

Frontend: `yarn install`

Backend: `npm install`

## Usage

Frontend:

- `yarn start`: Runs the app in the development mode. Open `http://localhost:3000` to view it in the browser. The page will reload if you make edits.
- `yarn build`: Builds the app for production to the build folder.

Backend:

- `npm run dev`: Runs the server in the development mode. The server restarts when changes are made. `localhost:8000`
- `npm run build`: Builds the server by compiling typescript into javascript.
- `npm run start`: Runs the server in production mode. Make sure to run `npm run build` first.

## License

MIT License
