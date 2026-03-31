let formElement = document.getElementById("newBlogForm");
let titleElement = document.getElementById("title");
let contentElement = document.getElementById("content");
let titleErrorMessage = document.getElementById("titleErrorMessage");
let contentErrorMessage = document.getElementById("contentErrorMessage");
let listBlogContainer = document.getElementById("list-blog-container");
let editDialogElement = document.getElementById("editDialog");
let editTitle = document.getElementById("edit-title");
let editContent = document.getElementById("edit-content");
let closeDialog = document.getElementById("closeDialog");
let blogIdHiddenElement = document.getElementById("blogId");
let editForm = document.getElementById("editBlogForm");



let blogObj = { // model blog obj
    "id": Number,
    "title": String,
    "content": String,
    "timestamp": Date
};

let blogList = [];

//on page load
window.onload = () => {
    blogListString = localStorage.getItem("blogList");
    if (blogListString && blogListString !== "") {

        blogList = JSON.parse(blogListString);
        //list the blogs on UI
        populateBlogLists(blogList);
    }
    console.log(blogList);
}

/** All element's event listener.. */
titleElement.addEventListener('blur', () => {
    checkValidity(titleElement, titleErrorMessage);
})

contentElement.addEventListener('blur', () =>
    checkValidity(contentElement, contentErrorMessage));

formElement.addEventListener('submit', handleFormSubmit);
editForm.addEventListener('submit', handleFormSubmit);

closeDialog.addEventListener('click', () => {
    //close the dialog
    editDialogElement.close();
})

listBlogContainer.addEventListener('click', handleBlogPageActions);

//form submit actions
function handleFormSubmit(e, action) {
    e.preventDefault();
   
    let blogRef= editDialogElement.blogRef;
    let title = e.target[0].value;
    let content = e.target[1].value;

   if(blogIdHiddenElement.value)  { //edit blog
       saveEditBlog(blogIdHiddenElement.value, title, content,blogRef);

    } else {//new blog post
        blogObj.title = title;
        blogObj.content = content;
        blogObj.id = generateId();
        blogObj.timestamp = Date.now();
        blogList.push(blogObj);

        //Add item to the local storage.
        localStorage.setItem("blogList", JSON.stringify(blogList));
        //console.log(e.target[0].value);
        alert("New post has been created.");

        //reset the form
        formElement.reset();

        createBlogContainer(blogObj);
    }
}
/**Iterate the @blogList and create a container for each blogObj
 * and then append to the parent container.
 */
function populateBlogLists(blogList) {

    blogList.forEach(blog => {
        createBlogContainer(blog);

    })

}

function createBlogContainer(blog) {
    let div = document.createElement("div");
    div.id = blog.id;
    div.className = "blog-page";
    div.setAttribute("data-id", blog.id)

    let h2 = document.createElement("h2");
    h2.innerText = blog.title;
    h2.className ="title";
    
    let p = document.createElement("p");
    p.innerText = blog.content;
    p.className = "content";
   
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    editBtn.type = "button";
    editBtn.innerText = "Edit";
    editBtn.name = "edit";
    deleteBtn.type = "button";
    deleteBtn.innerText = "Delete";
    deleteBtn.name = "delete";

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    
    listBlogContainer.appendChild(div);
}

/**
 * Executes on click of any element from blog container. 
 * Check if the targeted element is edit/delete,
 * trigger the delete ad edit function
 * do nothing for other elements.
 * 'Event Delegation' - This method is applicable for any list item
*/
function handleBlogPageActions(e) {
    console.log(e);
    let targetedElement = e.target;
    if (targetedElement.name == "delete") {
        deleteBlog(targetedElement);

    } else if (targetedElement.name == "edit") {
        //open dialog modal with data populated
        openDialog(targetedElement);

    }
}

function openDialog(targetedElement) {
    
    editDialogElement.blogRef = targetedElement.closest(".blog-page");
    console.log(targetedElement.closest(".blog-page"));
    editDialogElement.showModal();

    editContent.value = targetedElement.previousSibling.innerText;
    editTitle.value = targetedElement.previousSibling.previousSibling.innerText;
    blogIdHiddenElement.value = targetedElement.parentElement.dataset.id;
}

function saveEditBlog(id, title, content,blogRef){
        //1. set the 
        blogRef.querySelector(".title").innerText = title;
        blogRef.querySelector(".content").innerText = content;
        

        //update the localstorage and list.
        let editBlogObje = blogList.find(element => element.id == id);
        console.log(editBlogObje);

        editBlogObje.title = title;
        editBlogObje.content = content;

        localStorage.setItem("blogList", JSON.stringify(blogList));

        editDialogElement.close(); // close the dialog
}

function deleteBlog(targetedElement) {
    let blogId = targetedElement.parentElement.id;
    console.log(blogId);
    //get the bloglist other than the targeted id
    blogList = blogList.filter(item => blogId !== item.blogId);

    //remove the element from DOM
    let elemetToBeRemoved = document.getElementById(blogId);
    elemetToBeRemoved.remove();
    //update localstorage with the filtered list
    localStorage.setItem("blogList", JSON.stringify(blogList));

}

/** Utility methods */

function generateId() {
    return Date.now().toString() + Math.floor(Math.random() * 10000);
}

/**
 * generic message to set the validation message to the span
 * @element is an input type element
 * @errorElement is a span element
 */
function checkValidity(element, errorElement) {
    if (element.checkValidity) {
        errorElement.innerText = element.validationMessage;
    } else {
        errorElement.innerText = "";
    }
}