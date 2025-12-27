// 1. Define the data for your 10 flowers
const flowers = [
    { name: "Aster", price: 12.00, img: "https://picsum.photos/id/152/300/200" },
    { name: "Daffodil", price: 8.50, img: "https://picsum.photos/id/306/300/200" },
    { name: "Daisy", price: 5.00, img: "https://picsum.photos/id/307/300/200" },
    { name: "Lavender", price: 15.00, img: "" },
    { name: "Lily", price: 10.00, img: "" },
    { name: "Lotus", price: 20.00, img: "" },
    { name: "Orchid", price: 25.00, img: "" },
    { name: "Peony", price: 18.00, img: "" },
    { name: "Rose", price: 7.00, img: "" },
    { name: "GroupBox8", price: 0.00, img: "" }
];

const gridContainer = document.getElementById('flowerGrid');
const totalDisplay = document.getElementById('grandTotal');

// 2. Function to build the UI
function initShop() {
    flowers.forEach((flower, index) => {
        // Create the <article> element
        const article = document.createElement('article');
        article.className = 'flower-item';

        // Check if image exists, otherwise use placeholder text
        const imageContent = flower.img 
            ? `<img src="${flower.img}" alt="${flower.name}">` 
            : `<span>No Image</span>`;

        article.innerHTML = `
            <header>${flower.name}</header>
            <div class="photo-box">${imageContent}</div>
            <div class="actions">
                <div class="price-row">
                    <span class="price">$${flower.price.toFixed(2)}</span>
                    <label><input type="checkbox" class="selector"> Select</label>
                </div>
                <select class="qty-select"></select>
                <button class="buy-btn">Buy Now</button>
            </div>
        `;

        gridContainer.appendChild(article);

        // 3. Fill the ComboBox (Select) 0 to 10
        const select = article.querySelector('.qty-select');
        for (let i = 0; i <= 10; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            select.appendChild(opt);
        }

        // 4. Listen for changes to update price
        article.querySelector('.selector').addEventListener('change', updatePrice);
        select.addEventListener('change', updatePrice);
    });
}

// 5. Logic to calculate the total cost
function updatePrice() {
    let total = 0;
    const cards = document.querySelectorAll('.flower-item');

    cards.forEach((card, index) => {
        const isChecked = card.querySelector('.selector').checked;
        const quantity = parseInt(card.querySelector('.qty-select').value);
        
        if (isChecked) {
            total += flowers[index].price * quantity;
        }
    });

    totalDisplay.textContent = `$${total.toFixed(2)}`;
}

// Start the app
initShop();