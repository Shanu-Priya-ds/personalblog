# Personal Blog

This is a single page application for doing CRUD operation for blog posts via UI.
    - UI shows a form for creating a new blog post
    - lists all the blog posts
    - Ability to edit the post, which will be shown up in the modal dialog.
    - Option to delete the posts.

### Built with
- HTML5 markup
- CSS custom properties
- JavaScript

### How to run the application
Open index.html file with browser will show the application in browser.

### Development Process,
 - First created the basic HTML structure with form for creating a post and added required validation attribute.
 - Added event handler for form submission and input fields (for showing theerror message as text nect to the element). 
 - Create elements inside the Lsit Event handler, to show the the blogs list from localstorage.
 - Updated basic styling for the form and list bogs.
 - Implemented delete functionality.
 - Implemented Edit functionality to show the edit form inside the HTML dialog.


### challenges
- Faced a challenge in populating the Edit form with data and persisting the updated value back to the localstorage and reflect the update instantly in List page.
- Used the dev tools to track on the elements in DOM to achieve the above goal.  

### Known issues or features not implemented.
- Dialog styling needs to be done. Close button needs to be aligned on top right corner of the dialog.