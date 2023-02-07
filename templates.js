function renderDishesHTML(i) {
    return `
    <div class="cards" id="cards${i}" onclick="addToBasket(${i}), displayBasket(), payButtonResC()" >
    <div class="cards-head">
        <div class="title-plus">
            <span class="dish-title">${dishes[i]}</span>
            <div class="plus" id="plus">
            <img src="img/plus.png" class="plus-icon" >
            </div>
        </div>
        <div class="description">
            <span>${description[i]}</span>
        </div>
    </div>    
        <span>${price[i]}€</span>
    </div>
    `;
}


function renderFullBasketHtml() {
    return `
    <div id="fullBasketParent" class="full-basket-parent">
        <h2>Warenkorb</h2>
        <div class="ordered-dish">
            <div id="fullBasketChild" class="full-basket-child"></div>
            <div id="minOrderDiv" class="d-none">
                <div id="restSum" class="min-order">
                </div>
                <div class="min-order-text">
                    Leider kannst du noch nicht bestellen. Ciao Burger Restaurant liefert erst ab einem Mindestbestellwert von 20,00 € (inkl. Lieferkosten)
                </div>
            </div>

            <div class="sub-total">
                <div class="sub-total-text">
                    <div>Zwischensumme</div>
                    <div id="preSum"></div>
                </div>
                <div class="sub-total-text">
                    <div>Lieferkosten</div
                    <div>${deliveryCosts.toFixed(2)}€</div>
                </div>
                <div class="sub-total-text">
                    <div class="gesamt">Gesamt</div>
                    <div id="total">$€</div>
                </div>
            </div>

            <div id="showFinalPriceFull" class="show-final-price-full show-final-price-empty"></div>
    </div>
    `;
}


function displayDishCardsHtml(n) {
    return `
    <div class="flex">
            <div class="name-amount">
                <div class="amount" id="newAmount">${basketAmount[n]}x</div>
                <div class="dish-name">${basketDish[n]}</div>
                </div>
                <div>${preSum.toFixed(2)}€</div> 
            </div>

    <div class="basket-plus-minus">
        <div class="plus-minus-bg" onclick="minusOne(${n})">
        <img src="img/minus.png" >
    </div>
        <div class="plus-minus-bg" onclick="plusOne(${n})">
        <img src="img/plus.png" >
    </div>
</div>
<hr>
    `;
}