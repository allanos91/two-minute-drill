TwoMinuteDrill

Check out a live version of two-minute-drill here: [Two Minute Drill](https://two-minute-drill.onrender.com)


Features & Implementation

Single-Page App
React router and components

Two Minute Drill is a single page app. All "pages" are rendered at a root url "/" by a collection of react components that the user is able to shuffle between. The React router handles the logic associated with component navigation and updates an addendum to the root route. Re-rendering of child components is done throught he React API.

Frontend and Backend Interaction

Two Minute Drill server interactions are limited to retrieval of data from the modification of the database. The front end store the necessary information for rendering upon site entry. Other requests are made on a "need to know" basis by various React components. This minimizes info passed between the frontend and backend and allows for speedy re-rendering handled by React.

Authentication

Users of the site are required to authenticate or sign up. Using any CRUD features such as creating a contest will prompt the user to register an account on the site.The user model requires a unique username and password (not necessarily unique) for sign up. Upon account creation, user passwords are digested using the B-Crypt gem before being stored. Authentication uses B-Crypt to match passwords to password digests.

Attributes
Contests and predictions are the most fundamental models of this application. All app utility is centered around either creating a contest with predictions or entering an already made contest with predictions being set. The contest table has columns for host_id, closing_date, and price. While the prediction table type and content. They have a many to many relationship with one another through a join table Contest_predicitons. Through this relationship, users are able to create customizeable contests by selecting which predictions they want to use. 

CRUD and flux architecture
Two Minute Drill lets users create, read, update, and destroy contests and sumbissions to contests. React components exist for each corresponding action in the app. Information needed for all components or user actions performed on a subcomponent are managed with flux cycles.


Creating a contest

When the user goes to create a contest, they will see a screen that looks like this:

![Screenshot (94)](https://github.com/user-attachments/assets/560a11dc-eef9-4f18-aa4a-c7aef46951d0)
