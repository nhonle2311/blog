const blogString = localStorage.getItem('blogs') ?? '[]';
let blogs = JSON.parse(blogString);

function generateTable (blogs) {
    const table = document.getElementById('table-list');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Actions</th>
        </tr>
    `;

    blogs.forEach((blog) => {
        const content =
            `
                <tr class="add-form">
                    <td>${blog.id}</td>
                    <td>${blog.title}</td>
                    <td>${blog.content}</td>
                    <td>
                        <img src="${blog.image}" />
                    </td>
                    <td class="actions">
                        <div class="btn-group">
                            <button type="button" class="btn-edit" data-id="${blog.id}">Edit</button>
                            <button type="button" class="btn-delete" data-id="${blog.id}">Delete</button>
                        </div>
                    </td>
                </tr>
            `;

        table.innerHTML += content;
    });
}

function addEventForDeleteBtn() {
    document.querySelectorAll('.btn-delete').forEach((deleteButton) => {
        deleteButton.addEventListener   ('click', function () {
            const blogId = this.getAttribute('data-id');
            deleteBlog(blogId);
        });
    });
}

function deleteBlog(blogId) {
    blogs = blogs.filter((blog) => blog.id !== blogId);
    generateTable(blogs);
    addEventForDeleteBtn();
    addEventEditBtn();
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function editBlog(blogId) {
    window.location.href = `/admin/edit.html?blogId=${blogId}`;
}

function addEventEditBtn() {
    document.querySelectorAll('.btn-edit').forEach((editButton) => {
        editButton.addEventListener('click', function () {
            const blogID = this.getAttribute('data-id');
            editBlog(blogID);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    generateTable(blogs);
    addEventForDeleteBtn();
    addEventEditBtn();
});

