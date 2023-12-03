
function getBlogs() {
    const blogString = localStorage.getItem('blogs') ?? '[]';
    return JSON.parse(blogString);
}
console.log(getBlogs())
function getBlog() {
    const blogs = getBlogs();
    const urlParams = new URLSearchParams(window.location.search);
    const blogID = urlParams.get('blogId');
    return blogs.find((blog) => blog.id === blogID) || {};
}
console.log(getBlog())

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById('main');
    const blog = getBlog();

    if (blog.id){
        const content =
            `       
                    <div class="group">
                        <div class="title">
                            <h2>
                                ${blog.title};
                            </h2>
                        </div>
                        <div class="image">
                        <img src="${blog.image};" alt="img">
                        </div>
                        <div class="content">
                            ${blog.content};
                        </div>
                        
                       
                         <div id="comment">
                            <h1>comment</h1>
                            <div id="list-comment"></div>
                            <div id="comment-count"></div>
                            <form id="form-comment">                                                                                 
                                <label for="text-comment">Your Comment</label>
                                <textarea id="text-comment" rows="4" cols="50"  placeholder="Your Comment"></textarea>
                                <label for="anonymous">Anonymous</label>
                                <input type="checkbox" id="anonymous" />
                                <button type="submit">Send</button>
                             </form>
                         </div>    
                    </div>   
            `;
        main.innerHTML = `${content}`

    }else {
        main.innerText="blog not found"
    }
    })

document.addEventListener("DOMContentLoaded", () => {

    const formComment = document.getElementById('form-comment');
    const comment = document.getElementById('comment');
    formComment.addEventListener("submit", (event) =>{
        event.preventDefault();
        const textComment = document.getElementById('text-comment').value;
        const isAnonymous = document.getElementById('anonymous').checked;
        addComment(textComment, isAnonymous);
        formComment.reset();
    })

    let commentCount = 0;
    const commentCountElement = document.getElementById('comment-count');

    function addComment(text, anonymous) {
        commentCount++;
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<p>${text}</p>`;

        if (anonymous) {
            commentElement.innerHTML += `<p class="anonymous">Anonymous</p>`;
        }

        comment.appendChild(commentElement);
        if (commentCountElement) {
            commentCountElement.textContent = `number of comments: ${commentCount}`;
        }

    }

})





