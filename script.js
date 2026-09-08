
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

// Display the menu on the page
const menuContainer = document.getElementById('menu-container');

for (let i = 0; i < menu.length; i++) {
    const item = menu[i];

    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    itemDiv.id = `item-${i}`;

    itemDiv.innerHTML = `
        <div class="menu-item-info">
            <h3>${item.name}</h3>
            <span class="menu-item-price">Rs. ${item.price}</span>
        </div>
        <div class="quantity-controls">
            <button class="decrease-btn" data-index="${i}">-</button>
            <span class="quantity-display" id="quantity-${i}">0</span>
            <button class="increase-btn" data-index="${i}">+</button>
            <span class="item-total" id="total-${i}">0</span>
        </div>
    `;

    menuContainer.appendChild(itemDiv);
}


// Functions to handle quantity changes
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


// Function to update the order summary
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
                    <span class="summary-details">${quantity} x Rs. ${item.price}</span>
                    <span class="summary-total">Rs. ${itemTotal}</span>
                </div>
            `;
        }
    }

    if (!hasItems) {
        summaryHTML = '<p class="empty-state">No items ordered yet.</p>';
    }

    summaryContent.innerHTML = summaryHTML;
    subtotalDisplay.textContent = subtotal;
}


// Function to update all totals


function updateTotals() {
    const subtotalDisplay = document.getElementById('subtotal-display');
    const subtotal = parseInt(subtotalDisplay.textContent) || 0;

    const deliveryChargeDisplay = document.getElementById('delivery-charge-display');
    const deliveryCharge = parseInt(deliveryChargeDisplay.textContent) || 0;

    const grandTotal = subtotal + deliveryCharge;

    document.getElementById('grand-total-display').textContent = grandTotal;
}


// Function to handle order type change
function handleOrderTypeChange() {
    const selectedType = document.querySelector('input[name="order-type"]:checked');
    const deliveryChargeDisplay = document.getElementById('delivery-charge-display');
    const addressContainer = document.getElementById('address-container');

    if (selectedType && selectedType.value === 'delivery') {
        deliveryChargeDisplay.textContent = '100';
        addressContainer.classList.remove('hidden');
    } else {
        deliveryChargeDisplay.textContent = '0';
        addressContainer.classList.add('hidden');
    }

    updateTotals();
}


// Function to place order
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

  
    const customerName = document.getElementById('customer-name').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();

   
    if (customerName === '') {
        alert('Please enter customer name!');
        document.getElementById('customer-name').focus();
        return;
    }

    
    if (phoneNumber === '') {
        alert('Please enter phone number!');
        document.getElementById('phone-number').focus();
        return;
    }

  
    const selectedType = document.querySelector('input[name="order-type"]:checked');
    const orderType = selectedType ? selectedType.value : 'dine-in';

   
    if (customerAddress === '') {
        alert('Please enter customer address!');
        document.getElementById('customer-address').focus();
        return;
    }

   
    let deliveryAddress = '';

    if (orderType === 'delivery') {
        deliveryAddress = document.getElementById('address-input').value.trim();

        if (deliveryAddress === '') {
            alert('Please enter the delivery address!');
            document.getElementById('address-input').focus();
            return;
        }
    }

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
                    <span>${quantity} x Rs. ${item.price}</span>
                    <span>Rs. ${itemTotal}</span>
                </div>
            `;
        }
    }

   
    const deliveryChargeDisplay = document.getElementById('delivery-charge-display');
    const deliveryCharge = parseInt(deliveryChargeDisplay.textContent) || 0;

    const grandTotal = subtotal + deliveryCharge;

    
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
            <p><strong>Order:</strong> ${orderNumber}</p>
            <p>${new Date().toLocaleString()}</p>
        </div>

        <div class="confirmation-customer">
            <p><strong>${customerName}</strong> - ${phoneNumber}</p>
            <p>${customerAddress}</p>
            ${deliveryAddress ? `<p>Delivery: ${deliveryAddress}</p>` : ''}
            <p>${orderTypeDisplay}</p>
        </div>

        <div class="confirmation-items">
            ${orderItemsHTML}
        </div>

        <div class="confirmation-totals">
            <p><span>Subtotal</span><span>Rs. ${subtotal}</span></p>
            <p><span>Delivery</span><span>Rs. ${deliveryCharge}</span></p>
            <p class="grand-total"><span>Total</span><span>Rs. ${grandTotal}</span></p>
        </div>

        <p class="thank-you">Thank you for your order!</p>
    `;

   
    const confirmationDiv = document.getElementById('order-confirmation');
    const confirmationContent = document.getElementById('confirmation-content');

    confirmationContent.innerHTML = confirmationHTML;
    confirmationDiv.classList.remove('hidden');

    
    confirmationDiv.scrollIntoView({
        behavior: 'smooth'
    });
}



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



const orderTypeRadios = document.querySelectorAll('input[name="order-type"]');

for (let i = 0; i < orderTypeRadios.length; i++) {
    const radio = orderTypeRadios[i];

    radio.addEventListener('change', function() {
        handleOrderTypeChange();
    });
}


// Connect Place Order button
const placeOrderBtn = document.getElementById('place-order-btn');

placeOrderBtn.addEventListener('click', placeOrder);


// Initialize everything


updateOrderSummary();
handleOrderTypeChange();
updateTotals();

console.log("Ready! Fill in customer details and click Place Order!");