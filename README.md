[![Codacy Badge](https://app.codacy.com/project/badge/Grade/632fe5c90b3849f8a8843978cf0b5471)](https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

# Automation Cypress
Automation project for Liverpool E-Commerce desktop and mobile browsers.

## Prerequisites
To check whether you already have Node installed, open new terminal window and type:
```bash
$ node -v
```
If you have Node.js installed, it should output Node’s version. If you don’t, you’ll see this message in shell:
```bash
$ zsh: command not found: node
```
That means that the command you are trying to run is not installed. There are several ways to install Node.js and NPM:
- Using the macOS installer available from the [Node.js](https://nodejs.org/) website
- Using [homebrew](https://brew.sh/)

## Installation
```bash
$ git clone https://github.com/Servicios-Liverpool-Infraestructura/ICD_Automation_Cypress.git
$ cd ICD_Automation_Cypress/ 
$ npm i
```

## CLI run parameters examples
#### Mobile
```bash
$ npm run cypress:mobile ENV='prod',SITE='www',STORE='liverpool',TAGS='(@p0 and @liv) and not (@ignore or @desktop)'
```
#### Desktop
```bash
$ npm run cypress:desktop ENV='prod',SITE='www',STORE='liverpool',TAGS='(@p0 and @liv) and not (@ignore or @mobile)'
```
#### Desktop Open
```bash
$ npm run cypress:open:desktop
```

#### Generate report
```bash
$ node cucumber-html-report.js
```

## Viewport configurations
|Preset          |width                          |height                       |
|----------------|-------------------------------|-----------------------------|
|macbook-13      |1280                           |800                          |
|iphone-x	     |375                            |812                          |

## Update all outdated packages

First, check the packages which are outdated
```bash
$ sudo npm i -g npm-check-updates
```

Second, put all of them in ready
```bash
$ ncu -u
```

Third, just update all of them.
```bash
$ sudo npm install
```
That's it.

In Mac OS you need to run as admin in the first time
```bash
$ sudo npx cypress open
```