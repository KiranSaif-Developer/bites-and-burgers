import { burgersApi } from './api.js';
import { formatPrice } from './utils.js'; 

const burgerList = document.getElementById('burger-list');
let menuData = [];

async function init() {
    try {
        menuData = await burgersApi.getAll();
        renderBurgers(menuData);
        updateCartCount();
    } catch (e) { console.error("Database connection failed", e); }
}

function renderBurgers(burgers) {
    // Only show standard burgers here (Specials are hardcoded in HTML)
    const filtered = burgers.filter(b => b.id < 100); 
    burgerList.innerHTML = filtered.map(b => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100 shadow-sm border-0">
                <img src="${b.image}" class="card-img-top" style="height:160px; object-fit:cover;">
                <div class="card-body text-center d-flex flex-column">
                    <h6 class="fw-bold mb-1">${b.name}</h6>
                    
                    <p class="text-muted small mb-2" style="font-size: 0.75rem; line-height: 1.2;">
                        ${b.description || "Freshly made with premium ingredients."}
                    </p>

                    <p class="text-danger fw-bold mt-auto mb-2">${formatPrice(b.price)}</p>
                    <button class="btn btn-dark btn-sm w-100" 
                    onclick="addToCart(${JSON.stringify(b.id)})">Add to Order</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showToast() {
    const toast = document.getElementById('toast-msg');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 1500);
}
window.addToCart = function(id) {
    const item = menuData.find(b => b.id == id); //
    
    if (item) {
        // 1. Save to Cart
        let cart = JSON.parse(localStorage.getItem('burgerCart')) || [];
        cart.push(item);
        localStorage.setItem('burgerCart', JSON.stringify(cart));
        
        // 2. Update Navbar Badge
        updateCartCount(); 

        // 3. Show the Popup (Toast)
        const toast = document.getElementById('cart-toast');
        const message = document.getElementById('toast-message');
        
        message.innerText = item.name + " added to basket!";
        toast.style.display = 'block';

        // 4. Automatically hide it after 1500ms (1.5 seconds)
        setTimeout(() => {
            toast.style.display = 'none';
        }, 1500);
    }
};

//  ADD THE UPDATED addToCart FUNCTION HERE
function addToCart(id) {
    const item = burgers.find(b => b.id == id); // Use 'burgers' or your data array name
    if (item) {
        let cart = JSON.parse(localStorage.getItem('burgerCart')) || [];
        cart.push(item);
        localStorage.setItem('burgerCart', JSON.stringify(cart));
        updateCartCount(); // Refresh the badge
        alert("Success! " + item.name + " added to basket."); 
    }
}

//  ADD THE updateCartCount FUNCTION HERE
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('burgerCart')) || [];
    const countSpan = document.getElementById('cart-count'); // Must match your HTML ID
    if (countSpan) {
        countSpan.innerText = cart.length;
        countSpan.style.display = cart.length > 0 ? "block" : "none"; // Makes it visible
    }
}

//  CALL THE INITIAL COUNT
updateCartCount(); // This makes sure the number is there when you refresh

init();