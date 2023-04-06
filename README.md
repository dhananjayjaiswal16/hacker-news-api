
## Run Locally

Clone the project

```bash
  git clone https://github.com/dhananjayjaiswal16/hacker-news-api.git
```

Go to the project directory

```bash
  cd hacker-news-api
```

Install dependencies

```bash
  npm install
```

Run app on localhost

```bash
  npm run dev
```


## Folder Structuring

- src/
  - **@types/:** containes list of all custom types

  - **config/**: contains basic configurations

  - **controllers** : contains all controller files
    - CommentsController - Ts file for handling /comments route
    - PaststoriesController - Ts file for handling /past-stories routes
    - TopstoriesController - Ts file for fetching /top-stories data

  - **helper**: contains functions which are used at multiple places in the app
  - **middleware**: stores error handler middlewware
  - **models**: stores schema file
  - **routes**: contains :-
    - **__ test __:** contains some unit test cases for all the routes
    - /top-stories: return the top 10 stories ranked by the score in the last 15 minutes (stores data in cache for 15 minutes)
    - /past-stories: return all the stories that were served previously from the 1st endpoint (/top-stories)
    - /comments/:id :return 10 comments (max) on a given story sorted by a total number of child comments

  - **app.ts**
  

## Tech Stack
typescript, node.js, express and mongodb


## Run on Docker

```bash
  docker-compose up -d
```


