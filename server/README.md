# Audio Analysis Node

- Axios
- express
- form-data
- mysql

## Getting Started

Clone project and enter in folder:

```
cd audio_analysis_node
```

Install Dependencies:

```
npm install
```

Run:

```
npm run start
```

## Built With

- [Express](https://expressjs.com/) - A back end web application framework for Node.js designed for building web applications and APIs.
- [Node](https://nodejs.org/en/) - An open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser.


## Working

- The node module of Audio Annotator have routes and controllers, it connects frontend, database and remote server altogether.
- The application recieves file and Annotations from VUE application and store/update them in database and return responce.
- The application recieves file from VUE and send it to remote server for transcription and store the responce in database.