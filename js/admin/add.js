function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function onSave() {
    let isInvalid = false;
    const blogString = localStorage.getItem('blogs') ?? '[]';
    let blogs = JSON.parse(blogString);

    const addForm = document.getElementById('add-form');
    const formElements = Array.from(addForm.elements);
    const newBlog = {};

    formElements.forEach((element) => {
        const isSubmitElement = element.getAttribute('type') == 'submit';
        if (!isSubmitElement) {
            if (!element.value) {
                isInvalid = true;

                return
            }

            newBlog[element.getAttribute('id')] = element.value;

        }
    })

    if (isInvalid) {
        alert('Vui lòng nhập đầy đủ thông tin');

        return;
    }

    newBlog.id = uuidv4();
    newBlog.subTitle = `${newBlog.content.substring(0, 100)}...`;
    // TODO generate created date

    // push new blog to blogs
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    window.location.href = '/blog/admin/list.html';
}

