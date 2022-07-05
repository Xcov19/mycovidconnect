# mycovidconnect

TL;DR: Start Contributing right away:

[![Open Source Helpers](https://www.codetriage.com/xcov19/mycovidconnect/badges/users.svg)](https://www.codetriage.com/xcov19/mycovidconnect)

If you are a first-timer just getting started in the world of Opensource, Git & Github, you will benefit from following the instructions and exercises given here: https://github.com/firstcontributions/first-contributions and then come back to this project.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#snapshot/0e4d8fcb-7196-40e7-9a52-b3265551c5c4)

[![DepShield Badge](https://depshield.sonatype.org/badges/Xcov19/mycovidconnect/depshield.svg)](https://depshield.github.io)

[![Netlify Status](https://api.netlify.com/api/v1/badges/38c2a5f4-bac5-4bec-8d11-a9f08b5b6f71/deploy-status)](https://app.netlify.com/sites/dreamy-keller-b8ad36/deploys)

# TABLE OF CONTENTS

1. [ Description. ](#desc)
2. [ Guidlelines ](#guide)
3. [ Installation ](#ins)
4. [ Running ](#run)
5. [ Frameworks and servivices used ](#fra)
6. [ Contributing ](#cont)
7. [ Credits ](#cre)

<a name="desc"></a>

## 1. Description

This is a part of project XCoV19 which aims to build a software that guides patients to the nearest hospital, while modeling the spread of the virus in order to better anticipate hospital needs. [Here](https://www.mycovidconnect.com/) is the official page.

<a name="guide"></a>

## 2. Project Setup Guidelines

---

- We use React;
- Know how to run tsc with babel: https://babeljs.io/blog/2018/08/27/7.0.0
- Lets agree on JS Guideline<br>

---

In general follow this [Javascript Styleguide](https://google.github.io/styleguide/jsguide.html)

### Always follow Guidelines!! Helps everyone who are trying to contribute.

<a name="ins"></a>

## 3. Installation

These instructions will create a Docker container with the required stack for running and developing the project. If you have Node v14 or higher installed already, and are working on the front end, you can run the front-end locally without preparing at Docker container by following the steps in section 4.  
#### Prepare .env keys

Copy the .env.example file to create your own local .env file.

```bash
cp .env.example .env
```

Update any relevant keys in your new .env file. For example, if you will be working on functionality that requires logging in, create a free Auth0 account [here](https://auth0.com/signup?signUpData=%7B%22category%22%3A%22button%22%7D) and enter the relevant credentials from your account in your local .env file.

Please note: Any time you change the values in this .env file, you will need to stop and restart your Docker container in order for the new values to take effect.

#### Install Docker Compose on Mac

- Click https://docs.docker.com/compose/install/, to start to install Docker Compose
- Click Get Docker Desktop for Mac under Install Compose on macOS
- Click Download from Docker Hub
- Click Get Docker to download docker and run Docker.dmg
- Install docker compose using PIP in command line: pip install -U docker-compose
- Run docker-image to start instance:

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

If this command doesn't work, run 

```bash
PORT=9119 docker-compose up
```

Typescript to compile project.
Babel does the transpiling from target to es5 browser compatible code, tsc does the type-checking.
[See this](https://babeljs.io/blog/2018/08/27/7.0.0) for more info on how to run babel projects using tsc.

<a name="run"></a>

## 4. Developing Locally without Docker

In order to run the client locally in development mode you must already have Node v14+ installed.

Create a local .env file if you have not already.

```bash
cp .env.example .env
```

Add relevant keys to your local .env file. For example, if you will be working on functionality that requires logging in, create a free Auth0 account [here](https://auth0.com/signup?signUpData=%7B%22category%22%3A%22button%22%7D) and enter the relevant credentials from your account in your local .env file.

Please note: any time one of the values in this .env file changes, you will need to stop (`ctrl-c`) and restart the development server in order for the changes to take effect.

Install dependencies.

```bash
npm i
```

If you run into errors with deprecated dependencies or dependency tree errors, try running `yarn install` instead. Once dependencies have successfully installed, start the development server.

```bash
npm start
```

---

If you want to watch the build run compiler-

```bash
./node_modules/.bin/tsc -p tsconfig.json --watch
```

If you want more help on running the app using npm then type-

```bash
npm --help
```

or visit [here](https://docs.npmjs.com/)

---

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

Check package.json for scripts on how to build and run.

---

<a name="fra"></a>

## 5. Frameworks and services-

### Frameworks-

1. [React](https://reactjs.org/)

### Services-

1. [ Firebase ](https://firebase.google.com/)
2. [ Docker ](https://www.docker.com/)

<a name="cont"></a>

## 6. Contributing

Please read [CONTRIBUTING.md](/CONTRIBUTING.md) before you help us!

<a name="cre"></a>

## 7. Credits

(IN NO SPECIFIC ORDER)

[ codecakes ](https://github.com/codecakes)

[ GeekySankar ](https://github.com/GeekySankar)

[ akshayparmar90 ](https://github.com/akshayparmar90)

[ MEME-MAN234 ](https://github.com/MEME-MAN234)

[ jmakhack ](https://github.com/jmakhack)

[ Augilar ](https://github.com/Augilar)

[ odysseaspapadimas ](https://github.com/odysseaspapadimas)

