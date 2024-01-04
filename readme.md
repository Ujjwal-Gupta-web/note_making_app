# Note Making App

## Technologies Used

  - ExpressJS : a framework for building backend applications
  - MongoDB: NoSQL database for storing user data.
  - Jest : used for testing

## Getting Started

### Prerequisites
- Node.js, npm, mongo installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ujjwal-Gupta-web/note_making_app.git
   ```

2. Installing dependencies

   ```bash
    npm i
   ```

3. Running the app

   ```bash
    node index.js
   ```

3. Running tests

   ```bash
    npm test
   ```

4. Access the application at [http://localhost:8000](http://localhost:8000).


## Project Structure

```
root/
|-- __test__/         
|-- controllers/                    
|-- middlewares/                    
|-- models/                    
|-- routes/                    
|-- utility/                    
|-- .env                    
|-- .gitignore                    
|-- index.js                   
|-- jest.config.js                   
|-- package.json                    
|-- package.lock.json                    
|-- readme.md                    
```

## APIs

AUTH APIS

```
|-- /api/auth/login                                 # POST API, {email,password} sent in body
|-- /api/auth/signup                                # POST API, {email,password} sent in body
|-- /api/auth/getRandomUser                         # GET API, gets a random user, used in testing
```

NOTES APIS (All apis are protected)

```
|-- /api/notes/                            # GET API, getAllNotes
|-- /api/notes/                            # POST API, create note send {title,desc} in body
|-- /api/notes/:id                         # GET API, getNoteById
|-- /api/notes/:id                         # PUT API, updateNoteById
|-- /api/notes/:id                         # DELETE API, deleteNoteById
|-- /api/notes/:id/share                   # POST API, shareNote, send {email} in body, email of receiver
```

SEARCH APIS (All apis are protected)
- indexing is used here

```
|-- /api/search?q={query}                          # GET API,
```

## Project Features

- create, read , update , delete of notes can only be done be authenticated user
- login, signup of user
- one authenticated user can share notes with other authentic user
- when fetching all notes user gets all notes created by him and all notes shared with him
- rate limiting of requests is acheived (if more than 100 requests, server will not respond for time)
- logging for all apis is acheived for naviating errors
- Indexing is used to enable effient search

## Postman Link (Access Apis here)

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/21508608-c522bce4-a3f6-40b6-8b60-725892a14872?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D21508608-c522bce4-a3f6-40b6-8b60-725892a14872%26entityType%3Dcollection%26workspaceId%3D5acda12c-aec6-4862-af41-6b0c0e124fcb)
