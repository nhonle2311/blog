import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
function generateBlogPost() {
    const id = faker.datatype.uuid();
    const image = faker.image.urlLoremFlickr();
    const content = faker.lorem.paragraphs(); // HTML content
    const title = faker.lorem.words();
    const subTitle = faker.lorem.sentence();

    return {
        id,
        image,
        content,
        title,
        subTitle,
    };
}

// Tạo một danh sách giả mạo của bài viết blog
function generateBlogData(count) {
    const blogData = [];
    for (let i = 0; i < count; i++) {
        blogData.push(generateBlogPost());
    }
    return blogData;
}

// Số lượng bài viết bạn muốn tạo
const numberOfPosts = 5;
const blogData = generateBlogData(numberOfPosts);


document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById('main');

    blogData.forEach((blog) => {
        const content =
            `
                <a class="article" href="article/1.html">
                    <div class="image-container">
                        <img src="${blog.image}" alt="img">
                    </div>
                    <div class="group">
                        <div class="title">
                            ${blog.title}
                        </div>
                        <p class="sub-title">
                            ${blog.subTitle}
                        </p>
                        <div class="group-info">
                            <div class="info">
                                <img src="https://cdn-icons-png.flaticon.com/128/4058/4058692.png" alt="Time and date">
                                <span>Sep 04, 2023</span>
                            </div>
                            <div class="info">
                                <img src="https://cdn-icons-png.flaticon.com/128/2088/2088617.png" alt="Clock">
                                <span>4 minute read</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;

        main.innerHTML += content;
    })
})