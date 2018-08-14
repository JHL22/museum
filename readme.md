# Museums

- Add Landing Page
- Add Museum Page that lists all museums

Each museum has:

- Name
- Image

## Style the Museums page

- Add a better header/title
- Make museums display in a grid

## Style the Navbar and Form

- Add a navbar to all templates
- Style the new Museum form

## Add Mongoose

- Install and configure mongoose
- Setup Museum model
- Use Museum model inside of our routes

## Show Page

- Add description to our Museum model
- Show db.collection.drop()
- Add a show route/template

## Refactor Mongoose Code

- Create a models directory
- Use module.exports

## Add the Comment model

- Display comments on museum show page

## RESTFUL ROUTES

- INDEX /museums
- NEW /museums/new
- CREATE /museums
- SHOW /museums/:id

- NEW museums/:id/comments/new GET
- CREATE museums/:id/comments POST

## Comment New/Create

- Add the comment new and create routes
- Add the new comment form

## Style Show Page

- Add sidebar to show page
- Display comments nicely
- Add public directory
- Add custom stylesheet

## Auth Pt. 1 - Add User Model

- Install all packages needed for auth
- Define User model

## Auth Pt. 2 - Register

- Configure Passport
- Add register routes
- Add register template

## Auth Pt. 3 - Login

- Add login routes
- Add login template

## Auth Pt. 4 - Logout/Navbar

- Add logout route
- Prevent user from adding a comment if not signed in
- Add links to navbar
- Show/hide auth links correctly

## Auth Pt. 5 - Show/Hide Links

- Show/hide auth links in navbar

## Refactor The Routes

- Use Express router to reorganize all routes

## Users + Comments

- Associate users and comments
- Save author's name to a comment automatically

## Users + Museums

- Prevent an unauthenticated user from creating a museum
- Save username+id to newly created museum

## Editing Museums

- Add Method-Override
- Add Edit Route for Museums
- Add Link to Edit Page
- Add Update Route

## Deleting Museums

- Add Destroy Route
- Add Delete Button

## Authorization Part 1: Museums

- User can only edit his/her Museums
- User can only delete his/her Museums
- Hide/Show edit and delete buttons

## Editing Comments

- Add Edit route for commments
- Add Edit button
- Add Update route
- /museums/:id/edit
- /museums/:id/comments/:comment_id/edit

## Deleting Comments

- Add Destroy route
- Add Delete button

- Museum Destroy Route: /museums/:id
- Comment Destroy Route: /museums/:id/comments/:comment_id

## Authorization Part 2: Comments

- User can only edit his/her comments
- User can only delete his/her comments
- Hide/Show edit and delete buttons
- Refactor Middleware

## Adding in Flash

- Install and configure connect-flash
- Add bootstrap alerts to header
