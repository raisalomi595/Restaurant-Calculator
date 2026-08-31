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

const menuSection = document.createElement('div');
menuContainer.id = 'menu-container';

const body = document.body;
body.appendChild(menuContainer);

for (let i= 0; i<menu.length; i++) {
    const item = menu[i];
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';

    itemDiv.innerHTML = `
    <h3>${item.name}</h3>
    <p>Price: Rs. ${item.price}</p>
    <div>
        <button>-</button>
        <span>0</span>
        <button>+</button>
    </div>
    <p>Item Total: Rs. 0</p>
    <hr>
    `;
    menuContainer.appendChild(itemDiv);
}
console.log("Our menu items:", menu);
console.log("First item:", menu[0].name, "-Rs.", menu[0].price);