document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const screens = document.querySelectorAll('.screen');

    // Function to hide all screens
    function hideAllScreens() {
        screens.forEach(screen => screen.classList.remove('active'));
    }

    // Function to show a specific screen
    function showScreen(id) {
        const screenToShow = document.getElementById(id);
        if (screenToShow) {
            hideAllScreens();
            screenToShow.classList.add('active');
        }
    }

    // Navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showScreen(targetId);
        });
    });

    // Initially show the dashboard
    showScreen('dashboard');

    // --- Functionality (Needs more implementation) ---

    // Function 1: Enter Budget Manually and Track
    const aprilBudgetElement = document.getElementById('april-budget');
    const aprilExpendedElement = document.getElementById('april-expended');
    const aprilTotalBudgetElement = document.getElementById('april-total-budget');
    const aprilTotalExpendedElement = document.getElementById('april-total-expended');
    const expendedBar = document.querySelector('.expended-bar');
    const remainingBar = document.querySelector('.remaining-bar');

    // Example data (replace with actual data fetching/storage)
    const aprilBudget = 100;
    const aprilExpended = 50;
    aprilBudgetElement.textContent = `${aprilBudget} USD`;
    aprilExpendedElement.textContent = `${aprilExpended} USD`;
    aprilTotalBudgetElement.textContent = `${aprilBudget}`;
    aprilTotalExpendedElement.textContent = `${aprilExpended}`;

    const expendedPercentage = (aprilExpended / aprilBudget) * 100;
    const remainingPercentage = 100 - expendedPercentage;
    expendedBar.style.width = `${expendedPercentage}%`;
    remainingBar.style.width = `${remainingPercentage}%`;

    // Function 2: Set Budget Goal
    const setBudgetBtn = document.getElementById('set-budget-btn');
    const budgetTypeSelect = document.getElementById('budget-type');
    const budgetAmountInput = document.getElementById('budget-amount');
    const budgetMessageDiv = document.getElementById('budget-message');

    setBudgetBtn.addEventListener('click', function() {
        const type = budgetTypeSelect.value;
        const amount = parseFloat(budgetAmountInput.value);

        if (isNaN(amount) || amount <= 0) {
            budgetMessageDiv.textContent = 'Please enter a valid budget amount.';
            budgetMessageDiv.style.color = 'red';
            return;
        }

        // In a real app, you would store this budget goal
        budgetMessageDiv.textContent = `Budget of ${amount} USD set for ${type}.`;
        budgetMessageDiv.style.color = 'green';
        budgetAmountInput.value = ''; // Clear input
    });

    // Function 3: Track Saving Progress
    const thisMonthSavedElement = document.getElementById('this-month-saved');
    const totalSavedElement = document.getElementById('total-saved');

    // Example data (replace with actual data fetching/storage)
    const thisMonthSavings = 20;
    const totalSavings = 150;
    thisMonthSavedElement.textContent = `${thisMonthSavings} USD`;
    totalSavedElement.textContent = `${totalSavings} USD`;

    // Update dashboard values (example)
    document.getElementById('march-budget').textContent = '80 USD';
    document.getElementById('march-expended').textContent = '60 USD';
    document.getElementById('may-budget').textContent = '120 USD';
    document.getElementById('may-expended').textContent = '75 USD';
    document.getElementById('today-left').textContent = '15 USD';
    document.getElementById('week-left').textContent = '60 USD';
});