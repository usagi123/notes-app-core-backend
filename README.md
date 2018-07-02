# NodeJS Backend for iOS note taking app
This is a CRUD of RestAPI using NodeJS and MongoDB as a backend.

Make sure that you have the following libraries by running:
``` 
npm install express --save
npm install mongodb --save
npm install monk --save
npm install body-parser --save
```
It will update the package.json and download required libraries

Run as
```node app.js```

Format
```
{
	"name": "buy milk",
	"content": "walnut milk",
	"createdLocation": [10.7293386,106.69428629999993],
	"calledLocation": [10.7290836, 106.7188731],
	"createdTime": [2, "July", 2018],
	"expiredTime": [9, "July", 2018]
}
```
