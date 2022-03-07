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
