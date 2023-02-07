let dishes = ['Hamburger', 'Cheesebruger', 'Baconburger', 'Mexicanburger', 'Chickenburger', 'Double-Cheese Burger'];
let price = [8.99, 9.99, 10.99, 11.99, 12.99, 13.99];
let description = ['mit saftigem Rindfleisch, Zwiebeln, Gurke, Ketchup und Senf', 'saftiges Rindfleisch, Zwiebeln, Gurke, Ketchup, Senfsauce und zart schmelzendes Käse', 'saftig gebratenes Rinderhackfleisch mit Burgersauce, Eisberg- und Eichblattsalat, Chesterkäse, Bacon, eingelegten Gurken, Tomaten, Cocktailsauce, rote Zwiebeln und Röstzwiebel', 'saftig gebratenes Rinderhackfleisch mit Burgersauce, Eisberg- und Eichblattsalat, Chesterkäse, Chili con Carne, Jalapeños, Nachos und Cocktailsauce', 'Chicken Crispers mit Burgersauce, Eisberg- und Eichblattsalat, Chesterkäse, Tomaten, frischen Gurken und Cocktailsauce', '2 x 200 g* saftig gebratenes Rinderhackfleisch mit Burgersauce, Eisberg- und Eichblattsalat, Chesterkäse,Bacon, eingelegten Gurken, Tomaten, frischen roten Zwiebeln, Röstzwiebeln und Cocktailsauce'];
let amount = [1, 1, 1, 1, 1, 1];


let basketDish = [];
let basketPrice = [];
let basketAmount = [];

let deliveryCosts = 2.50;
let minOrderPrice = 20.00;
let preSum;
let finalPrice;

function init() {
    renderDishes();
}


function renderDishes() {
    let dishesDiv = document.getElementById('dishesDiv');
    dishesDiv.innerHTML = '';
    for (let i = 0; i < dishes.length; i++) {
        dishesDiv.innerHTML += renderDishesHTML(i);
    }
}


function addToBasket(i) {
    let index = basketDish.indexOf(dishes[i]);  //finde den index von der Variable "i" 
    if (index == -1) {                          // falls der Index von der Variablen i noch nicht in dem array vorhanden ist
        basketDish.push(dishes[i]);            // dann pushe den i wert zum basketDish array hinzu
        basketPrice.push(price[i]);            // dann füge den i wert zum basket_preis array hinzu
        basketAmount.push(Number(1));          // dann erhöhe den basketAmount array um eins
    } else {
        basketAmount[index]++;                 // erhöhe den Wert von der i um eins (also  1 + 1 = 2 + 1 = 3 usw.. )
    }
    renderFullBasket();
}


// show full basket as soon as adding smthing
function renderFullBasket() {
    let fullBasket = document.getElementById('fullBasket');
    fullBasket.innerHTML = '';
    fullBasket.innerHTML += renderFullBasketHtml();
    calculateFinalSum(finalPrice);
    displayDishCards();
}


// shwo individual dish cards in the basket 
function displayDishCards() {
    let fullBasket = document.getElementById('fullBasketChild');
    fullBasket.innerHTML = '';
    for (let n = 0; n < basketDish.length; n++) {
        preSum = basketPrice[n] * basketAmount[n]
        fullBasket.innerHTML += displayDishCardsHtml(n);
    }
}


//add one Item
function plusOne(n) {
    basketAmount[n]++;
    calculateFinalSum();
    displayDishCards();
}


//remove one Item, and remove the dish if its 0
function minusOne(n) {
    basketAmount[n]--;
    if (basketAmount[n] <= 0) {
        basketAmount.splice(n, 1)
        basketDish.splice(n, 1)
        basketPrice.splice(n, 1)
    }
    calculateFinalSum(n);
    displayDishCards();
}


//calculates the final price
function calculateFinalSum() {
    let finalPrice = deliveryCosts;
    for (let i = 0; i < basketPrice.length; i++) {
        finalPrice = finalPrice + basketPrice[i] * basketAmount[i];
    }

    let preSum = finalPrice - deliveryCosts;
    let minOrder = minOrderPrice - finalPrice;

    displayEmptyBasket(finalPrice);
    minOrderDetails(finalPrice);
    lastPriceInfo(finalPrice, preSum, minOrder);
    displayBasketResponsive(finalPrice);

}


//proof if basket is empty, then show empty basket
function displayEmptyBasket(finalPrice) {
    if (finalPrice <= deliveryCosts) {
        document.getElementById('fullBasket').classList.add('d-none');
        document.getElementById('emptyBasket').classList.remove('d-none');
    }
}


//Paybutton change colors, and add/removes details if Sum isunder 20
function minOrderDetails(finalPrice) {
    if (finalPrice < 20) {
        document.getElementById('minOrderDiv').classList.remove('d-none');
        document.getElementById('showFinalPriceFull').classList.add('show-final-price-empty');
        document.getElementById("showFinalPriceFull").innerHTML = `
        <div>Bezahlen (${finalPrice.toFixed(2)})</div>`;
    } else {
        document.getElementById('minOrderDiv').classList.add('d-none');
        document.getElementById('showFinalPriceFull').classList.remove('show-final-price-empty');
        document.getElementById("showFinalPriceFull").innerHTML = `
         <div>Bezahlen (${finalPrice.toFixed(2)}€)</div>`;
    }

    if (finalPrice <= deliveryCosts) {
        closePopUpBasket();
        payButtonResO();
    }
}


//the price composition before ordering
function lastPriceInfo(finalPrice, preSum, minOrder) {
    document.getElementById('total').innerHTML = `${finalPrice.toFixed(2)}€`;
    document.getElementById('preSum').innerHTML = `${preSum.toFixed(2)}€`;
    document.getElementById('restSum').innerHTML = `
    Benötigter Betrag, um den Mindestbestellwert zu erreichen ${minOrder.toFixed(2)}€
    `;
}


//remove empty basket, show full basket
function displayBasket() {
    document.getElementById('emptyBasket').classList.add('d-none');
    document.getElementById('fullBasket').classList.remove('d-none');
}


//show Pay button responsive
function displayBasketResponsive(finalPrice) {
    document.getElementById('responsiveBasket').innerHTML = `<div class="responsive-child d-none">Bezahlen (${finalPrice.toFixed(2)} €)</div>`;
}


//remove pay button if basket is empty
function payButtonResO(){
    document.getElementById('responsiveBasket').classList.add('d-none');
}


//show pay button if adding smthg to basket
function payButtonResC(){
    document.getElementById('responsiveBasket').classList.remove('d-none');
}


//show full Bakset responsive
function openPopUpBasket() {
    document.getElementById('fullBasket').classList.add('d-block');
    document.getElementById('xMark').classList.add('d-block');
    document.getElementById('xDiv').classList.add('d-block');
    document.getElementById('body').classList.add('scrollbar')
}


//close full Basket responsive
function closePopUpBasket() {
    document.getElementById('fullBasket').classList.remove('d-block');
    document.getElementById('xMark').classList.remove('d-block');
    document.getElementById('xDiv').classList.remove('d-block');
    document.getElementById('body').classList.remove('scrollbar')
}