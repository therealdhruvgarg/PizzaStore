// Glue B/w View and Model
// Controller UI I/O

import readAllProducts from "../Services/product-operations.js";

async function showProducts() {
  const products = await readAllProducts();
  console.log("Controller rec ", products);
  products.map((product) => createCard(product));
}
let totalPrice = 0;

function createCard(product) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card m-1";
  cardContainer.style.width = "13rem";

  const cardImage = document.createElement("img");
  cardImage.className = "card-img-top";
  cardImage.src = product.url;
  cardImage.alt = product.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = product.name;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = product.desc;

  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.textContent = `Add ₹${product.price}`;
  link.addEventListener("click", () => addToBasket(product));

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  cardBody.appendChild(link);

  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardBody);

  const cardContainerElement = document.getElementById("card-container");
  cardContainerElement.appendChild(cardContainer);
}

function addToBasket(product) {
  const basketCardsContainer = document.getElementById("basket-cards");

  const basketItem = document.createElement("div");
  basketItem.className = "basket-item";
  basketItem.textContent = `${product.name} - ₹${product.price}`;

  const removeButton = document.createElement("button");
  removeButton.className = "btn btn-sm btn-outline-danger";
  removeButton.textContent = "x";
  removeButton.addEventListener("click", () => removeCardFromBasket(product));

  basketItem.appendChild(removeButton);
  basketCardsContainer.appendChild(basketItem);
  9;
  totalPrice += parseInt(product.price);
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = totalPrice;
  updatePayNowButtonState();
}

function removeCardFromBasket(product) {
  const basketCardsContainer = document.getElementById("basket-cards");

  const basketItems = document.getElementsByClassName("basket-item");
  for (const item of basketItems) {
    if (item.textContent.includes(product.name)) {
      basketCardsContainer.removeChild(item);

      totalPrice -= parseInt(product.price);
      const totalPriceElement = document.getElementById("total-price");
      totalPriceElement.textContent = totalPrice;
      updatePayNowButtonState();
      break;
    }
  }
}
function updatePayNowButtonState() {
  const basketItems = document.getElementsByClassName("basket-item");
  const payNowButton = document.getElementById("payNowButton");

  if (basketItems.length > 0) {
    payNowButton.disabled = false;
  } else {
    payNowButton.disabled = true;
  }
}

showProducts();