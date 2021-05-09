# Shopping Cart using Node and React

## Table of Contents

- [Shopping Cart using Node and React](#Shopping-Cart-using-Node-and-React)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Problem Statement](#problem-statement)
    - [Overview of the solution](#overview)
    - [Analysis](#analysis)
  - [Important Folders and Files](#important-folders-and-files)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Author](#author)

## Introduction

### Problem Statement

1. Create a basic User Login screen where the user can enter the username and
  password to List the Items in the shopping portal. On login failure show a
  window.alert() saying Invalid username/password. On successful login take the user
  to the List Items screen.
2. The List Items screen is where the user can see all the items. Clicking on an item
  in the items list should add that item to the cart. Show a Checkout button at the
  top of this screen which the user will use to place an order. Also next to the
  Checkout button show 2 buttons:
  1. Cart button to list all the added Items in the cart. Clicking on this button
  should show all the cart items (i.e. cart_id, item_id) in a toast or
  window.alert().
  2. Order History button to list all the placed orders for the user. Clicking on
  this button should show all the placed Order ids in a toast or window.alert().
3. On clicking the checkout button, the cart should get converted to an order. You
  can show the List Items screen again with a toast saying Order successful.


### Overview

This app uses Nodejs and feathersjs for server side and React as front end frame work. 

### Analysis

1. Backend is fully functional at following end points:
	- /item - create,get all items/one item,update and delete
	- /user - create,get all users/one user,update and delete
	- /cart - create,read,update and delete
	- /cart-items - create,read,update and delete
	- /add-to-cart - Add an item to cart 
	- /cart-to-order - Change cart to order 

2. Front end is not 100% functional and a bit buggy 
	- Sign Up and Login 
	- List all items
	- Add item to cart 
	- Increment/Decrement Item 
	- Clear cart 
	- Checkout 

## Important Folders and Files

```
ecomm-node-react
|   
│
└───frontend - client folder, contains react code
|      |
|      |__ Components
|      |__ Constants
|      |__ context
|      :
|      :
|      |__ etc...
|
|
└───backend - Server folder, contains Nodejs code and MongoDB configurations
      |
      |___ Src
            |__middleware
            |__models
            |__services
            :
            :
            |_etc...
```

## Dependencies
### Backend
- "@feathersjs/authentication": "^4.5.11",
- "@feathersjs/authentication-local": "^4.5.11",
- "@feathersjs/authentication-oauth": "^4.5.11",
- "@feathersjs/configuration": "^4.5.11",
- "@feathersjs/errors": "^4.5.11",
- "@feathersjs/express": "^4.5.11",
- "@feathersjs/feathers": "^4.5.11",
- "@feathersjs/socketio": "^4.5.11",
- "@feathersjs/transport-commons": "^4.5.11",
- "compression": "^1.7.4",
- "cors": "^2.8.5",
- "feathers-mongoose": "^8.3.1",
- "helmet": "^4.4.1",
- "mongodb-core": "^3.2.7",
- "mongoose": "^5.12.3",
- "serve-favicon": "^2.5.0",
- "winston": "^3.3.3"

### Frontend
- "@testing-library/jest-dom": "^4.2.4",
- "@testing-library/react": "^9.3.2",
- "@testing-library/user-event": "^7.1.2",
- "axios": "^0.21.1",
- "bootswatch": "^4.4.1",
- "react": "^16.13.1",
- "react-bootstrap": "^1.5.2",
- "react-dom": "^16.13.1",
- "react-helmet-async": "^1.0.5",
- "react-router-dom": "^5.1.2",
- "react-scripts": "3.4.1"

## Installation
#### Backend
  - cd to/folder/backend
  - npm install --save
  - npm start
#### Frontend
  - cd to/folder/frontend
  - npm install --save
  - npm start

## Usage

- Signup (Creates a User) and Login (Creates accessToken)

- Create items at http://localhost:3030/item using postman or directly inserting to DB.
- Method: Post 
- Sample payload:
{
    "name": "item 1",
    "cost": "3"
}

## Future Scope
- Integrate redux saga for API calls 
- Improve UI and error handling
- Writing test cases 

## Author

- [Shreekar Hegde](https://shreekarhegde.com)
