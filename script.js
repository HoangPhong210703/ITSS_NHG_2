document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function changeTab(tabName) {
        tabLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedContent = document.getElementById(tabName);

        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
        }
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;
            changeTab(tab);
        });
    });

    changeTab('transactions'); // Show the first tab by default

    // --- Add Transaction ---
    const addTransactionButton = document.getElementById('add-transaction');
    const incomeInput = document.getElementById('income');
    const expenseInput = document.getElementById('expense');
    const transactionList = document.querySelector('.transaction-list');
    const expenseList = document.querySelector('.expense-list');

    addTransactionButton.addEventListener('click', () => {
        const incomeValue = parseFloat(incomeInput.value);
        const expenseValue = parseFloat(expenseInput.value);

        if (!isNaN(incomeValue) && incomeValue > 0) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>Income: ${incomeValue} €</span><span>Cash</span>`;
            transactionList.appendChild(listItem);
            incomeInput.value = '';
        }

        if (!isNaN(expenseValue) && expenseValue > 0) {
             const listItem = document.createElement('li');
            listItem.innerHTML = `<span>Expense: ${expenseValue} €</span><span>Cash</span>`;
            expenseList.appendChild(listItem);
            expenseInput.value = '';
        }
    });

    // --- Calendar ---
    const calendarEl = document.getElementById('calendar');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');

    const monthNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    function createCalendar(month, year) {
        calendarEl.innerHTML = ''; // Clear previous calendar
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add headers for days of the week
        for (let dayName of monthNames) {
            const headerCell = document.createElement('div');
            headerCell.classList.add('header');
            headerCell.textContent = dayName;
            calendarEl.appendChild(headerCell);
        }

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarEl.appendChild(document.createElement('div'));
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            calendarEl.appendChild(dayCell);
        }
    }
    const initialMonth = parseInt(monthSelect.value);
    const initialYear = parseInt(yearSelect.value);
    createCalendar(initialMonth, initialYear);

    monthSelect.addEventListener('change', () => {
        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);
        createCalendar(selectedMonth, selectedYear);
    });

    yearSelect.addEventListener('change', () => {
        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);
        createCalendar(selectedMonth, selectedYear);
    });
});