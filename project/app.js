let express = require('express');
let app = express();

const fetch = require('node-fetch');
const basicAuth = require('express-basic-auth')

app.use(express.json());        // to support JSON-encoded bodies
app.use(express.urlencoded({    // to support URL-encoded bodies
    extended: false
}));

app.set('view engine', 'pug');
app.use(express.static('public'));

// Basic authentication (project requirement)
app.use(basicAuth({
    users: { 'admin': 'test' },
    challenge: true
}))

// Homepage view
app.get('/' , (req, res) => {
  res.render('index');
});

// Get file from Dataverse API
app.get('/getFile', function (req, res) {
  const dataverseUrl = req.query.dataverse;
  const fileId = req.query.fileId;
  const idType = req.query.idType;

  let reqUrl;

  if (idType === "datafileId") {
    reqUrl = dataverseUrl + '/api/access/datafile/' + fileId;
  } else if (idType === "pid") {
    reqUrl = dataverseUrl + '/api/access/datafile/:persistentId?persistentId=' + fileId;
  } else {
    console.log("File ID not set");
  }

  if (req.query.apiKey !== "") {
    const apiKey = req.query.apiKey;
    reqUrl += "&key=" + apiKey
  }

  getFile();
  
  function getFile() {
    fetch(reqUrl)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error(err));
  }
})

app.listen(3000);
