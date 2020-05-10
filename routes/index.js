var express = require('express');
const axios = require('axios');
const googleTrends = require('google-trends-api');
var router = express.Router();

const guardianapi = "c282f3ca-af9c-4575-9867-d82fe572f550";

function filterArticles_guardian(responsedata) {
  const articles = responsedata.response.results;
  var articles_list = [];
  var i = 0;
  for (var article of articles) {
    if (i > 9) break;
    if (
        article.sectionId !== null &&
        article.sectionId !== "" &&
        article.webTitle !== null &&
        article.webTitle !== "" &&
        article.webPublicationDate !== null &&
        article.webPublicationDate !== "" &&
        article.blocks.body[0].bodyTextSummary !== null &&
        article.blocks.body[0].bodyTextSummary !== ""
    ) {
      articles_list.push(article);
      i++;
    }
  }
  return {articles: articles_list}
}

//Guardian endpoints

router.get('/guardian', (req, res) => {
  axios.get("https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=" + guardianapi)
      .then(function (response) {
        res.send(response.data);
      });
});



router.get('/guardian/world', (req, res) => {
  axios.get('https://content.guardianapis.com/world?api-key=' + guardianapi + '&show-blocks=all&page-size=20')
      .then(function (response) {
        res.send(filterArticles_guardian(response.data));
      });
});

router.get('/guardian/politics', (req, res) => {
  axios.get('https://content.guardianapis.com/politics?api-key=' + guardianapi + '&show-blocks=all&page-size=20')
      .then(function (response) {
        res.send(filterArticles_guardian(response.data));
      });
});

router.get('/guardian/business', (req, res) => {
  axios.get('https://content.guardianapis.com/business?api-key=' + guardianapi + '&show-blocks=all&page-size=20')
      .then(function (response) {
        res.send(filterArticles_guardian(response.data));
      });
});

router.get('/guardian/technology', (req, res) => {
  axios.get('https://content.guardianapis.com/technology?api-key=' + guardianapi + '&show-blocks=all&page-size=20')
      .then(function (response) {
        res.send(filterArticles_guardian(response.data));
      });
});

router.get('/guardian/science', (req, res) => {
    axios.get('https://content.guardianapis.com/science?api-key=' + guardianapi + '&show-blocks=all&page-size=20')
        .then(function (response) {
            res.send(filterArticles_guardian(response.data));
        });
});

router.get('/guardian/sports', (req, res) => {
  axios.get('https://content.guardianapis.com/sport?api-key=' + guardianapi + '&show-blocks=all&page-size=20')
      .then(function (response) {
        res.send(filterArticles_guardian(response.data));
      });
});

//detail article endpoint
router.get('/guardian/article', (req, res) => {
    const id = req.query.id;
    axios.get('https://content.guardianapis.com/'+ id +'?api-key=' + guardianapi + '&show-blocks=all')
        .then(function (response) {
            res.send(response.data);
        });
});

//google trending endpoint
router.get('/guardian/trending/:query', (req, res) => {
    const queryString = req.params.query;
    googleTrends.interestOverTime({
        keyword: queryString,
        startTime: new Date('2019-06-01')
    })
        .then(function(results){
            res.send(results);
        })
        .catch(function(err){
            console.error('Oh no there was an error', err);
        });
});

//Search endpoint

router.get('/guardian/search/:query', (req, res) => {
  const queryString = req.params.query;
  axios.get('https://content.guardianapis.com/search?q=' + queryString + '&api-key=' + guardianapi + '&show-blocks=all')
      .then(function(response) {
        res.send(response.data);
      });
});

router.get("/", (req, res) =>{
    res.send("Hello World");
});

module.exports = router;
