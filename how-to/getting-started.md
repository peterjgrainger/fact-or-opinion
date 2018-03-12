# Getting Started

## Copy the repo

Make an [exact copy](https://help.github.com/articles/duplicating-a-repository/) of this repo and mirror to a new one. https://github.com/peterjgrainger/alexa-skill-boilerplate 

#### Install dependencies

navigate to the folder and run npm to install dependences

```
cd awesome-skill
npm install
```
This will take a while, get some ☕️

### How to use it

Any kind of skill can be created with this method but the example that comes with the kit is a custom skill, so we can start with that one.

#### Attempt to deploy the example skill.

To make sure all went well deploy this hello world skill

##### Log in to AWS and now

You will need to log into amazon using your normal details (if you have already registered, otherwise you will have to sign up)

Now requires an email address for the account, you will need to verify the address before continuing.

```
npm run init
```

##### Deploy

Deploy to AWS developer account and now account.

```
npm run deploy
```

##### Manually test

Open the testing page

```
npm run ask:testing
```
Ask alexa some questions to make sure it's working.