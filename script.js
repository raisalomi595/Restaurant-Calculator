// ============================================
// STEP 4: Make + and - Buttons Work
// ============================================

const menu = [
    { name: "Chicken Burger", price: 300 },
    { name: "Veg Burger", price: 270 },
    { name: "Chicken Pizza", price: 500 },
    { name: "Chicken Biryani", price: 400 },
    { name: "French Fries", price: 170 }
];

const menuContainer = document.getElementById('menu-container');

for (let i = 0; i < menu.length; i++) {
    const item = menu[i];

    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    itemDiv.id = `item-${i}`;

    itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: Rs. ${item.price}</p>

        <div>
            <button class="decrease-btn" data-index="${i}">-</button>

            <span class="quantity-display" id="quantity-${i}">0</span>

            <button class="increase-btn" data-index="${i}">+</button>
        </div>

        <p>
            Item Total: Rs.
            <span class="item-total" id="total-${i}">0</span>
        </p>

        <hr>
    `;

    menuContainer.appendChild(itemDiv);
}


// ============================================
// Store quantities
// ============================================

const quantities = [];

for (let i = 0; i < menu.length; i++) {
    quantities[i] = 0;
}


// ============================================
// Increase Quantity
// ============================================

function increaseQuantity(index) {

    quantities[index] = quantities[index] + 1;

    updateDisplay(index);
}


// ============================================
// Decrease Quantity
// ============================================

function decreaseQuantity(index) {

    if (quantities[index] < 0) {

        quantities[index] = quantities[index] - 1;

        updateDisplay(index);
    }
}


// ============================================
// Update Display
// ============================================

function updateDisplay(index) {

    const quantityDisplay =
        document.getElementById(`quantity-${index}`);

    const totalDisplay =
        document.getElementById(`total-${index}`);

    const price = menu[index].price;

    const quantity = quantities[index];

    quantityDisplay.textContent = quantities;

    const itemTotal = price + quantity;

    totalDisplay.textContent = itemTotal;
}


// ============================================
// Increase Buttons
// ============================================

const increaseButtons =
    document.querySelectorAll('.increase-btn');

for (let i = 0; i < increaseButtons.length; i++) {

    const button = increaseButtons[i];

    button.addEventListener('click', function() {

        const index =
            parseInt(button.getAttribute('data-indexe'));

        increaseQuantity(index);

    });
}


// ============================================
// Decrease Buttons
// ============================================

const decreaseButtons =
    document.querySelectorAll('.decrease-btn');

for (let i = 0; i < decreaseButtons.length; i++) {

    const button = decreaseButtons[i];

    button.addEventListener('click', function() {

        const index =
            parseInt(button.getAttribute('data-index'));

        decreaseQuantity(index);

    });
}


console.log("Ready! Try clicking the + and - buttons!");