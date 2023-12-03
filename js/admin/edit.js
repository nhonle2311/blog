function getFormElements() {
    const editForm = document.getElementById('edit-form');
    return Array.from(editForm.elements);
}

function getBlogs() {
    const blogString = localStorage.getItem('blogs') ?? '[]';
    return JSON.parse(blogString);
}
function getBlog() {
    const blogs = getBlogs();

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blogId');

    return blogs.find((blog) =>  blog.id === blogId) || {};
}
function editBlog() {
    let isInvalid = false;
    const formElements = getFormElements();
    const blog = getBlog();

    formElements.forEach((element) => {
        const isSubmitElement = element.getAttribute('type') === 'submit';
        if (!isSubmitElement) {
            if (!element.value) {
                isInvalid = true;

                return
            }

            const elementId = element.getAttribute('id')
            blog[elementId] = element.value;
        }
    })

    if (isInvalid) {
        alert('Vui lòng nhập đầy đủ thông tin');

        return;
    }

    const blogs = getBlogs();
    const blogIndex = blogs.findIndex((b) => b.id = blog.id);
    blogs[blogIndex] = blog;

    localStorage.setItem('blogs', JSON.stringify(blogs));
    window.location.href = '/blog/admin/list.html';
}


document.addEventListener("DOMContentLoaded", () => {
    const blog = getBlog();
    const formElements = getFormElements();

    formElements.forEach((element) => {
        const elementId =  element.getAttribute('id');
        if (blog[elementId]) {
            element.value = blog[elementId]
        }
    });
});
