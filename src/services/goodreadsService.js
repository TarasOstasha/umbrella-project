const axios = require("axios");
const xml2js = require("xml2js");
const debug = require("debug")("app:goodreadsService");

const parser = xml2js.Parser({ explicitArray: false });
function goodreadService() {
    function getBookByid(id) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=r5oV4OPffoSbhrmou9GEGA`)
                .then(response => {
                    parser.parseString(response.data, (err, result) => {
                        if(err) {
                            debug(err);
                        } else {
                            debug(result);
                            resolve( result.GoodreadsResponse.book ); // data from xml response request
                        }
                    });
                })
                .catch((error => {
                    reject(error);
                    debug(error);
                }));
            
        });
    }
    return { getBookByid };
}



module.exports = goodreadService();