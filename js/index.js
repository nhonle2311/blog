import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

function capitalizeFirstLetter(sentence) {
    // Tách câu thành các từ riêng lẻ
    const words = sentence.split(' ');

    // Chuyển đổi chữ cái đầu của mỗi từ thành chữ hoa
    const capitalizedWords = words.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Kết hợp các từ để tạo câu mới
    return capitalizedWords.join(' ');
}

function generateFakeBlogContent() {
    let blogContent = '';

    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        const fakeParagraph = faker.lorem.paragraphs({ min: 5, max: 10 });
        blogContent += `<p>${fakeParagraph}</p>`;
        blogContent += `<p><img src="${faker.image.imageUrl()}" alt="Fake Image"></p>`;
    }

    return blogContent;
}

function generateBlogPost() {
    const id = faker.datatype.uuid();
    const image = faker.image.urlLoremFlickr();
    const content = generateFakeBlogContent(); // HTML content
    const title = capitalizeFirstLetter(faker.lorem.words({ min: 7, max: 10 }));
    const subTitle = `${content.substring(0, 100)}...`;
    const comments = () => {
        const fakeComments = [];

        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
            fakeComments.push(faker.lorem.sentences({ min: 1, max: 3 }));
        }

        return fakeComments;
    }
    // TODO generate created date

    return {
        id,
        image,
        content,
        title,
        subTitle,
        comments: comments(),
    };
}

// Tạo một danh sách giả mạo của bài viết blog
function generateBlogData(count) {
    const blogs = [];
    for (let i = 0; i < count; i++) {
        blogs.push(generateBlogPost());
    }
    return blogs;
}

const blogString = localStorage.getItem('blogs') ?? '[]';
let blogs = JSON.parse(blogString);

if (!blogs.length) {
    // Số lượng bài viết bạn muốn tạo
    const numberOfPosts = 5;
    blogs = generateBlogData(numberOfPosts);
    localStorage.setItem('blogs', JSON.stringify(blogs));
}


document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById('main');

    blogs.forEach((blog) => {
        const content =
            `
                <a class="article" href="article/blog.html?blogId=${blog.id}">
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