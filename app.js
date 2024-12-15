const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [
//     { id: 1, text: 'flower', amount: -20 },
//     { id: 2, text: 'salary', amount: 500 },
//     { id: 3, text: 'book', amount: -10 },
//     { id: 4, text: 'camera', amount: 120 },
// ]

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

//add Transaction
function addTransaction(event) {
    event.preventDefault()
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please Enter text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)

        addTransactionDOM(transaction)

        updateValues();

        updateLocalStorage()

        text.value = '';
        amount.value = '';
    }

}

//Generates Id
function generateID() {
    return Math.floor(Math.random() * 1000000000)
}


//adds transaction to DOM List
function addTransactionDOM(transaction) {

    //get Sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //adds class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span >${sign}${Math.abs(transaction.amount)}</span> <button class= "delete-btn" onclick="removeTransaction(${transaction.id})">X</button> 
    `;

    list.appendChild(item);
}


//update the balance income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);


    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2)

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

//Remove Transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

//Update Local storage Transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}



//Init App
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM)
    updateValues()
}

init();

form.addEventListener('submit', addTransaction) 