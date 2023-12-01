// TODO:
// 1: get blogId from URL
// 2: blogId => blog (localStorage blogs)
// 3: blog => DOM loader => generate data html
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
                            ${blog.image};
                        </div>
                        <div class="content">
                            ${blog.content};
                        </div>
    
                    </div>   
            `;
        main.innerHTML = `${content}`

    }else {
        main.innerText='không có'
    }
    })
