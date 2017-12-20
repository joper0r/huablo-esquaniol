const fs = require('fs');
const elasticsearch = require('elasticsearch');
const data = [];
const dir = './data/';
const index_name = "books";


const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// create index
client.indices.create({
  index: index_name
}, (e, r, s) => {
  console.log(r);
});

// add data
fs.readdir(dir, (err, files) => {
  files.forEach((file) => {
    let book = JSON.parse(fs.readFileSync(dir + file));
    client.index({
      index: index_name,
      type: 'json',
      id: file.slice(0, -5),
      body: book
    });
  });
});
