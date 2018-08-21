# Museums

Build process

- Create Landing Page
- Museum Page that lists all museums
  - Make museums display in a grid
    - Name
    - Image

Navbar and Form

- Add a navbar to all templates
- Style new Museum form

Add Mongoose

- Install and configure mongoose
- Use mLab cloud database
- Setup Museum model
- Use Museum model inside of our routes

Show Page

- Add description to our Museum model
- Show db.collection.drop()
- Add a show route/template

Mongoose refactor

- Create a models directory
- Use module.exports

Comment model

- Display comments on museum show page

##### RESTFUL ROUTES

- INDEX /museums
- NEW /museums/new
- CREATE /museums
- SHOW /museums/:id

- NEW museums/:id/comments/new GET
- CREATE museums/:id/comments POST

Comment New/Create

- Add the comment new and create routes
- Add the new comment form

Style Show Page

- Add sidebar to show page
- Display comments nicely
- Add public directory
- Add custom stylesheet

##### Authentication

Add User Model

- Install all packages needed for auth
- Define User model

Register

- Configure Passport
- Add register routes
- Add register template

Login

- Add login routes
- Add login template

Logout/Navbar

- Add logout route
- Prevent user from adding a comment if not signed in
- Add links to navbar
- Show/hide auth links correctly

Show/Hide Links

- Show/hide auth links in navbar

- Use Express router to reorganize all routes

Users + Comments

- Associate users and comments
- Save author's name to a comment automatically

Users + Museums

- Prevent an unauthenticated user from creating a museum
- Save username + id to newly created museum

Editing Museums

- Add Method-Override
- Add Edit Route for Museums
- Add Link to Edit Page
- Add Update Route

Deleting Museums

- Add Destroy Route
- Add Delete Button

Authorization Museums

- User can only edit his/her Museums
- User can only delete his/her Museums
- Hide/Show edit and delete buttons

Editing Comments

- Add Edit route for commments
- Add Edit button
- Add Update route
- /museums/:id/edit
- /museums/:id/comments/:comment_id/edit

Deleting Comments

- Add Destroy route
- Add Delete button
- Museum Destroy Route: /museums/:id
- Comment Destroy Route: /museums/:id/comments/:comment_id

Authorization Comments

- User can only edit his/her comments
- User can only delete his/her comments
- Hide/Show edit and delete buttons

Flash messages

- Install and configure connect-flash
- Add bootstrap alerts to header

Google Maps

- Sign up Google Cloud Platform
- Add Google Maps Geocode API

Homepage

- Background image slider
- Mobile responsive
- Fuzzy search function
