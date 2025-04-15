document.addEventListener('DOMContentLoaded', () => {
    const spendingBalanceDisplay = document.getElementById('spending-balance');
    const savingBalanceDisplay = document.getElementById('saving-balance');
    const totalBalanceDisplay = document.getElementById('total-balance');
    const goToBudgetBtn = document.getElementById('go-to-budget-btn');
    const goToSavingGoalsBtn = document.getElementById('go-to-saving-goals-btn'); // Get the new button

    // Hardcoded account balances for the prototype
    const spendingBalance = 500.75;
    const savingBalance = 2500.20;
    const totalBalance = spendingBalance + savingBalance;

    // Update the display with the hardcoded values
    spendingBalanceDisplay.textContent = `$${spendingBalance.toFixed(2)}`;
    savingBalanceDisplay.textContent = `$${savingBalance.toFixed(2)}`;
    totalBalanceDisplay.textContent = `$${totalBalance.toFixed(2)}`;

    // Event listener for the "Go to Daily Budget" button
    goToBudgetBtn.addEventListener('click', () => {
        window.location.href = 'budget.html';
    });

    // Event listener for the "Go to Saving Goals" button
    if (goToSavingGoalsBtn) {
        goToSavingGoalsBtn.addEventListener('click', () => {
            window.location.href = 'saving_goals.html';
        });
    }
});