# codingride
My personal website using xbort.net as a back-end.

## Usage
- Clone the repository.
- Make sure you have Vue-CLI installed globally.
- Change "src/config.js" configurations based on your xbort.net account details.
- Change "config/index.js" host and port to fit your development environment.
- Run npm install.
- Run npm run dev.
- Be creative

## Post schema in xbort.net database
```json
{
    "title" : "string",
    "slug" : "string",
    "short" : "string",
    "content" : "string",
    "stat" : true,
    "pin" : false,
    "date" : 1518999691000,
    "expire" : false,
    "type" : "string",
    "owner" : "string",
    "parents" : [
      "string"
    ],
    "images" : [ 
        "string"
    ],
    "image" : "string",
    "keywords" : [ 
        "string"
    ]
}
```