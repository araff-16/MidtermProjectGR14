
[![Repo Size](https://img.shields.io/github/repo-size/araff-16/Wiki-Maps?style=for-the-badge)]()
[![Code Size](https://img.shields.io/github/languages/code-size/araff-16/Wiki-Maps?style=for-the-badge)]()


![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

# Summary

Multipage application that allows users to collaboratively create, edit and share maps which list multiple points of interest

# Functionality

## Home Page

![Home Page](./public/gif/homePageAndSearch.gif)
Displays all available maps to the user. If a user is logged in they are able to favourite maps they find interesting.

## Viewing map

![Viewing Maps](./public/gif/homePageAndSearch.gif)
When viewing a map, a list of all point of interest will be presented to the left of the map. Clicking on a point on the map will bring up the details of the location.

## Creating map

![Viewing Maps](./public/gif/homePageAndSearch.gif)
Creating a new map on the location you wish to fill a marker and filling 


# Project Structure

- [Front-End](/Client)
  - [Components](/Client/src/components)
  - [Helper Functions](/Client/src/helpers)
  - [Styles](/Client/src/components/Styles)
- [Back-End](/Server)
  - [Database](/Server/db)
    - [Queries](/Server/db/queries)
    - [Schemas](/Server/db/schema)
    - [Seeds](/Server/db/seeds)
  - [API-Routes](/Server/routes)

# Project Setup

- [Fork](https://github.com/Dev-s-Den/Devs-Den/fork) this repository and clone to your local device.
- Install dependencies with `npm install` in both [Server](/Server) and [Client](/Client).
- Make an ENV file for the back-end [.env.example](/Server/.env.example).
- Make an ENV file for the front-end [.env.example](/Client/.env.example).
- Build a database (psql preferrably) and change the information in the ENV file accordingly.
- Run the server using `cd Server`, `npm run local`.
- Run the application front-end using `cd Client`, `npm start`.





## Wiki Maps



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
