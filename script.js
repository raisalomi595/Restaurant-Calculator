
// Our menu data
const menu = [
    {
        name: "Chicken Burger",
        price: 300
    },
    {
        name: "Veg Burger",
        price: 270
    },
    {
        name: "Chicken Pizza",
        price: 500
    },
    {
        name: "Chicken Biryani",
        price: 400
    },
    {
        name: "French Fries",
        price: 170
    }
];

// Create an array to store quantities for each item
const quantities = [];

// Initialize all quantities to 0
for (let i = 0; i < menu.length; i++) {
    quantities[i] = 0;
}

// ============================================
// Display the menu on the page
// ============================================

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
        <p>Item Total: Rs. <span class="item-total" id="total-${i}">0</span></p>
        <hr>
    `;

    menuContainer.appendChild(itemDiv);
}

// ============================================
// Functions to handle quantity changes
// ============================================

function increaseQuantity(index) {
    quantities[index] = quantities[index] + 1;
    updateDisplay(index);
    updateOrderSummary();
    updateTotals();
}

function decreaseQuantity(index) {
    if (quantities[index] > 0) {
        quantities[index] = quantities[index] - 1;
        updateDisplay(index);
        updateOrderSummary();
        updateTotals();
    }
}

function updateDisplay(index) {
    const quantityDisplay = document.getElementById(`quantity-${index}`);
    const totalDisplay = document.getElementById(`total-${index}`);
    const price = menu[index].price;
    const quantity = quantities[index];

    quantityDisplay.textContent = quantity;

    const itemTotal = price * quantity;
    totalDisplay.textContent = itemTotal;
}

// ============================================
// Function to update the order summary
// ============================================

function updateOrderSummary() {
    const summaryContent = document.getElementById('summary-content');
    const subtotalDisplay = document.getElementById('subtotal-display');

    let summaryHTML = '';
    let subtotal = 0;
    let hasItems = false;

    for (let i = 0; i < menu.length; i++) {
        const quantity = quantities[i];

        if (quantity > 0) {
            hasItems = true;

            const item = menu[i];
            const itemTotal = item.price * quantity;

            subtotal = subtotal + itemTotal;

            summaryHTML = summaryHTML + `
                <div class="summary-item">
                    <span class="summary-name">${item.name}</span>
                    <span class="summary-details">${quantity} × Rs. ${item.price}</span>
                    <span class="summary-total">Rs. ${itemTotal}</span>
                </div>
            `;
        }
    }

    if (!hasItems) {
        summaryHTML = '<p>No items ordered yet.</p>';
    }

    summaryContent.innerHTML = summaryHTML;
    subtotalDisplay.textContent = subtotal;
}

// ============================================
// Function to update all totals
// ============================================

function updateTotals() {
    const subtotalDisplay = document.getElementById('subtotal-display');
    const subtotal = parseInt(subtotalDisplay.textContent) || 0;

    const deliveryChargeDisplay = document.getElementById('delivery-charge-display');
    const deliveryCharge = parseInt(deliveryChargeDisplay.textContent) || 0;

    const grandTotal = subtotal + deliveryCharge;

    document.getElementById('grand-total-display').textContent = grandTotal;
}

// ============================================
// Function to handle order type change
// ============================================

function handleOrderTypeChange() {
    const selectedType = document.querySelector('input[name="order-type"]:checked');
    const deliveryChargeDisplay = document.getElementById('delivery-charge-display');
    const addressContainer = document.getElementById('address-container');

    if (selectedType && selectedType.value === 'delivery') {
        deliveryChargeDisplay.textContent = '100';
        addressContainer.style.display = 'block';
    } else {
        deliveryChargeDisplay.textContent = '0';
        addressContainer.style.display = 'none';
    }

    updateTotals();
}

// ============================================
// Function to place order
// ============================================

function placeOrder() {
    // Step 1: Check if any items are ordered
    let hasItems = false;

    for (let i = 0; i < quantities.length; i++) {
        if (quantities[i] > 0) {
            hasItems = true;
            break;
        }
    }

    if (!hasItems) {
        alert('Please add at least one item to your order!');
        return;
    }

    // Step 2: Get customer information
    const customerName = document.getElementById('customer-name').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();

    // Step 3: Validate customer name
    if (customerName === '') {
        alert('Please enter customer name!');
        document.getElementById('customer-name').focus();
        return;
    }

    // Step 4: Validate phone number
    if (phoneNumber === '') {
        alert('Please enter phone number!');
        document.getElementById('phone-number').focus();
        return;
    }

    // Step 5: Get order type
    const selectedType = document.querySelector('input[name="order-type"]:checked');
    const orderType = selectedType ? selectedType.value : 'dine-in';

    // Step 6: Validate customer address
    if (customerAddress === '') {
        alert('Please enter customer address!');
        document.getElementById('customer-address').focus();
        return;
    }

    // Step 7: Get delivery address
    let deliveryAddress = '';

    if (orderType === 'delivery') {
        deliveryAddress = document.getElementById('address-input').value.trim();

        if (deliveryAddress === '') {
            alert('Please enter the delivery address!');
            document.getElementById('address-input').focus();
            return;
        }
    }

    // Step 8: Prepare order items
    let orderItemsHTML = '';
    let subtotal = 0;

    for (let i = 0; i < menu.length; i++) {
        const quantity = quantities[i];

        if (quantity > 0) {
            const item = menu[i];
            const itemTotal = item.price * quantity;

            subtotal = subtotal + itemTotal;

            orderItemsHTML = orderItemsHTML + `
                <div class="confirmation-item">
                    <span>${item.name}</span>
                    <span>${quantity} × Rs. ${item.price}</span>
                    <span>Rs. ${itemTotal}</span>
                </div>
            `;
        }
    }

    // Step 9: Get delivery charge
    const deliveryChargeDisplay = document.getElementById('delivery-charge-display');
    const deliveryCharge = parseInt(deliveryChargeDisplay.textContent) || 0;

    const grandTotal = subtotal + deliveryCharge;

    // Step 10: Format order type
    let orderTypeDisplay = '';

    if (orderType === 'dine-in') {
        orderTypeDisplay = 'Dine In';
    } else if (orderType === 'takeaway') {
        orderTypeDisplay = 'Takeaway';
    } else if (orderType === 'delivery') {
        orderTypeDisplay = 'Delivery';
    }

    // Step 11: Create order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);

    // Step 12: Create confirmation HTML
    const confirmationHTML = `
        <div class="confirmation-header">
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Date & Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <hr>

        <div class="confirmation-customer">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Address:</strong> ${customerAddress}</p>
            ${deliveryAddress ? `<p><strong>Delivery Address:</strong> ${deliveryAddress}</p>` : ''}
            <p><strong>Order Type:</strong> ${orderTypeDisplay}</p>
        </div>

        <hr>

        <div class="confirmation-items">
            ${orderItemsHTML}
        </div>

        <hr>

        <div class="confirmation-totals">
            <p><strong>Subtotal:</strong> Rs. ${subtotal}</p>
            <p><strong>Delivery Charge:</strong> Rs. ${deliveryCharge}</p>
            <p class="grand-total"><strong>TOTAL:</strong> Rs. ${grandTotal}</p>
        </div>

        <hr>

        <p class="thank-you">Thank you for your order!</p>
    `;

    // Step 13: Show confirmation
    const confirmationDiv = document.getElementById('order-confirmation');
    const confirmationContent = document.getElementById('confirmation-content');

    confirmationContent.innerHTML = confirmationHTML;
    confirmationDiv.style.display = 'block';

    // Step 14: Scroll to confirmation
    confirmationDiv.scrollIntoView({
        behavior: 'smooth'
    });
}

// ============================================
// Connect buttons to functions
// ============================================

const increaseButtons = document.querySelectorAll('.increase-btn');

for (let i = 0; i < increaseButtons.length; i++) {
    const button = increaseButtons[i];

    button.addEventListener('click', function() {
        const index = parseInt(button.getAttribute('data-index'));
        increaseQuantity(index);
    });
}

const decreaseButtons = document.querySelectorAll('.decrease-btn');

for (let i = 0; i < decreaseButtons.length; i++) {
    const button = decreaseButtons[i];

    button.addEventListener('click', function() {
        const index = parseInt(button.getAttribute('data-index'));
        decreaseQuantity(index);
    });
}

// ============================================
// Connect order type radio buttons
// ============================================

const orderTypeRadios = document.querySelectorAll('input[name="order-type"]');

for (let i = 0; i < orderTypeRadios.length; i++) {
    const radio = orderTypeRadios[i];

    radio.addEventListener('change', function() {
        handleOrderTypeChange();
    });
}

// ============================================
// Connect Place Order button
// ============================================

const placeOrderBtn = document.getElementById('place-order-btn');

placeOrderBtn.addEventListener('click', placeOrder);

// ============================================
// Initialize everything
// ============================================

updateOrderSummary();
handleOrderTypeChange();
updateTotals();

console.log("Ready! Fill in customer details and click Place Order!");