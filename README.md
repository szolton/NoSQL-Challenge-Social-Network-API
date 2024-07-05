# **NoSQL Challenge: Social Network API**

The purpose of this project was to use MongoDB to build an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friends list.

We need to use express.js for routing, a MongoDB database, and the Mongoose ODM.

Sources: https://www.youtube.com/watch?v=TtLm6rTZ11I&ab_channel=THOSCALLE, https://www.youtube.com/watch?v=c2M-rlkkT5o

I followed the resources to create the routes, controllers, models and server.js files.

![file paths](./assets/images/Screen%20Shot%202024-07-05%20at%202.33.48%20PM.png)

Next, I took it to Insomnia to set up the GET, POST and PUT routes, where you can see a screenshot of the full folders and routes here.

![insomnia-page](./assets/images/Screen%20Shot%202024-07-05%20at%202.35.15%20PM.png)

You can use Insomnia to update the thoughts, users, friends, and reactions.

In conclusion, I set up the social network API to:
- When you enter a command to invoke the application, your server is stared and Mongoose models are synced to the MongoDB database
- You open the API GET routes in Insomnia for users and thoughts
- Data for each of the routes is displayed in a formatted JSON
- When you test API POST, PUT, and DELETE routes in Insomnia, you are able to create, update and delete users and thoughts in your database
- When you test API POST and DELETE routes in Insomnia, you're then able to create and delete reactions to thoughts and add and remove friends to a users friend list

Please follow this link to the successful, full deployed site on GitHub: https://github.com/szolton/NoSQL-Challenge-Social-Network-API and walkthrough video: https://vimeo.com/978415873