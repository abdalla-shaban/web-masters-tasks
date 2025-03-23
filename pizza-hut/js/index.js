// import data from "../data.json" with {type: "json"};
const searchInput = document.querySelector("#search");
let productsList = [
  {
    image: "./images/BBQ-Chicken-Pizza.webp",
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    price: 8.5,
  },
  {
    image: "./images/Buffalo-Chicken-Pizza.webp",
    name: "Buffalo Chicken Pizza",
    category: "Pizza",
    price: 9.5,
  },
  {
    image: "./images/Hawaiian-Pizza.webp",
    name: "Hawaiian Pizza",
    category: "Pizza",
    price: 10.5,
  },
  {
    image: "./images/Margherita-Pizza-1.webp",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 8.5,
  },
  {
    image: "./images/Meat-Lovers-Pizza.webp",
    name: "Meat Pizza",
    category: "Pizza",
    price: 8.5,
  },
  {
    image: "./images/Veggie-Supreme-Pizza.webp",
    name: "Veggie Supreme Pizza",
    category: "Pizza",
    price: 8.5,
  },
  {
    image: "./images/Truffle-Mushroom-Pizza.webp",
    name: "Truffle Mushroom Pizza",
    category: "Pizza",
    price: 11.5,
  },
  {
    image: "./images/Pepperoni-Pizza.webp",
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 9,
  },
  {
    image: "./images/Margherita-Pizza.webp",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 9,
  },
];

const addIdandIsAddedToProudcts = () => {
  for (let i = 0; i < productsList.length; i++) {
    productsList[i].quantity = 1;
    productsList[i].isAdded = false;
  }
};

addIdandIsAddedToProudcts();
const productsContainer = document.querySelector("#productsContainer");
const cartContainer = document.querySelector("#cartContainer");

let cartItems = [];
if (localStorage.getItem("cartItems") !== null) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
}

if (
  localStorage.getItem("productsList") !== null &&
  localStorage.getItem("productsList") !== "[]"
) {
  productsList = JSON.parse(localStorage.getItem("productsList"));
}

const displayProductsList = (list = productsList) => {
  let container = "";
  for (let i = 0; i < list.length; i++) {
    list[i].id = i;
    list[i].totalPrice = list[i].price * list[i].quantity;
    container += `
      <div class="col-md-6 col-lg-4">
        <div class="card-inner">
          <figure class="position-relative mb-4">
            <img src="${list[i].image}" alt="${
      list[i].name
    }" class="w-100 rounded-3" loading="lazy">
            <figcaption
              class="position-absolute w-100 bottom-0 text-center start-50 translate-middle-x"
            >
            ${
              list[i].isAdded
                ? `
              <div
                class="addedItemControl w-75 d-flex justify-content-between align-items-center mx-auto rounded-pill py-2 px-4 fw-semibold bg-red text-white border-0 d-block"
              >
                <div class="icon-box flex-center rounded-circle">
                  <i class="fa-solid fa-minus cursor-pointer"  onclick="decrementQuantity(${i})"></i>
                </div>
                <span class="fw-bold">${list[i].quantity}</span>
                <div class="icon-box flex-center rounded-circle">
                  <i class="fa-solid fa-plus cursor-pointer" onclick="incrementQuantity(${i})"></i>
                </div>
              </div>
              `
                : `
                <button
                class="addToCartBtn rounded-pill py-2 px-3 fw-semibold d-block mx-auto"
                onclick="addToCart(${i})"
              >
                <i class="fa-solid fa-cart-plus text-red me-2"></i>
                Add to Cart
              </button>
                `
            }
            </figcaption>
          </figure>
          <div class="card-body">
            <span class="text-rose-500 text-14">${list[i].category}</span>
            <h4 class="fs-6 fw-semibold my-1">${list[i].name}</h4>
            <span class="text-red fw-semibold">$${list[i].price}</span>
          </div>
        </div>
      </div>
    `;
  }
  localStorage.setItem("productsList", JSON.stringify(list));
  productsContainer.innerHTML = container;
  if (list.length === 0) {
    productsContainer.style.cssText =
      "display: flex; height: 300px; justify-content: center; align-items: center; font-weight: bold;";
    productsContainer.innerHTML = "No Products Found";
  } else {
    productsContainer.style.cssText =
      "height: auto; justify-content: start; align-items: center; font-weight: normal;";
  }
};
const displayCartProducts = () => {
  let container = "";
  let orderTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    orderTotal += cartItems[i].totalPrice;
    container += `
      <div
        class="cart-item py-3 d-flex justify-content-between align-items-center text-14"
      >
        <div>
          <h6 class="mb-2 fw-semibold">${cartItems[i].name}</h6>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold text-red">${cartItems[i].quantity}x</span>
            <span class="text-rose-500">@ $${cartItems[i].price}</span>
            <span class="fw-bold text-rose-500">$${cartItems[i].totalPrice}</span>
          </div>
        </div>
        <i
          class="fa-solid fa-xmark-circle text-rose-500 fs-4 cursor-pointer"
          onclick="deleteItem(${i})"
        ></i>
      </div>`;
  }
  cartContainer.innerHTML = container;
  document.querySelector("#totalOrderPrice").textContent = `$${orderTotal}`;
  document.querySelector("#confirmedTotalOrder").textContent = `$${orderTotal}`;
  document.querySelector("#cartLength").textContent = `(${cartItems.length})`;

  if (cartItems.length === 0) {
    document.querySelector("#emptyCart").classList.replace("d-none", "d-block");
    document.querySelector("#cartInfo").classList.replace("d-block", "d-none");
  } else {
    document.querySelector("#emptyCart").classList.replace("d-block", "d-none");
    document.querySelector("#cartInfo").classList.replace("d-none", "d-block");
  }
};
displayProductsList();
displayCartProducts();

const addToCart = (index) => {
  cartItems.push(productsList[index]);
  productsList[index].isAdded = true;
  saveAndReDisplayAllData();
};
window.addToCart = addToCart;

const incrementQuantity = (index) => {
  productsList[index].quantity++;
  cartItems.splice(
    cartItems.indexOf(productsList[index]),
    1,
    productsList[index]
  );
  saveAndReDisplayAllData();
};

const decrementQuantity = (index) => {
  if (productsList[index].quantity > 1) {
    productsList[index].quantity--;
    cartItems.splice(
      cartItems.indexOf(productsList[index]),
      1,
      productsList[index]
    );
    saveAndReDisplayAllData();
  } else {
    let foundedItem = cartItems.find(
      (item) => item?.id === productsList[index]?.id
    );
    productsList[index].isAdded = false;
    cartItems.splice(cartItems.indexOf(foundedItem), 1);
    saveAndReDisplayAllData();
  }
};

const deleteItem = (index) => {
  let foundedItem = productsList.find(
    (item) => item.id === cartItems[index].id
  );
  foundedItem.isAdded = false;
  foundedItem.quantity = 1;
  cartItems.splice(index, 1);
  saveAndReDisplayAllData();
};

window.incrementQuantity = incrementQuantity;
window.decrementQuantity = decrementQuantity;
window.deleteItem = deleteItem;

const displayConfirmedProducts = () => {
  let container = "";
  for (let i = 0; i < cartItems.length; i++) {
    container += `
      <div class="confirmed-item flex-between p-3">
        <div class="d-flex align-items-center gap-3">
          <img
            src="${cartItems[i].image}"
            alt="${cartItems[i].name}"
            class="confirmed-item-img rounded-2"
          />
          <div>
            <h6 class="text-rose-900 fw-semibold">
              ${cartItems[i].name}
            </h6>
            <div class="d-flex align-items-center gap-3">
              <span class="text-red fw-semibold">${
                cartItems[i].quantity
              }x</span>
              <span class="text-rose-500">@ $${cartItems[i].price}</span>
            </div>
          </div>
        </div>
        <div>
          <span class="text-rose-900 fw-semibold fs-5">$${
            cartItems[i].quantity * cartItems[i].price
          }</span>
        </div>
      </div>
`;
  }

  document.querySelector("#confirmedItems").innerHTML = container;
};

displayConfirmedProducts();

const saveAndReDisplayAllData = () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("productsList", JSON.stringify(productsList));
  displayConfirmedProducts();
  displayProductsList();
  displayCartProducts();
};

const startNewOrder = () => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("productsList");
  addIdandIsAddedToProudcts();
  location.reload();
  displayConfirmedProducts();
  displayProductsList();
  displayCartProducts();
};

window.startNewOrder = startNewOrder;

searchInput.addEventListener("keyup", (e) => {
  const filterdProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      product.category.toLowerCase().includes(e.target.value.toLowerCase())
  );
  displayProductsList(filterdProducts);
});
