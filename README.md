# PayItForward - API

A network of generosity

Live version: (https://pay-it-forward-andrewrametta.vercel.app/)

## Introduction 

If you have something to donate but don't know who to give it to. If you are a nonprofit looking for local donations. 

PayItForward is network of donors and nonprofits. We connect the donors item to the nonprofit that requests it. We provide image uploading and a messaging service that keeps everything simple and efficient.

## Technologies

* Node and Express 
  * Authentication via JWT 
  * RESTful API 
* Testing 
  * Supertest (integration) 
  * Mocha and Chai (unit)
* Database 
  * Postgres
  * Knex.js 
  
## Production 

Deployed via Heroku

## API Endpoints

### Users Router
```
- /api/users 
- - GET - gets user that matches 
- - POST - creates a new user
```

### Items Router
```
- /api/items
- - GET - gets all items
- - POST - creates a new item

- /api/items/:item_id
- - GET - get item with item_id
- - DELETE - deletes an item with item_id
- - PATCH - edits an item with item_id
```


### Auth Router
```
- /api/auth/login
- - POST - creates auth token
```

### Upload Router
```
- /api/uploads
- - POST - creates a new upload image
```


### Conversations Router
```
- /api/conversations
- - GET - gets all conversations
- - POST - creates a new conversation
```

### Messages Router
```
- /api/messages
- - GET - gets all conversations
- - POST - creates a new message

- /api/messages/:conversation_id
- - GET - gets all messages with conversation_id
```

