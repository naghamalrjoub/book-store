
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
const notEmptyCart = document.querySelector("#notEmptyCart")
let totalBooks = 0, priceForPayment = 0;
let cartArray = [];
const addToCart = (book) => {
    if (!emptyCart.classList.contains("d-none")) {
        hideEmptyCart();
    }
        
    totalBooks++;
    console.log(totalBooks);
    let findBook = cartArray.find(item => item === book.isbn13);
    if (findBook) {
        
    }

    else {
        cartArray.push(book.isbn13);
        appendBook(book);
    }
}

const appendBook = (book) => {

    const booksInCart = document.querySelector("#booksInCart");
    //create card and append it
    const card = document.createElement("div");
    card.className = "card mt-3 container-fluid";
    booksInCart.append(card)

    const row = document.createElement("row");
    row.className = "row g-0";
    card.append(row);

    //create image div
    const imageDiv = document.createElement("div");
    imageDiv.className = "col-md-4";
    row.append(imageDiv);
    const img = document.createElement("img")
    img.src = book.image;
    img.className = "img-fluid rounded-start";
    imageDiv.append(img);

    //card body div
    const bodyDiv = document.createElement("div");
    bodyDiv.className = "col-md-8 d-flex";
    row.append(bodyDiv);

    //card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.id = "cartCardBody";
    bodyDiv.append(cardBody);

    //body content;
    //get title
    const title = document.createElement("h5");
    title.className = "card-title"
    title.innerText = book.title;
    cardBody.append(title);
    //get subtitle
    const subtitle = document.createElement("p");
    subtitle.className = "card-text";
    subtitle.innerText = book.subtitle;
    cardBody.append(subtitle);
    //get price
    const price = document.createElement("p");
    price.className = "card-text";
    price.innerText = book.price;
    cardBody.append(price);
    //footing div for each card
    const cardFooter = document.createElement("div");
    cardFooter.id = "cardFooter";
    cardBody.append(cardFooter);
    //append button
    const removeButton = document.createElement("a");
    removeButton.href = "#";
    removeButton.className = "btn btn-outline-danger";
    removeButton.id = "removeFromCartBtn"
    removeButton.addEventListener("click", () => removeFromCart(card, book))
    removeButton.innerText = "remove from cart";
    cardFooter.append(removeButton);
    let actualPrice = book.price.slice(1);
    priceForPayment += parseFloat(actualPrice);
    console.log(priceForPayment);
    editCheckout(priceForPayment.toFixed(2));
}


const editCheckout = (priceForPayment) => {

    //edit the total price & total items section
    const totalPriceSpan = document.querySelector("#totalPriceSpan");
    const totalItemsSpan = document.querySelector("#totalItemsSpan")
    totalPriceSpan.innerText = '$' + priceForPayment;
    totalItemsSpan.innerText = totalBooks; 
}


const removeFromCart = (card, book) => {
    totalBooks--;
    card.remove();
    let actualPrice = book.price.slice(1);
    priceForPayment -= parseFloat(actualPrice);
    editCheckout(priceForPayment.toFixed(2));
    if (totalBooks == 0 && emptyCart.classList.contains("d-none")) {
       viewEmptyCart();
    }
}

const viewEmptyCart = () => {
    emptyCart.classList.remove("d-none")
    notEmptyCart.classList.add("d-none");
}

const hideEmptyCart = () => {
    emptyCart.classList.add("d-none")
    notEmptyCart.classList.remove("d-none");
}

