const Url = require("./model.js");
// const save = (longURL, shortURL, shortUrlId) => {
//     Url.create({ longURL : longURL, shortURL, shortUrlId: shortUrlId })

// const find = (shortUrlId) => {
//     Url.findOne({ shortUrlId: shortUrlId }
//     );

//     console.log(shortUrlId)
// };

const save = (longURL, shortURL, shortUrlId) => {
    Url.create({ longURL, shortURL, shortUrlId })
};

const find = async (shortUrlId) => {
    try {
        const url = await Url.findOne({ shortUrlId: shortUrlId });
        // console.log(shortUrlId);
        return url; // Return the result
    } catch (error) {
        console.error(error);
        throw error; // You can choose to handle the error here or propagate it to the caller
    }
};
module.exports = {
    save,
    find
};