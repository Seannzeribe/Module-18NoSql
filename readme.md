I used express, mongoose, body-parser npm packages in my assignment.
Express initialises the application, mongoose helps in connecting the cloud database, and body-parser will read the data being passed
I connected the database using mongoose.connect() operation, and added checks if connection is successful or not.
Then, I created models for mongoose as given in the assignment with all the valid operations, These models will allow creation of new fields in the database.
I ran the server on PORT 3000, which gets a console message if the server is running successfully on localhost.
I created all the API's as described in the assignment pdf using app.get(), app.post(), app.put() and app.delete(),
by passing the required API routes into them followed by a proper callback function that will do the required operation.
Finally I checked all the API's on Insomnia, with multiple checks, and everything runs successfully without giving an error.

- Also I used nodemon which helped me to restart the server automatically after saving my recent changes
