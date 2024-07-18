const cardContainer = document.getElementById("cardContainer");

let data = "";

const createProductCard = ({
	id,
	title,
	price,
	compare_at_price,
	vendor,
	badge_text,
	image,
	second_image,
	discount = 50,
}) => {
	const div = document.createElement("div");
	div.classList.add("card-item");
	div.innerHTML = `
        <div class="image-container" id="${id}">
            <img src="${image}" alt="image" class="product-img-1"/>
			<img src="${second_image}" alt="image" class="product-img-2"/>
            <div class="new-season">
                <p>${badge_text}</p>
            </div>
        </div>
        <div class="image-content">
            <h1 class="card-title">${title}</h1>
            <p class="website">${vendor}</p>
        </div>
        <div class="price-container">
            <h3 class="price">Rs. ${price}</h3>
            <p class="price-cross">Rs ${compare_at_price}</p>
            <p class="discount">(${discount}% Off)</p>
        </div>
        <div class="bottom-btn-container">
            <button class="cart btn">Add To Cart</button>
            <button class="buy btn">Buy Now</button>
        </div>
    `;
	return div;
};

const renderProducts = (categories) => {
	const fragment = document.createDocumentFragment();
	categories.forEach(({ category_products }) => {
		category_products.forEach((product) => {
			fragment.appendChild(createProductCard(product));
		});
	});
	cardContainer.appendChild(fragment);
};

const displayProducts = async () => {
	try {
		const result = await fetch("../data.json");
		if (!result.ok) {
			throw new Error(
				result.status === 404
					? "Page Not Found"
					: "Something went wrong"
			);
		}
		data = await result.json();
		renderProducts(data.categories);
	} catch (error) {
		console.log("Error While Fetching Data", error);
	}
};

// Filter Products Based on Category
const filterProductsByCategory = (value) => {
	const filteredProducts = data.categories.filter(
		({ category_name }) => category_name === value
	);
	cardContainer.innerHTML = "";
	
	if (filteredProducts.length > 0 && value !== "All") {
		renderProducts(filteredProducts);
	} else {
		displayProducts();
	}
};

document
	.querySelector(".buttons-container")
	.addEventListener("click", (event) => {
		if (event.target.classList.contains("button")) {
			filterProductsByCategory(event.target.value);
		}
	});

displayProducts();

// Mouse Hover Effect
const imageContainer = document.querySelectorAll(".image-container");

console.log(imageContainer);
imageContainer.forEach((container) => {
	container.addEventListener("mouseover", () => {
		container.classList.add("active");
	});
	container.addEventListener("mouseout", () => {
		container.classList.remove("active");
	});
});
