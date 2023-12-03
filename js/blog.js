
function getBlogs() {
    const blogString = localStorage.getItem('blogs') ?? '[]';
    return JSON.parse(blogString);
}
function getBlog() {
    const blogs = getBlogs();
    const urlParams = new URLSearchParams(window.location.search);
    const blogID = urlParams.get('blogId');
    return blogs.find((blog) => blog.id === blogID) || {};
}

function generateBlog(blog, callback) {
    const main = document.getElementById('main');
    if (blog.id) {
        const content =
            `       
                <div class="blog">
                    <div class="blog-detail">
                        <div class="title">
                            <h2>
                                ${blog.title}
                            </h2>
                        </div>
                        <div class="image">
                            <img src="${blog.image};" alt="img">
                        </div>
                        <div class="content">
                            ${blog.content}
                        </div>
                    </div>
                    <div id="comments" class="comments"></div>
                    <div class="add-comment">
                        <form id="comment-editor" action="javascript:void(0);">
                            <label for="content">Add your comment:</label>
                            <textarea id="comment" name="comment" rows="6" cols="50" ></textarea>
                            <input type="submit" id="submit-btn" value="Add" />
                        </form>
                    </div>
                </div>
            `;
        main.innerHTML = `${content}`;

        if (typeof callback == 'function') {
            callback(blog.comments || []);
        }
        addEventForSubmitBtn();
    } else {
        main.innerText="blog not found";
    }
}

function generateComments(comments = []) {
    const commentsElement = document.getElementById('comments');
    commentsElement.innerHTML =
        `<div class="comment-title">Comments:</div>`;

    comments.forEach((comment) => {
        commentsElement.innerHTML +=
            `
                <div class="comment-item">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png">
                    <span>${comment}</span>
                </div>
            `;
    })
}

function addEventForSubmitBtn() {
    document.getElementById('submit-btn').addEventListener('click', () => {
        const blogs = getBlogs();
        const urlParams = new URLSearchParams(window.location.search);
        const blogID = urlParams.get('blogId');
        const commentValue = document.getElementById('comment').value;

        if (commentValue) {
            const blogIndex = blogs.findIndex((blog) => blog.id === blogID);
            blogs[blogIndex].comments.unshift(commentValue);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            generateComments(blogs[blogIndex].comments);
            document.getElementById('comment').value = '';
        } else {
            alert('Please input your comment before')
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const blog = getBlog();
    generateBlog(blog, generateComments);
});







