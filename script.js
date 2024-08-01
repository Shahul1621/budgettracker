let expenses = [];
let total = 0;

document.getElementById('add-expense').addEventListener('click', addExpense);
document.getElementById('filter-category').addEventListener('change', filterExpenses);

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    if (name && amount && category && date) {
        const expense = { name, amount, category, date };
        expenses.push(expense);
        updateExpenseList();
        updateTotal();
        clearForm();
    } else {
        alert('Please fill in all fields');
    }
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = expenseList.insertRow();
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="action-btn" onclick="editExpense(${index})">Edit</button>
                <button class="action-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
    });
}

function updateTotal() {
    total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function clearForm() {
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = 'Food';
    document.getElementById('expense-date').value = '';
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateTotal();
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-date').value = expense.date;
    deleteExpense(index);
}

function filterExpenses() {
    const category = document.getElementById('filter-category').value;
    const filteredExpenses = category === 'All' ? expenses : expenses.filter(expense => expense.category === category);
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    filteredExpenses.forEach((expense, index) => {
        const row = expenseList.insertRow();
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="action-btn" onclick="editExpense(${expenses.indexOf(expense)})">Edit</button>
                <button class="action-btn" onclick="deleteExpense(${expenses.indexOf(expense)})">Delete</button>
            </td>
        `;
    });
}

// Initialize with a sample expense
expenses.push({name: "travel", amount: 50.00, category: "Transport", date: "2024-07-21"});
updateExpenseList();
updateTotal();