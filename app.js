const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();



app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/public")));
app.use("/js", express.static(path.join(__dirname, "/public")));


app.set("views", "./src/views");
app.set("view engine", "ejs");

const books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Misérables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
    },
    {
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    },
    {
        title: 'The Dark World',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        read: false
    },
    {
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        read: false
    },
    {
        title: 'Life On The Mississippi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    }];
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname + "/views/", "/index.html"));
    res.render(
        "index",
        {
            nav: [{ link: "/books", title: "Books" }, { links: "/authors", title: "Authors" }],
            title: "Library",
            books
        });
});
bookRouter.route("/").get((req, res) => {
    res.render("books",
        {
            nav: [{ link: "/books", title: "Books" }, { links: "/authors", title: "Authors" }],
            title: "Library",
            books
        });
});
bookRouter.route("/single").get((req, res) => {
    res.send("hello single books");
});
app.use("/books", bookRouter);

app.listen(3000, () => { debug(`listening on port ${chalk.green(port)}`); });