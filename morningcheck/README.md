# Morning Checks - Web API 

# Build and Run
Build Server API
* cd morningcheck
* npm install
* node .
* (if you want to use mongodb, "NODE_ENV=staging node .", but make sure you have mongodb installed with port open at 27017, check datasources.staging.json)
* open localhost:3000/explorer in your browser

# Usage

## To upload data, login first
e.g.
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username": "huangjim", "password": "huangjim"}' 'http://localhost:3000/api/Developers/login'
```

You will get something like below:
{"id":"EZUfU7tK8pT9ehy95LzSDIDEHJapCtMmRLJxlZc2YXkkM3hOaX4GSjRVEGgOrvoM","ttl":1209600,"created":"2018-09-06T05:29:48.851Z","userId":"5b90b99b6fb8b231a6ef0dae"}

**With token (id above), you can now get full permission to all data.**

## To see other developers
Use token from login request
e.g.
```
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Developers?access_token=TUoGBVZ5RIofAKKNswszb5o05Cl5SX7gCnETVrYrSkCHYipC8cTIhC8soLC3fEhP'
```

You will get a list of developers back like below:
[{ 
    "name": "Jimmy Huang",
    "team": "Algo",
    "username": "huangjim",
    "email": "huangjim@ubs.com",
    "emailVerified": true,
    "id": "5b90b99b6fb8b231a6ef0dae"
  } ...
]

## To upload task
Use token from login request. Note, for "data" field, you need to use "\" to escape double quote
e.g. 
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "time": "2018-09-06T03:03:52.097Z", "submitBy": 1, "category": "Galaxy", "description": "All systems are running", "status": "OK", "data":  "{\"StartTime\": \"13:45:00\", \"EndTime\": \"13:50:00\", \"info\": \"Complete all jobs\"}" }' 'http://localhost:3000/api/Tasks?access_token=TUoGBVZ5RIofAKKNswszb5o05Cl5SX7gCnETVrYrSkCHYipC8cTIhC8soLC3fEhP'
```

 ## To get all tasks
Everyone can read data. No restriction.
e.g.
```
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Tasks'
```

You will get all the tasks back.

This is probably too much, add filter for the data we are interested.

e.g. **Filter by submitBy**. {"where": {"submitBy": "5b90b99b6fb8b231a6ef0daf"} }  - submitBy is the user id from above login request

```
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Tasks?filter=%7B%22where%22%3A%20%7B%22submitBy%22%3A%20%225b90b99b6fb8b231a6ef0daf%22%7D%20%7D'
```

e.g. **Filter by status**. {"where": { "status": "Caution" } }

```
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Tasks?filter=%7B%22where%22%3A%20%7B%20%22status%22%3A%20%22Caution%22%20%7D%20%7D'
```

## To Test

**No task upload access to unknown user**
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "time": "2018-09-06T03:03:52.097Z", "submitBy": 1, "category": "Galaxy", "description": "All systems are running", "status": "OK", "data":  "{\"StartTime\": \"13:45:00\", \"EndTime\": \"13:50:00\", \"info\": \"Complete all jobs\"}" }' 'http://localhost:3000/api/Tasks'
```

Response:
{"error":{"statusCode":401,"name":"Error","message":"Authorization Required","code":"AUTHORIZATION_REQUIRED"}}

**No developer read access to unknown user**
```
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Developers'
```

Response:
{"error":{"statusCode":401,"name":"Error","message":"Authorization Required","code":"AUTHORIZATION_REQUIRED"}}
