const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const service = require('./service');
const app = express();
const PORT = process.env.PORT || 3000;
const host = "localhost";
const urlDb = require("./dbUrl");
const bodyParser = require("body-parser"); //use to parse incoming request bodies
mongoose.connect('mongodb+srv://mdb305041:mdb305-mongodb@cluster0.th2hpog.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/shorten', async (req, res) => {

  const urlKey = service.generateUrlKey();
  const shortUrl = urlKey
//   console.log(shortUrl);
console.log(req.body.longURL);
urlDb.save(req.body.longURL,shortUrl,urlKey);
  res.json(shortUrl);
});

app.get("/:shortUrlId", async (req, res) => {
    // console.log(req.params);
    console.log(req.body);
    try {
        const url = await urlDb.find(req.params.shortUrlId);
        console.log(url.longURL);
        // console.log(req.params);
        return !url ? res.status(404).send("Not found") : res.redirect(301,url.longURL)
    } catch (error) {
        return res.status(500).send("Error. Please try again.")
    }
}); 


// app.post("/url", async (req, res) => {
//     try {
//         if (!!service.validateUrl(req.body.url))
//             return res.status(400).send({ msg: "Invalid URL." });
//         const urlKey = service.generateUrlKey();
//         const shortUrl = `http://${host}:${PORT}/${urlKey}`
//         await Url.save(req.body.url, shortUrl, urlKey)
//         return res.status(200).send({ shortUrl });
//     } catch (error) {
//         return res.status(500).send({ msg: "Error. Please try again." })}});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});