# Bulletproof Node.js architecture 🛡️

This is the example repository from the blog post ['Bulletproof node.js project architecture'](https://softwareontheroad.com/ideal-nodejs-project-structure?utm_source=github&utm_medium=readme)

Please read the blog post in order to have a good understanding of the server architecture.

Also, I added lots of comments to the code that are not in the blog post, because they explain the implementation and the reason behind the choices of libraries and some personal opinions and some bad jokes.

The API by itself doesn't do anything fancy, it's just a user CRUD with authentication capabilities.
Maybe we can transform this into something useful, a more advanced example, just open an issue and let's discuss the future of the repo.

## Getting Started

We use `node` version `18.18.0`

```
nvm install 18.18.0
```

```
nvm use 18.18.0
```

The first time, you will need to run

```
npm install
```

Start a local database with docker

```
docker-compose up -d
```

Then just start the server with

```
npm run start
```

# API Validation

- [ ] Unit tests examples
- [ ] [Cluster mode](https://softwareontheroad.com/nodejs-scalability-issues?utm_source=github&utm_medium=readme)
- [x] The logging _'layer'_
- [ ] Add ageda dashboard
- [x] Continuous integration with CircleCI 😍
- [ ] Deploys script and docs for AWS Elastic Beanstalk and Heroku
- [ ] Integration test with newman 😉
- [ ] Instructions on typescript debugging with VSCode

# FAQ

## Where should I put the FrontEnd code? Is this a good backend for Angular or React or Vue or _whatever_ ?

[It's not a good idea to have node.js serving static assets a.k.a the frontend](https://softwareontheroad.com/nodejs-scalability-issues?utm_source=github&utm_medium=readme)

Also, I don't wanna take part in frontend frameworks wars 😅

Just use the frontend framework you like the most _or hate the less_ it will work 😁

## Don't you think you can add X layer to do Y? Why do you still use express if the Serverless Framework is better and it's more reliable?

I know this is not a perfect architecture but it's the most scalable that I know with less code and headache that I know.

It's meant for small startups or one-developer army projects.

I know if you start moving layers into another technology, you will end up with your business/domain logic into npm packages, your routing layer will be pure AWS Lambda functions and your data layer a combination of DynamoDB, Redis, maybe redshift, and Agolia.

Take a deep breath and go slowly, let the business grow and then scale up your product. You will need a team and talented developers anyway.
