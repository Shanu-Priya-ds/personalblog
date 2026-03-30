let formElement = document.getElementById("newBlogForm");
let blogObj = { // model blog obj
    title: "cale",
    content: "contet"
};

let blogList = [];

formElement.addEventListener('submit', handleFormSubmit);

window.onload = () => {
    blogListString = localStorage.getItem("blogList");
    if (blogListString && blogListString !== "") {

        blogList = JSON.parse(blogListString);
    }
    console.log(blogList);
}

function handleFormSubmit(e) {
    e.preventDefault();
    let title = e.target[0].value;
    let content = e.target[1].value

    blogObj.title = title;
    blogObj.content = content;

    blogList.push(blogObj);

    //Add item to the local storage.
    localStorage.setItem("blogList", JSON.stringify(blogList));
    //console.log(e.target[0].value);
    alert("New post has been created.");

    //reset the form
    formElement.reset();
}