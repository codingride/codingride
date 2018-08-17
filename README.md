# codingride
My personal website using xbort.net as a back-end and kalimah.net as CMS.

## Usage
- Clone the repository.
- Change "settings.js" configurations based on your xbort.net account details.
- Run npm install.
- Run node kalmiah.js or add it to PM2 list.
- Be creative

## Post schema in xbort.net database
```json
{
    "postTitle" : "string",
    "postLink" : "string",
    "postContent" : "string",
    "postStatus" : "string",
    "postPin" : "string",
    "date" : 1518999691000,
    "postType" : "string",
    "postOwner" : "string",
    "postCategory" : {},
    "postMedia" : [ 
        "string"
    ],
    "postImage" : "string",
    "postTags" : [ 
        {}
    ]
}
```