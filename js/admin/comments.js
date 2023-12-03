const blogString = localStorage.getItem('blogs') ?? '[]';
let blogs = JSON.parse(blogString);
function getComments() {
    let comments = [];
    blogs.forEach((blog) => {
        let blogComments = blog.comments || [];
        blogComments.forEach((comment) => {
            comments.push({
                blogId: blog.id,
                comment,
            })
        })
    })

    return comments;
}

function generateTable (comments) {
    const table = document.getElementById('table-list');
    table.innerHTML = `
        <tr>
            <th>Blog ID</th>
            <th>Comment</th>
            <th>Actions</th>
        </tr>
    `;

    comments.forEach((comment) => {
        const content =
            `
                <tr class="add-form">
                    <td>${comment.blogId}</td>
                    <td>${comment.comment}</td>
                    <td class="actions">
                        <div class="btn-group">
                            <button type="button" class="btn-edit" data-id="${comment.blogId}">Edit</button>
                            <button type="button" class="btn-delete" data-id="${comment.blogId}" data-comment="${comment.comment}">Delete</button>
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
            const comment = this.getAttribute('data-comment');
            deleteComment(blogId, comment);
        });
    });
}

function deleteComment(blogId, comment) {
    const blogIndex = blogs.findIndex((blog) => blog.id = blogId);
    blogs[blogIndex].comments = blogs[blogIndex].comments.filter((c) => c !== comment)
    generateTable(getComments());
    addEventForDeleteBtn();
    // addEventEditBtn();
    localStorage.setItem('blogs', JSON.stringify(blogs));
}
//
// function editBlog(blogId) {
//     window.location.href = `/admin/edit.html?blogId=${blogId}`;
// }
//
// function addEventEditBtn() {
//     document.querySelectorAll('.btn-edit').forEach((editButton) => {
//         editButton.addEventListener('click', function () {
//             const blogID = this.getAttribute('data-id');
//             editBlog(blogID);
//         });
//     });
// }

document.addEventListener("DOMContentLoaded", () => {
    generateTable(getComments());
    addEventForDeleteBtn();
    // addEventEditBtn();
});

