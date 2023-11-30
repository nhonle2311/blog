// class Article {
//     constructor(id, title, subtitle, content) {
//         this.id = id;
//         this.title = title;
//         this.subtitle = subtitle;
//         this.content = content;
//     }
// }
// let arr = [];
// let article = new Article(1, 'title1', 'subtile1', 'sdfsdfdf');
// arr.push(article);
// function showAllProduct() {
//     let content=""
//     for (let i = 0; i < arr.length; i++) {
//         // them 1 bo the tr td
//         content+=`    <tr>
//         <td>${arr[i].id}</td>
//         <td>${arr[i].title}</td>
//         <td>${arr[i].subtitle}</td>
//         <td>${arr[i].content}</td>
//         <td>
//             <button >Sua</button>
//             <button onclick="deleteByIndex(${i})">Xoa</button>
//         </td>
//
//     </tr>`;
//     }
//     document.getElementById("id").innerHTML= content;
//
// }
// showAllProduct()
// function deleteByIndex(index) {
//     arr.splice(index, 1)
//     showAllProduct();
// }
// function them() {
//     let newArtical = document.getElementById('newArticle').value;
//     arr.push(newArtical);
//     showAllProduct();
// }
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
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

document.addEventListener("DOMContentLoaded", () => {
    generateTable(blogs);
    addEventForDeleteBtn();
});


function addEventEditBtn() {
    document.querySelectorAll('.btn-edit').forEach((editButton) => {
        editButton.addEventListener('click', function () {
            const blogID = this.getAttribute('data-id');
            editBlog(blogID);
        });
    });
}

function editBlog(blogId) {
    const blogString = localStorage.getItem('blogs') || '[]';
    let blogs = JSON.parse(blogString);
    const blogToEdit = blogs.find(blog => blog.id === blogId);

}

