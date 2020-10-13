## Introduction & Design Decisions
This project is the result of the time given for one developer and the time which I could sacrifice for it so I focused only on the things which are important the most and are achievable in the predicted period of the time. So please be gentle with your evaluation :pray:

### Most important decisions: 
- :sweat: Chart library selection - yesterday I discovered that the library which I've chosen initially to prepare dashboards ("recharts"), doesn't perform well with large data sets and doesn't offer a good solution to handle such data. After three hours of research and checking other React chart libraries ("react-vis",  "biz-charts", "nivo") and I haven't found a solution that meets this problem, has easy to use API, and also offers to show data in Biaxial line chart. Because I couldn't sacrifice more time for that, I've decided to group data in time inside hook logic before serving it into the dashboard. 
- :broken_heart: Tests - coverage includes most of the logic because was written for all custom hooks. Tests are a little chaotic (written in pure .js), granularity, and clarity may be better, but I wrote them in rush. I hoped that I will find a time for testing components, but I didn't so I decided to leave them only with storybooks.
- :x: there is no Lodash in a project - I couldn't find a place for it in my implementation (I tried!), but maybe I don't know it API so well, 
- :memo: Backend Contract - I haven't applied sorting by date logic, because data returned from the server was sorted so at the moment it wasn't necessary, but I think it's worth highlighting that the contract includes not only data shape but also default sorting.

### And others :construction:
Storybook contains only basic storybook config, bundle size is a bit heavy, and probably CSV to JSON library should be removed or replaced, and there is a lot of things which are missing or could be improved, and I'm aware of that but the goal which I took here was to deliver something useful and relatively stable.

## Basic Info  

```
npm i
npm start 
npm run test // --> for tests 
npm run storybook // --> for storybook
```

The project was created for recruitment needs. The goal here is to get data from selected [endpoint](http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv) and present it as a chart with few inputs which will control the way of presenting data at the chart.

## Todo (may change with time)

Basic tasks:
- ~~fetch data~~,
- ~~select components library~~, 
- ~~select charts library~~, 
- ~~map ".csv" data to format needed~~,
- ~~create a first non-interactive chart with basic data~~, 
- ~~add styles~~,
- ~~implement a way of modifying the chart with inputs~~,
- ~~control bundle size~~,
- ~~add proper README.md info (including tests granularity and lack of TS in tests, and storybook explanations, sorting comes with backend data)~~. 

Nice to have: 
- RWD - *partially implemented*, 
- deployment,
- build, 
- some functional tests, 
- accessibility, 
- storybook - *partially implemented*.

Requirements: create-react-api, typescript, lodash

Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
