const express = require("express");
const index = require("./routes/index");
const accounts = require("./routes/accounts");
const post = require("./routes/post");
const login = require("./routes/login")
const mysql = require("mysql");

const hostname = "127.0.0.1";
const port = 3000;

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "db"
};

const db = mysql.createConnection(dbConfig);

function connectCallback(error) {
    if (error) {
        throw error;
    }
}

let app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//login credential object
global.user = {
    id : 0,
    username : "test",
    profilePicture: ""
};
global.post = {
    postId : 0,
};

app.get('/', index.getHomePage);
app.get('/account/add', accounts.addAccountPage);
app.get('/account/edit/:id', accounts.editAccountPage);
app.get('/account/delete/:id', accounts.deleteAccount);
app.get('/post/view/:id', post.mainPostPage);
app.get('/post/add', post.addPostPage);
app.get('/post/edit/:id', post.editPostPage);
app.get('/post/like/:id', index.likePost);
app.get('/post/unlike/:id', index.unlikePost);
app.get('/post/delete/:id', post.deletePost);
app.get('/login', login.loginPage);
app.get('/logout', login.logout);
app.get('/account/view/:id', accounts.mainAccountPage);
app.get('/comment/add', post.addCommentPage);
app.get('/comment/edit/:id', post.editCommentPage);
app.get('/comment/delete/:id', post.deleteComment);
//app.get('/comment/like/:id', index.likeComment);
//app.get('/comment/unlike/:id', index.unlikeComment);

app.post('/account/add', accounts.addAccount);
app.post('/account/edit/:id', accounts.editAccount);
app.post('/post/add', post.addPost);
app.post('/post/edit/:id', post.editPost);
app.post('/login', login.login);
app.post('/comment/add', post.addComment);
app.post('/comment/edit/:id', post.editComment);

function listenCallBack() {
    console.log(`listening on http://${hostname}:${port}`);
}

app.listen(port, hostname, listenCallBack);

db.connect(connectCallback);

global.db = db;