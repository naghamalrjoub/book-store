
async function fetchBooks() {
    const response = await fetch("https://api.itbook.store/1.0/search/mongodb");
    const data = await response.json();
    const books = data.books;
    console.log(data)

    const cardsRow = document.querySelector("#cardsRow");
    for(let i = 0; i < 10; i++) {
        const col = document.createElement("div");
        col.className = "col-sm-4 p-3 d-flex justify-content-center";
        cardsRow.append(col);
        const card = document.createElement("div");
        card.className = "card";
        card.id = "card";
        card.style = "width: 18rem"
        col.append(card);

        // get book image
        const bookImage = document.createElement("img");
        bookImage.className = "card-img-top";
        bookImage.src = books[i].image;
        card.append(bookImage);

        //create body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.append(cardBody);

        //get title
        const title = document.createElement("h5");
        title.className = "card-title"
        title.innerText = books[i].title;
        cardBody.append(title);

        //get price
        const subtitle = document.createElement("p");
        subtitle.className = "card-text";
        subtitle.innerText = books[i].subtitle;
        cardBody.append(subtitle);

        //get price
        const price = document.createElement("p");
        price.className = "card-text";
        price.innerText = books[i].price;
        cardBody.append(price);

        //button addition
        const button = document.createElement("a");
        button.innerText = "Add to Cart";
        button.className = "btn btn-primary addToCartBtn";
        cardBody.append(button);
        button.addEventListener("click", () => addToCart(books[i]));

    }
}

fetchBooks();

const cartButton = document.querySelector("#cartButton");
const homeButton = document.querySelector("#homeButton");
const Cart = document.querySelector("#Cart");
const main = document.querySelector("main");

//switch between cart and home page
const viewCart = () => {
    Cart.classList.remove("d-none");
    main.classList.add("d-none");
}

const viewHomePage = () => {
    Cart.classList.add("d-none");
    main.classList.remove("d-none");
}

cartButton.addEventListener("click", viewCart);
homeButton.addEventListener("click", viewHomePage);


const emptyCart = document.querySelector("#emptyCart");
let totalBooks = 0;
const addToCart = (book) => {
    if (!emptyCart.classList.contains("d-none"))
        emptyCart.classList.add("d-none");
    totalBooks++;
    console.log(totalBooks);

    
}

const removeFromCart = () => {
    totalBooks--;
    if (totalBooks == 0 && emptyCart.classList.contains("d-none")) {
       emptyCart.classList.remove("d-none")
    }
}

