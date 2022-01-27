
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

![Home Page](./documents/home.gif)
Displays all available maps to the user. If a user is logged in they are able to favourite maps they find interesting.

## Viewing Map

![Viewing Maps](./documents/viewmap.gif)
When viewing a map, a list of all points of interest will be presented to the left of the map. Clicking on a point on the map will bring up the details of the location.

## Creating Map

![Creating Maps](./documents/createmap.gif)
When creating a map click on the location you wish to add a marker and fill out the dropdown form that appears.


# Project Structure

- Front-End
  - [Views](/views)
  - [Styles](/styles)
  - [Scripts](/public/scripts)
- Back-End
  - [Server](./server.js)
  - [Routes](/routes)
  - [Schema](/db/schema)
  - [Seeds](/db/seeds)

## Project Setup

1. [Fork](https://github.com/araff-16/Wiki-Maps/fork) this repository and clone to your local device.
2. Install dependencies with `npm install` 
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


