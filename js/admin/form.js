// class NewBlog{
//     constructor(id, title, subtitle, content) {
//         this.id = id || this.generateRandomID() ;
//         this.title =  title;
//         this.subtitle = subtitle;
//         this.content = content;
//     }
//     generateRandomID(){
//         // return Math.floor(Math.random() * 100000000);
//
//         return faker.datatype.uuid();
//     }
//     getID(){
//         return this.id
//     }
//     // setID(){
//     //     this.id = newID;
//     // }
//     getTitle(){
//         return this.title;
//     }
//     // setTitle(){
//     //     this.title = newTitle;
//     // }
//     getSubtitle(){
//         return this.subtitle;
//     }
//     // setSubtitle(){
//     //     this.subtitle = newSubtitle;
//     // }
//     getContent(){
//         return this.content;
//     }
//     // setContent(){
//     //     this.content = newContent;
//     // }
//
// }

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function onSave() {
    const blogString = localStorage.getItem('blogs') ?? '[]';
    let blogs = JSON.parse(blogString);

    const addForm = document.getElementById('add-form');


    const formElements = Array.from(addForm.elements);
    let titleValue = addForm.elements.title.value.trim();
    let contentValue = addForm.elements.content.value.trim();
    let imgValue = addForm.elements.image.value.trim();
    if(!titleValue || !imgValue || !contentValue){
        alert('nhập lại');
        return;
    }
    const newBlog = {
        id: uuidv4(),
        title: titleValue,
        content: contentValue,
        img: imgValue
    };
    formElements.forEach((element) => {
        console.log(element.value)
        newBlog[element.getAttribute('id')] = element.value
    })

    newBlog.subtitle = `${newBlog.content}...`;

    newBlog.id = uuidv4();

    // push new blog to blogs
    blogs.push(newBlog)
    localStorage.setItem('blogs', JSON.stringify(blogs));


}

