const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const app = express();
const port = process.env.PORT || 3000;


// app.use((req, res, next) => {
//     debug("my middleware");
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require("./src/config/passport.js")(app);
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/public")));
app.use("/js", express.static(path.join(__dirname, "/public")));


app.set("views", "./src/views");
app.set("view engine", "ejs");


const nav = [ // header nav
    { link: '/books', title: 'Book' },
    { link: '/authors', title: 'Author' }
  ];
const bookRouter = require('./src/routes/bookRoutes')(nav); // import from file and pass nav array
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
      title: 'Library'
    }
  );
});

app.listen(3000, () => { debug(`listening on port ${chalk.green(port)}`); });