# Config

## Database

Even though it isn't the most essential, it is *highly* recommended. The database will be used to store : past auctions, and rate limits ( by IP ).
Your db must have a get, set, and delete function that supports storing string. It can be async or sync.
As any db, it must be fast enough.
You might have to make a separate file like database.js, which would look like :
```js
//WARNING THIS IS AN EXAMPLE, IT WON'T WORK
const database = require("GrapefruitDB")
const db = new database.database()
module.exports = {
"get":db.fetch, // your db uses fetch("key") to get the value
"set":db.set,
"delete":db.remove
}
```
Of course, if you want everything to be ephemeral, it is also possible.

## env

Now that your database is ready, you need to configure your env file.
### Obligatory Arguments ( These are required for the script to work )
- API="key"
- DBModule="absolute/path/to/your/database/file/above"
- NODB="if set to true, cancels out DB."
### Optional
- SAFE="if true, uses an alternative startup that takes a lot longer."
