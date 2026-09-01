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

const quantities = [];

for (let i = 0; i < menu.length; i++) {
    quantities[i] = 0;
}

function increaseQuantity(index) {
    quantities[index] = quantities[index] + 1;
    updateDisplay(index);
}

function decreaseQuantity(index) {
    if (quantities[index] > 0) {
        quantities[index] = quantities[index] - 1;
        updateDisplay(index);
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

console.log("Ready! Try clicking the + and - buttons!");