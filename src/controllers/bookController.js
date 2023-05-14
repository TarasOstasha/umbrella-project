const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookController');


function bookController(nav) {
    function getIndex(req, res) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const col = await db.collection('books');
                const books = await col.find().toArray();

                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books
                    }
                );
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }());

    }
    function getByid(req, res) {

        const { id } = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectId(id) });
                debug(book);
                res.render(
                    'bookView',
                    {
                        nav,
                        title: 'Library',
                        book
                    }
                );
            } catch (error) {
                debug(error.stack);
            }
        }());

    }
    function middleware(req, res, next) {
       if (req.user) {
            next();
        } else {
            res.redirect("/");
        }
    }

    return { getIndex, getByid, middleware };
}



module.exports = bookController;