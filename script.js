function toggleMenu() {
  const menu = document.getElementById('dropdown-menu');
  menu.classList.toggle('active');
}

const shopItem = document.querySelector('.shop-item');
const shopDropdown = document.querySelector('.shop-dropdown');

if (shopItem && shopDropdown) {
  shopItem.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      shopDropdown.style.display = 'block';
    }
  });

  shopItem.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      shopDropdown.style.display = 'none';
    }
  });

  shopItem.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      shopDropdown.style.display = shopDropdown.style.display === 'block' ? 'none' : 'block';
    }
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.product-card img').forEach((img) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
  });
});

closeBtn?.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox?.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const cartNotification = document.getElementById("cart-notification");
const cartNotificationMessage = document.getElementById("cart-notification-message");
const cartNotificationCheckout = document.getElementById("cart-notification-checkout");

document.querySelectorAll(".product-card button").forEach((button) => {
  button.addEventListener("click", () => {
    showCartNotification("Added to Cart!");
  });
});

function showCartNotification(message) {
  cartNotificationMessage.textContent = message;

  cartNotification.style.display = "flex";

  setTimeout(() => {
    cartNotification.style.display = "none";
  }, 5000);
}

//cartNotificationCheckout.addEventListener("click", () => {
//  window.location.href = "checkout.html";
//});

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.classList.add('notification');
  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

document.getElementById('contactForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  showNotification('Message sent successfully!');
  this.reset();
});

// Product Data
const products = [
  { id: 1, name: "Wireless Mouse", category: "laptop-accessories", price: 29.99, image: "src/wireless-mouse.png" },
  { id: 2, name: "Laptop Stand", category: "laptop-accessories", price: 49.99, image: "src/laptop-stand.png" },
  { id: 3, name: "USB-C Hub", category: "laptop-accessories", price: 39.99, image: "src/usb-c-hub.png" },
  { id: 4, name: "Phone Case", category: "phone-accessories", price: 19.99, image: "src/phone-case.jpg" },
  { id: 5, name: "Wireless Charger", category: "phone-accessories", price: 34.99, image: "src/wireless-charger.png" },
  { id: 6, name: "Screen Protector", category: "phone-accessories", price: 9.99, image: "src/screen-protector.png" },
  { id: 7, name: "Bluetooth Earbuds", category: "audio-devices", price: 79.99, image: "src/bluetooth-earbuds.png" },
  { id: 8, name: "Portable Speaker", category: "audio-devices", price: 59.99, image: "src/jbl-speaker.png" },
  { id: 9, name: "Noise-Cancelling Headphones", category: "audio-devices", price: 149.99, image: "src/airpods-pro.png" },
  { id: 10, name: "Gaming Headset", category: "audio-devices", price: 99.99, image: "src/gaming-headset.png" },
];

document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("category-filter");
  const priceRangeFilter = document.getElementById("price-range");
  const ratingFilter = document.getElementById("rating-filter");
  const brandFilter = document.getElementById("brand-filter");
  const sortPrice = document.getElementById("sort-price");
  const productsGrid = document.getElementById("products-grid");

  if (categoryFilter && priceRangeFilter && ratingFilter && brandFilter && sortPrice && productsGrid) {
    const savedCategory = localStorage.getItem("categoryFilter") || "all";
    const savedPriceRange = localStorage.getItem("priceRangeFilter") || "all";
    const savedRating = localStorage.getItem("ratingFilter") || "all";
    const savedBrand = localStorage.getItem("brandFilter") || "all";
    const savedSort = localStorage.getItem("sortPrice") || "default";

    categoryFilter.value = savedCategory;
    priceRangeFilter.value = savedPriceRange;
    ratingFilter.value = savedRating;
    brandFilter.value = savedBrand;
    sortPrice.value = savedSort;

    filterAndSortProducts();

    categoryFilter.addEventListener("change", filterAndSortProducts);
    priceRangeFilter.addEventListener("change", filterAndSortProducts);
    ratingFilter.addEventListener("change", filterAndSortProducts);
    brandFilter.addEventListener("change", filterAndSortProducts);
    sortPrice.addEventListener("change", filterAndSortProducts);
  } else {
    console.error("Filter or sort elements not found!");
  }

  function filterAndSortProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceRangeFilter.value;
    const selectedRating = ratingFilter.value;
    const selectedBrand = brandFilter.value;
    const selectedSort = sortPrice.value;

    const productCards = Array.from(productsGrid.querySelectorAll(".product-card"));

    productCards.forEach((card) => {
      card.style.display = "block";
    });

    productCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));
      const rating = parseFloat(card.querySelector(".rating").textContent.match(/\d+\.\d+/)[0]);
      const brand = card.getAttribute("data-brand");

      if (selectedCategory !== "all" && category !== selectedCategory) {
        card.style.display = "none";
      }

      const [minPrice, maxPrice] = selectedPriceRange === "all" ? [0, Infinity] : selectedPriceRange.split("-").map(Number);
      if (price < minPrice || (maxPrice !== Infinity && price > maxPrice)) {
        card.style.display = "none";
      }

      const minRating = selectedRating === "all" ? 0 : parseFloat(selectedRating.replace("+", ""));
      if (rating < minRating) {
        card.style.display = "none";
      }

      if (selectedBrand !== "all" && brand !== selectedBrand) {
        card.style.display = "none";
      }
    });

    const visibleProducts = productCards.filter((card) => card.style.display !== "none");
    if (visibleProducts.length === 0) {
      showNoItemsMessage();
    } else {
      hideNoItemsMessage();
    }

    if (selectedSort !== "default") {
      visibleProducts.sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
        return selectedSort === "asc" ? priceA - priceB : priceB - priceA;
      });

      productsGrid.innerHTML = "";
      visibleProducts.forEach((product) => productsGrid.appendChild(product));
    }

    localStorage.setItem("categoryFilter", selectedCategory);
    localStorage.setItem("priceRangeFilter", selectedPriceRange);
    localStorage.setItem("ratingFilter", selectedRating);
    localStorage.setItem("brandFilter", selectedBrand);
    localStorage.setItem("sortPrice", selectedSort);
  }

  function showNoItemsMessage() {
    let noItemsMessage = document.getElementById("no-items-message");
    if (!noItemsMessage) {
      noItemsMessage = document.createElement("div");
      noItemsMessage.id = "no-items-message";
      noItemsMessage.textContent = "No items found with this filter.";
      noItemsMessage.style.textAlign = "center";
      noItemsMessage.style.fontSize = "1.25rem";
      noItemsMessage.style.color = "#666";
      noItemsMessage.style.marginTop = "2rem";
      productsGrid.appendChild(noItemsMessage);
    }
  }

  function hideNoItemsMessage() {
    const noItemsMessage = document.getElementById("no-items-message");
    if (noItemsMessage) {
      noItemsMessage.remove();
    }
  }
});

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    const product = {
      id: button.getAttribute('data-id'),
      name: button.getAttribute('data-name'),
      price: parseFloat(button.getAttribute('data-price')),
      image: button.getAttribute('data-image'),
      quantity: 1,
    };
    addToCart(product);
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!product.image.includes('.')) {
    product.image += '.png';
  }

  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showCartNotification(`${product.name} added to cart!`);
}

function loadCart() {
  if (!document.getElementById('cart-container')) return;

  console.log("Loading cart...");

  const cartContainer = document.getElementById('cart-container');
  const totalItemsElement = document.getElementById('total-items');
  const totalPriceElement = document.getElementById('total-price');

  let cart = [];
  try {
    const cartData = localStorage.getItem('cart');
    cart = cartData ? JSON.parse(cartData) : [];
    console.log("Cart data from storage:", cart);
  } catch (e) {
    console.error("Error reading cart data:", e);
    cart = [];
  }

  cartContainer.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const imagePath = item.image.includes('.png') ? item.image : `${item.image}.png`;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${imagePath}" alt="${item.name}" onerror="this.src='src/placeholder.png'">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity || 1}</p>
        <button class="remove-button" data-index="${index}">Remove</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);

    totalItems += item.quantity || 1;
    totalPrice += item.price * (item.quantity || 1);
  });

  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = totalPrice.toFixed(2);

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', () => {
      removeFromCart(parseInt(button.dataset.index));
    });
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('cart.html')) {
    loadCart();
  }
});

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    const product = {
      id: button.getAttribute('data-id'),
      name: button.getAttribute('data-name'),
      price: parseFloat(button.getAttribute('data-price')),
      image: button.getAttribute('data-image')
    };
    console.log("Adding product:", product);
    addToCart(product);
  });
});