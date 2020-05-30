## MICRO.COSM
A very minimal micro-service monorepo

# Table of Contents
  - [Introduction](#introduction)
  - [Tech Stack](#techstack)
  - [Install](#install)
  - [Usage](#usage)
  - [Lerna Quick-Reference](#lerna-quick-reference)


## Introduction
A very minimal micro-service monorepo

The project has 3 packages (inside packages directory)

- micro-one (http server - based on Micro)
- micro-two (http server - based on Micro)
- micro-three (http server - based on Express)

## Techstack

- [Lerna](https://github.com/lerna/lerna) - A tool for managing JavaScript projects with multiple packages
- [Micro](https://github.com/vercel/micro) - Asynchronous HTTP microservices or,
- [Express](https://expressjs.com/) - 'Coz everybody uses it
- [Jest](https://jestjs.io) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity
- [Supertest](https://github.com/visionmedia/supertest) - High-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by it

## Install
Checkout the repo and run
```sh
lerna bootstrap
```
in the project's directory

That's it 🚀.

_You'll find the dependenices installed and resolved now_

> `lerna` needs to be available globally for this

## Usage

Go to the root of the  project and run
```
lerna run start
```

That's it 🚀.

_You'll find the services available on their respective ports. Visit the respective ports and see `em in action._

> `lerna` suppresses log output of npm scripts by defualt. To allow for that, run the above script with `--stream` flag

## Jest
Reasons to use Jest
  - Jest is easy to setup
  - The watch-mode is amazing
  - When you console.log something, it actually shows up without any difficulty (this is a bit tricky with many existing Frameworks ).


## Lerna Quick-Reference
Since most of the `micros` will share some common characterstics and behavior, Lerna is levaraged to manage community and cross-micro
depenedencies so that it's DRY and less boring DX for ya!

Here are few of the commands you may find yourselves looking up quite often
```sh
# Adds the module-1 package to the packages in the 'prefix-' prefixed folders
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev

# Install module-1 to module-2 in peerDependencies
lerna add module-1 --scope=module-2 --peer

# Install module-1 in all modules except module-1
lerna add module-1

# Install babel-core in all modules
lerna add babel-core
```

Visit https://github.com/lerna/lerna for more..