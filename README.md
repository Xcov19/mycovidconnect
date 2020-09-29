# mycovidconnect

[![DepShield Badge](https://depshield.sonatype.org/badges/owner/repository/depshield.svg)](https://depshield.github.io)

[![Open Source Helpers](https://www.codetriage.com/xcov19/mycovidconnect/badges/users.svg)](https://www.codetriage.com/xcov19/mycovidconnect)

[![Netlify Status](https://api.netlify.com/api/v1/badges/38c2a5f4-bac5-4bec-8d11-a9f08b5b6f71/deploy-status)](https://app.netlify.com/sites/dreamy-keller-b8ad36/deploys)

# TABLE OF CONTENTS

1. [ Description. ](#desc)
2. [ Guidlelines ](#guide)
3. [ Installation ](#ins)
4. [ Running ](#run)

<a name="desc"></a>

## 1. Description

This is a part of project XCoV19 which aims to to build a software that guides patients to the nearest hospital, while modeling the spread of the virus in order to better anticipate hospital needs. [Here](https://www.covidsos.net/website/home.html) is the official page.

<a name="guide"></a>

## 2. Project Setup Guidelines

<hr>

-   We use React;
-   Know how to run tsc with babel: https://babeljs.io/blog/2018/08/27/7.0.0
-   Lets agree on JS Guideline<br>

---

In general follow this [Javascript Styleguide](https://google.github.io/styleguide/jsguide.html)

### Always follow Guidelines!! Helps everyone who are trying to contribute.

<a name="ins"></a>

## 3. Installation

#### Run docker image to start instance-

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

Typescript to compile project.
Babel does the transpiling from target to es5 browser compatible code, tsc does the type-checking.
[See this](https://babeljs.io/blog/2018/08/27/7.0.0) for more info on how to run babel projects using tsc.

<a href="run"></a>

## 4. Running

In order to run the app in development mode-

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
