
## Usage
1. Install dependencies:
```sh
$ npm install express --save
$ npm install dotenv --save
$ npm install nodemon --save
``` 
2. Create a `.env` file in your root directory
3. Add all required variables to the file as shown below:
```sh
DB_USER=user\s\s
DB_PASS=password\s\s
DB_ADDR=@example.code.mongodb.net/
```
4. Start the server:
```sh
$ nodemon .\server.js
```
5. Open web browser and enter:
```sh
localhost:8000
```
    
## Routes
|Type                |Request                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|GET|`/sensors`            |Get basic information about server            |
|GET          |`/sensors/history`            |Get 50 latest objects from the database            |
|GET          |`/sensors/last`|Get the last object from the database|
|GET|`/sensors/:id`               |Get an object with the specified id from the database 
|POST|`/sensors`                  |Add object to database 
|UPDATE|`/sensors/:id`            |Update an object in the database 
|DELETE|`/sensors/:id`            |Delete an object with specified id from the database 
