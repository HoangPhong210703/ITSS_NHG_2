document.addEventListener('DOMContentLoaded', () => {
    const budgetDateInput = document.getElementById('budget-date');
    const dailyBudgetInput = document.getElementById('daily-budget');
    const setBudgetBtn = document.getElementById('set-budget-btn');
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expensesList = document.getElementById('expenses');
    const totalBudgetDisplay = document.getElementById('total-budget');
    const totalSpentDisplay = document.getElementById('total-spent');
    const remainingBudgetDisplay = document.getElementById('remaining-budget');
    const progressBar = document.getElementById('progress-bar');
    const noExpensesMessage = document.getElementById('no-expenses');
    const budgetSetMessage = document.getElementById('budget-set-message');
    const setDateDisplay = document.getElementById('set-date-display');
    const currentDateDisplay = document.getElementById('current-date-display');
    const summaryDateDisplay = document.getElementById('summary-date-display');

    let dailyBudgets = {}; // Object to store budgets for different dates
    let expenses = []; // Array to store today's expenses

    let currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    budgetDateInput.value = currentDate; // Set default date in the calendar
    updateDisplayForDate(currentDate);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    function updateDisplayForDate(date) {
        currentDate = date;
        currentDateDisplay.textContent = formatDate(currentDate);
        summaryDateDisplay.textContent = formatDate(currentDate);
        expenses = getExpensesForDate(currentDate);
        renderExpenses();
        updateBudgetDisplay(currentDate);
    }

    function getBudgetForDate(date) {
        return dailyBudgets[date] || 0;
    }

    function getExpensesForDate(date) {
        return expenses.filter(expense => expense.date === date);
    }

    function updateBudgetDisplay(date) {
        const budget = getBudgetForDate(date);
        totalBudgetDisplay.textContent = `$${budget.toFixed(2)}`;
        const totalSpent = getExpensesForDate(date).reduce((sum, expense) => sum + expense.amount, 0);
        totalSpentDisplay.textContent = `$${totalSpent.toFixed(2)}`;
        const remainingBudget = budget - totalSpent;
        remainingBudgetDisplay.textContent = `$${remainingBudget.toFixed(2)}`;

        const progress = budget > 0 ? (totalSpent / budget) * 100 : 0;
        progressBar.style.width = `${Math.min(progress, 100)}%`;

        if (progress > 100) {
            progressBar.style.backgroundColor = '#dc3545'; // Red if over budget
        } else {
            progressBar.style.backgroundColor = '#28a745'; // Green otherwise
        }
    }

    function renderExpenses() {
        expensesList.innerHTML = '';
        const todaysExpenses = getExpensesForDate(currentDate);
        if (todaysExpenses.length === 0) {
            noExpensesMessage.style.display = 'block';
        } else {
            noExpensesMessage.style.display = 'none';
            todaysExpenses.forEach((expense, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${expense.description}</span>
                    <span>$${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                expensesList.appendChild(listItem);
            });

            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const indexToDelete = parseInt(this.dataset.index);
                    // Find the index of the expense in the main expenses array
                    const expenseToDelete = todaysExpenses[indexToDelete];
                    const globalIndex = expenses.findIndex(exp => exp.date === expenseToDelete.date && exp.description === expenseToDelete.description && exp.amount === expenseToDelete.amount);
                    if (globalIndex > -1) {
                        expenses.splice(globalIndex, 1);
                        renderExpenses();
                        updateBudgetDisplay(currentDate);
                    }
                });
            });
        }
    }

    setBudgetBtn.addEventListener('click', () => {
        const budgetDate = budgetDateInput.value;
        const budgetAmount = parseFloat(dailyBudgetInput.value);
        if (budgetDate && !isNaN(budgetAmount) && budgetAmount > 0) {
            dailyBudgets[budgetDate] = budgetAmount;
            budgetSetMessage.style.display = 'block';
            setDateDisplay.textContent = formatDate(budgetDate);
            setTimeout(() => {
                budgetSetMessage.style.display = 'none';
            }, 3000);
            updateDisplayForDate(budgetDate);
            dailyBudgetInput.value = '';
        } else {
            alert('Please select a date and enter a valid budget amount.');
        }
    });

    addExpenseBtn.addEventListener('click', () => {
        const description = expenseDescriptionInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (description && !isNaN(amount) && amount > 0) {
            expenses.push({ date: currentDate, description, amount });
            renderExpenses();
            updateBudgetDisplay(currentDate);
            expenseDescriptionInput.value = '';
            expenseAmountInput.value = '';
        } else {
            alert('Please enter a valid expense description and amount.');
        }
    });

    budgetDateInput.addEventListener('change', () => {
        updateDisplayForDate(budgetDateInput.value);
    });

    // Initial render
    renderExpenses();
    updateBudgetDisplay(currentDate);
});