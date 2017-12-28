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
