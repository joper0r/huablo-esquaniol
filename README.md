# huablo-esquaniol

### Start Services

docker-compose up

### Stop Services

docker-compose down

### Ports

- ElasticSearch: localhost:9200
- Kibana: localhost:5601
- SQL: localhost:3306
- Webapp: localhost:4200

### Elasticsearch

- index: books
- type: json

### Data

#### Insert Data into ES

- nodejs insert_data.js

### Configuration in Docker

- set "vm.max_map_count=262144"


### Index USER

put localhost:9200/User

body:

```
{
       "settings" : {
           "index" : {
               "number_of_shards" : 3,
               "number_of_replicas" : 2
           }
       }
   }
   ```

### Mapping User Favorites

put localhost:9200/User/_mapping/favorites

```
{
  "properties": {
    "bookID": {
      "type": "text"
    }
  }
}
```

### Login

Connect to MYSQL-Server and insert the DUMB-File

Start the server: mysql/server.js
