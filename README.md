# huablo-esquaniol

### Start Services

docker-compose up

### Stop Services

docker-compose down

### Ports

- ElasticSearch: localhost:9200
- Kibana: localhost:5601
- SQL: localhost:3306
- Mysql: localhost:4200

### Elasticsearch

- index: books
- type: json

### Data

#### Insert Data into ES

- nodejs insert_data.js

### Configuration in Docker

- set "vm.max_map_count=262144


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

### Inhalt User Favorites

Ein Array von Book ID's, die dann mit einem call mit should jedes dieser Bücher zurückgegen (Oder-Verknüpfung) 

get localhost:9200/user/_search?q=_id:12378

```
_source": {
    "bookID": [
        "4yoXCgAAQBAJ",
        "bT5suOONXlgC",
        "CFR1CAAAQBAJ"
    ]
}
```