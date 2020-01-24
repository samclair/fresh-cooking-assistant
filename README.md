# fresh-cooking-assistant
An application for cooks who want to elevate their cooking with fresh seasonal ingredients.

## Technologies Used
- React.js
- React Router DOM
- Webpack 4
- Bootstrap 4
- PHP
- MySQL
- HTML5
- CSS3
- AWS EC2

## Live Site

Try the application live at [fresh.vg](https://fresh.vg)

## Features

- Users can view a list of seasonal produce
- Users can save produce to their Fresh! list when logged in
- Users can view seasonal recipes
- Users can save their favorites recipes when logged in
- Users can save the ingredients of a recipe to their Fresh! list when logged in
- Users can delete items from their Fresh! list as needed
- Users can view farmer's markets near their current location
- Users can create a calendar event to remember to go to a farmer's market
- Users can be directed to a farmer's market through Google Maps

## Preview

#### Desktop / Laptop / Ipad

![desktop-preview](https://user-images.githubusercontent.com/36774670/70952187-5bd2c680-201a-11ea-8f11-281a2d0bc7f5.png)

#### Mobile

![mobile-preview](https://user-images.githubusercontent.com/36774670/70952188-5bd2c680-201a-11ea-98aa-9de95c2a57df.png)

## Development

#### System Requirements

- NPM 6 or higher
- MySQL 14.14 or higher
- PHP 7.2 or higher

#### Getting Started

1. Clone the repository

    ```shell
    git clone https://github.com/kitten-bites/fresh-cooking-assistant
    cd fresh-cooking-assistant
    ```

1. Install all dependencies with NPM.
 
    ```shell
    npm install
    ```

1. Create a MySQL database

    + Login to MySQL (defaults are root)
    ```shell
    mysql -u<username> -p<password>
     ```
    + Create a new database, remember the name you use
    ```shell
    CREATE DATABASE <name>;
     ```

1. Create required credential files under the */server/api* folder

     + Create a *_config.php* file following the format of *_config.example.php*
      ```shell
         'user' => 'username'
         'pass' => 'password'
         'host' => 'localhost'
         'database' => dbname
      ```
      + Create a *_api-keys.php* file
      + Get a Google Maps API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
      + Get a Tasty! API key [here](https://rapidapi.com/apidojo/api/tasty)
      + Fill in the fields as in *_api-keys.example.php*

1. Import the database

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser
    ```shell
    npm run dev
    ```
