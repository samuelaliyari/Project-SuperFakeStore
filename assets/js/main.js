const searchBox = document.body.querySelector("input");
const sortbox = document.body.querySelector("select");
const categoryButtons = document.body.querySelectorAll("button");
const productGallery = document.body.querySelector("main");

let allProducts = 'https://fakestoreapi.com/products'

const fetchRequest = (relatedApi) => {
    fetch(relatedApi)
    .then(response => response.json())
    .then(products => {
        let productsArr = [...products];
        searchProducts(productsArr)
        sortFunction(productsArr)
        productsArr.forEach(product => {
            renderProducts(product);
        });
    })
}

fetchRequest(allProducts);


const renderProducts = (singleProduct) => {
    // create all necessary elements for each ProductCard
    const productCard = document.createElement('article');
    const productImage = document.createElement('img');
    const productTitle = document.createElement('h2');
    const productPrice = document.createElement('h3');
    const addToCartBtn = document.createElement('button');
    const cardTop = document.createElement('div')
    const cardBottom = document.createElement('div')

    // set values & textes for each element
    productImage.setAttribute('src', singleProduct.image);
    productImage.setAttribute('alt', singleProduct.title);
    productTitle.textContent = singleProduct.title;
    productPrice.textContent = "$ " + singleProduct.price
    addToCartBtn.textContent = "Add to cart"

    // append all elements to the Gallery
    productGallery.append(productCard);
    cardTop.append(productImage, productTitle)
    cardBottom.append(productPrice, addToCartBtn)
    productCard.append(cardTop, cardBottom);
}

// Sorting Functions

const sortFunction = (productsArray) => {
    sortbox.addEventListener("change", () => {
        const sortBy = sortbox.value;

        if (sortBy === "highToLow") {
            productGallery.innerHTML =""
            productsArray.sort((a, b) => b.price - a.price)
            productsArray.forEach(product => {
                renderProducts(product);
            })
        } else if(sortBy === "lowToHigh"){
            productGallery.innerHTML =""
            productsArray.sort((a, b) => a.price - b.price)
            productsArray.forEach(product => {
                renderProducts(product);
            })
        } else {
            productGallery.innerHTML =""
            productsArray.sort((a, b) => a.id - b.id)
            productsArray.forEach(product => {
                renderProducts(product);
            })
        }
    })
}



// Categories

categoryButtons.forEach((categoryButton) => {
    categoryButton.addEventListener("click", () => {
        console.log(categoryButton.textContent)
        const category = categoryButton.textContent.toLowerCase()
        if (category === "electronics") {
            productGallery.innerHTML ="";
            relatedApi = 'https://fakestoreapi.com/products/category/electronics';
            fetchRequest(relatedApi);
        }
        if (category === "jewelery") {
            productGallery.innerHTML ="";
            relatedApi = 'https://fakestoreapi.com/products/category/jewelery';
            fetchRequest(relatedApi);
        }
        if (category === "men's clothing") {
            productGallery.innerHTML ="";
            relatedApi = "https://fakestoreapi.com/products/category/men's%20clothing";
            fetchRequest(relatedApi);
        }
        if (category === "women's clothing") {
            productGallery.innerHTML ="";
            relatedApi = "https://fakestoreapi.com/products/category/women's%20clothing";
            fetchRequest(relatedApi);
        }
    })
})


//  Search Function

const searchProducts = (productsArray) => {
    searchBox.addEventListener("input", () => {
        const searchValue = searchBox.value.trim().toLowerCase()
        const searchResult = productsArray.filter((product) => product.title.toLowerCase().includes(searchValue));
        sortFunction(searchResult)
        console.log(searchResult)
        productGallery.innerHTML =""
        searchResult.forEach(product => {
            renderProducts(product);
        });
    })
}

