document.addEventListener('DOMContentLoaded', function() {
    const accountButtons = document.querySelectorAll('.account-buttons button');
    accountButtons.forEach(button => {
        button.addEventListener('click', function() {
            accountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const addBudgetHeaderButtons = document.querySelectorAll('.add-budget-header button');
    addBudgetHeaderButtons.forEach(button => {
        button.addEventListener('click', function() {
            addBudgetHeaderButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day.selected').forEach(selectedDay => selectedDay.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Example of how you might switch between sections (basic navigation)
    const dashboardSection = document.querySelector('.dashboard-container');
    const budgetSection = document.querySelector('.budget-container');
    const addBudgetSection = document.querySelector('.add-budget-container');

    // You would typically have navigation elements (e.g., buttons in a header/sidebar)
    // to trigger these functions.

    function showDashboard() {
        dashboardSection.style.display = 'grid';
        budgetSection.style.display = 'none';
        addBudgetSection.style.display = 'none';
    }

    function showBudget() {
        dashboardSection.style.display = 'none';
        budgetSection.style.display = 'block';
        addBudgetSection.style.display = 'none';
    }

    function showAddBudget() {
        dashboardSection.style.display = 'none';
        budgetSection.style.display = 'none';
        addBudgetSection.style.display = 'block';
    }

    // You'd need to add event listeners to your navigation elements
    // For example:
    // document.querySelector('.nav-dashboard-button').addEventListener('click', showDashboard);
    // document.querySelector('.nav-budget-button').addEventListener('click', showBudget);
    // document.querySelector('.nav-add-budget-button').addEventListener('click', showAddBudget);

    // Initially show the dashboard
    showDashboard();
});