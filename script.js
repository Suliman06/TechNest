// Toggle dropdown menu for mobile
function toggleMenu() {
  const menu = document.getElementById('dropdown-menu');
  menu.classList.toggle('active');
}

// Show/hide shop dropdown on mobile
const shopItem = document.querySelector('.shop-item');
const shopDropdown = document.querySelector('.shop-dropdown');

if (shopItem && shopDropdown) {
  // For mobile devices, toggle dropdown on click
  shopItem.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      shopDropdown.style.display = shopDropdown.style.display === 'block' ? 'none' : 'block';
    }
  });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Open lightbox when an image is clicked
document.querySelectorAll('.product-card img').forEach((img) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Product Filter
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  productCards.forEach((card) => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    const productCategory = card.getAttribute('data-category');

    const matchesSearch = productName.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Recently Viewed Products
const recentlyViewedGrid = document.querySelector('.recently-viewed-grid');

// Track viewed products
const viewedProducts = [];

document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', () => {
    const product = {
      name: card.querySelector('h3').textContent,
      image: card.querySelector('img').src,
    };

    if (!viewedProducts.some((p) => p.name === product.name)) {
      viewedProducts.push(product);
      updateRecentlyViewed();
    }
  });
});

function updateRecentlyViewed() {
  recentlyViewedGrid.innerHTML = viewedProducts
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
      </div>
    `
    )
    .join('');
}

// Cart Notification
const cartNotification = document.getElementById('cart-notification');

document.querySelectorAll('.product-card button').forEach((button) => {
  button.addEventListener('click', () => {
    cartNotification.style.display = 'block';
    setTimeout(() => {
      cartNotification.style.display = 'none';
    }, 2000);
  });
});

// Function to show notification
function showNotification(message) {
  // Create a new div for the notification
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = '#0078d7';
  notification.style.color = 'white';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
  notification.style.zIndex = '1000';
  document.body.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting
  showNotification('Message sent successfully!'); // Show the notification
  this.reset(); // Clear the form
});