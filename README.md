## Hi there

Welcome to [Crypto Address Tracker](https://main.d3j446pjm8j8gc.amplifyapp.com/), the open source web application for tracking blockchain addresses! <br>

## Functionality Overview

As a visitor, you will be able to see the current information associated with your favorite crypto address of choice. Information like a list of crypto currencies such address owns will be available for query 24/7. <br>

As our registered user, you will have exclusive access to our analytics and tracking service, in addition to query your selected crypto address. For the tracking service, we will continuously monitor address behavior and store relevant information to our database, so that later you can generate meaningful reports from them.

## Installment
Our application is built with frontend framework **React.js** and backend framework **Flask** using **Python** and **Javascript**. Our repository is a monolithic codebase that stores both our frontend and backend code. Before start, please make sure you already have our project cloned to your local environment.

For frontend, please make sure you have `npm` installed, our package manager for React.js.

```
cd blockchain-tracker-frontend/
npm install
npm start
```

For backend, please make sure you have `Anaconda` installed, it helps us install some dependencies needed.

```
cd backend
nohup python3 -u flask_api.py &
```

```
cd user_info
export FLASK_APP=user_info_flask
flask init-db
flask run --host 0.0.0.0
```

Alternatively, you can install the dependency by manually install the pip dependencies:
```
pip install -r requrements.txt
```


For database, we are using embedded database **SQLite**, you need to run some scripts to start your local server.

```
cd user_info/user_info_flask
//find a file named schema.sql
//create a database named USER_INFO_DB and run the script above
```

## Deployment
Our frontend application is deployed using **AWS Amplify**, any new changes made to our `blockchain-tracker-frontend` repository will trigger CI/CD process and re-deploy our application. 

Our backend application is deployed using **AWS EC2**, with **Travis CI** setup for continuous integration.


### Using a CI/CD pipeline

Frontend uses AWS Amplify to manage CI/CD pipelines automatically, once the directory blockchain-tracker-frontend/ is updated, CI/CD will be automatically triggered, below is the script used for CI/CD pipeline:

```
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: build
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
    appRoot: blockchain-tracker-frontend
```    
