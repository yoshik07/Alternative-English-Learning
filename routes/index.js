var express = require('express');
var router = express.Router();

var pg = require('pg');

var knex = require('knex')({
    dialect: 'pg',
    connection: {
        host: 'ec2-18-215-99-63.compute-1.amazonaws.com',
        user: 'knlenrvicbsere',
        password: '77adb80fec2be76bd02b5fbb2a93db733cea4a56c3a89c5c6700715db5032eae',
        database: 'template1',
        charset: 'utf8',
        port: 5432
    }
});

var Bookshelf = require('bookshelf')(knex);

var Answerdbtb0 = Bookshelf.Model.extend({
  tableName: 'answerdbtb0'
});

var fs = require('fs');



// トップページへのアクセス
router.get('/', (req, res, next) => {
  if(req.session.login == null){
    res.redirect('/login');
    return;
  }
  new Answerdbtb0().fetchAll().then((collection) => {
    var data = {
      login: req.session.login,
      collection: collection.toArray(),
      textarea: '',
      correct: '',
    };
  console.log('あああ');
  res.render('index2', data);
 });
}); 
  // //   console.log(data);
  //   res.render('index', data);
  //   }).catch((err) => {
  //     console.log("line38 in index.js")
  //     res.status(500).json({error: true, data: {message: err.message}});




// テキストエリアに回答を入力し、送信
router.post('/', (req, res, next) => {
  var url_array = Object.keys(req.body);
  var url = url_array[0];
  var ans_array = Object.values(req.body);
  var ans = ans_array[0];
  var txt = fs.readFileSync("littlemermaid.txt");
  var lines = txt.toString().split('¥n');
  for (var line of lines){ console.log(line) }
  new Answerdbtb0().where('video', '=', url)
  .fetch()
  .then((collection) => {
      var data = {
        title: 'Answer',
        login: req.session.login,
        answer_url: url,
        ans: ans,
        collection: collection,
        lines: lines
      };

      res.render('index3', data);
      });
    });
    // }).catch((err) => {
    //  res.status(500).json({errpr: true, data: {message: err.message}});
    // });



// From index.php
// function clickVideoURL(){
//   var url = document.getElementById("videourl").value;
//   console.log(url);
//   document.getElementById("youtube").src = url;
// }


// Value in Option in Select
// <%= collection[i].attributes.video %>

// function clickVideoURL(){
//   var selected_url = document.getElementById("selected_url").value;
//   console.log(selected_url);
//   document.getElementById("youtube").src = selected_url;
// } 



module.exports = router;
