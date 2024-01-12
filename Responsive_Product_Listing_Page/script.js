let cardContainer = document.getElementById('cardContainer');


let data = '';



const renderFinalProducts = (data) => {
    const {id, title, price, compare_at_price, vendor, badge_text, image, second_image, discount = 50} = data;

    let div = document.createElement('div');
    div.classList.add('card-item');
    div.innerHTML = `
        <div class="image-container" id="${id}">
            <img src="${image}" alt="image" class="product-img"/>
            <div class="new-season">
                <p>${badge_text}</p>
            </div>
        </div>
        <div class="image-content">
            <h1 class="card-title">${title}</h1>
            <p class="website">${vendor}</p>
        </div>
        <div class="price-container">
            <h3 class="price">Rs ${price}</h3>
            <p class="price-cross">Rs ${compare_at_price}</p>
            <p class="discount">${discount}% Off</p>
        </div>
        <div class="bottom-btn-container">
            <button class="cart-button">Add To Cart</button>
            <button class="buy-button">Buy Now</button>
        </div>
        `;
    cardContainer.appendChild(div);
}


const filterProduct = (value) => {
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        if(value.toUpperCase() == button.innerHTML.toUpperCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    })
}


const renderProducts = (data) => {
    const { categories } = data;    
    categories.forEach(category => {
        let { category_name, category_products } = category;
        category_products.forEach((product) => {
            renderFinalProducts(product);
        })
    })
} 



let displayProducts = async () => {
    try {
        const product = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const result = await product.json();
        renderProducts(result); 
    } catch (error) {
        console.log('Error While Fetching Data', error);
    }
}

displayProducts()