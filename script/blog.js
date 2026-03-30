let formElement = document.getElementById("newBlogForm");
let titleElement = document.getElementById("title");
let contentElement = document.getElementById("content");
let titleErrorMessage = document.getElementById("titleErrorMessage");
let contentErrorMessage = document.getElementById("contentErrorMessage");
let listBlogContainer = document.getElementById("list-blog-container");

let blogObj = { // model blog obj
    "id":Number ,   
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
titleElement.addEventListener('blur', ()=>{
    checkValidity(titleElement, titleErrorMessage);
})

contentElement.addEventListener('blur', () =>
checkValidity(contentElement, contentErrorMessage));

formElement.addEventListener('submit', handleFormSubmit);
    
function handleFormSubmit(e) {
    e.preventDefault();
    let title = e.target[0].value;
    let content = e.target[1].value

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
}
/**Iterated the @blogList and create a container for each blogObj
 * and then append to the parent container.
 */
function populateBlogLists(blogList){
    
    blogList.forEach(blog=>{
        let div = document.createElement("div");
        div.id = blog.id;
        div.className = "blog-page";

        let h2 = document.createElement("h2");
        h2.innerText = blog.title;

        let p = document.createElement("p");
        p.innerText = blog.content;

        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        editBtn.type ="button";
        editBtn.innerText = "Edit";
        deleteBtn.type = "button";
        deleteBtn.innerText = "Delete";

        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        listBlogContainer.appendChild(div);

    })
    
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
function checkValidity(element, errorElement){
    if(element.checkValidity){
        errorElement.innerText = element.validationMessage;
    }else{
        errorElement.innerText = "";
    }
}