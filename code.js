let books = [
    {
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        edition: 1,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_7_Habits_of_Highly_Effective_People.jpg/220px-The_7_Habits_of_Highly_Effective_People.jpg"
    },
    {
        title: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        edition: 1,
        image: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg"
    },
    {
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        edition: 1,
        image: "https://images-na.ssl-images-amazon.com/images/I/41JKGW9P6AL._SX372_BO1,204,203,200_.jpg"
    },
    {
        title: "The Untethered Soul",
        author: "Michael A. Singer",
        edition: 1,
        image: "https://images-na.ssl-images-amazon.com/images/I/31YCXnJrACL._SX331_BO1,204,203,200_.jpg"
    }
];

let current = 0;
let favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
const containerDiv = document.getElementById("container");


function createBookCard(book) {
    let isNextHidden = (current < books.length - 1) ? "inline-flex" : "none";
    let isBackHidden = current < 1 ? "none" : "inline-flex";

    // BOOK IMAGE STRUCTURE SECTION //
    const imageDiv = createFullElement("div",null,"book-cover");
    const bookImg = createFullElement("img","book-img", null);
    bookImg.setAttribute("src", book?.image);
    

    const starImg = document.createElement("img");
    starImg.setAttribute("id", "img-star");
    const filteredImage = favorites.filter((element) => {return element.title == book.title});
    imageSource = filteredImage.length ? "./star-outline-filled/64x64.png" : "./star-outline-filled/star-outline.png";

    starImg.setAttribute("src", imageSource);


    imageDiv.append(bookImg, starImg);

    // book image structure end //

    // BOOK DETAILS SECTION //

    const bookDetails = createFullElement("div", null, "book-info");

    const bookAuthor = createFullElement("label", "book-author", null);
    bookAuthor.innerText = `Written by: ${book?.author}`;

    const bookTitle = createFullElement("label", "book-title", null);
    bookTitle.innerText = book?.title;

    bookDetails.append(bookTitle, bookAuthor);

    // book details end //

    // BUTTON STRUCTURE SECTION //

    const buttonNext = createFullElement("button","btn-next", "button-84");
    buttonNext.setAttribute('style', `display:${isNextHidden}`);
    buttonNext.innerText = "Next Book";

    buttonNext.addEventListener('click', () => {
        if (isNextHidden == 'inline-flex') {
            current++
            containerDiv.innerText = '';
            createBookCard(books[current]);
        }
    });

    const buttonBack = createFullElement("button","btn-back", "button-84");
    buttonBack.setAttribute('style', `display:${isBackHidden}`);
    buttonBack.innerText = "Previous Book";

    buttonBack.addEventListener('click', () => {
        if (isBackHidden == "inline-flex") {
            current--;
            containerDiv.innerText = '';
            createBookCard(books[current]);
        }
    });
    const btnsDiv = createFullElement("div",null,"btns-div");

    btnsDiv.append(buttonBack, buttonNext);

    // button structure end //   

    // FAVORITE BUTTON SECTION //
    starImg.addEventListener("click", () => {
        if (starImg.getAttribute("src") == "./star-outline-filled/star-outline.png") {
            favorites.push(books[current]);
            localStorage.setItem("myFavorites", JSON.stringify(favorites));
            starImg.setAttribute("src", "./star-outline-filled/64x64.png");
        } else if (starImg.getAttribute("src") == "./star-outline-filled/64x64.png") {
            favorites = favorites.filter((element) => {
                return element.title != book.title;
            });
            console.log(favorites);
            localStorage.setItem("myFavorites", JSON.stringify(favorites));
            starImg.setAttribute("src", "./star-outline-filled/star-outline.png");
        }
    })

    // favorite button section end //
    
    containerDiv.append(imageDiv, bookDetails, btnsDiv);
}


createBookCard(books[current]);

//Create an HTML element with an ID and class.
function createFullElement(type, id, eleClass){
    element = document.createElement(type);
    element.setAttribute("id", id);
    element.setAttribute("class", eleClass);
    return element;
}
