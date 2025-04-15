document.addEventListener('DOMContentLoaded', () => {
    const goalNameInput = document.getElementById('goal-name');
    const targetAmountInput = document.getElementById('target-amount');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalsList = document.getElementById('goals');
    const noGoalsMessage = document.getElementById('no-goals');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');

    let savingGoals = [
        
        { name: 'New Laptop', target: 1500, saved: 750 }
        // More goals can be added here in a real app (potentially from local storage)
    ];

    function renderGoals() {
        goalsList.innerHTML = '';
        if (savingGoals.length === 0) {
            noGoalsMessage.style.display = 'block';
        } else {
            noGoalsMessage.style.display = 'none';
            savingGoals.forEach(goal => {
                const listItem = document.createElement('li');
                listItem.classList.add('goal-item');
                const progress = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
                listItem.innerHTML = `
                    <span>${goal.name}</span>
                    <span>Target: $${goal.target.toFixed(2)}</span>
                    <span>Saved: $${goal.saved.toFixed(2)}</span>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${Math.min(progress, 100)}%;"></div>
                    </div>
                `;
                goalsList.appendChild(listItem);
            });
        }
    }

    addGoalBtn.addEventListener('click', () => {
        const name = goalNameInput.value.trim();
        const target = parseFloat(targetAmountInput.value);

        if (name && !isNaN(target) && target > 0) {
            savingGoals.push({ name: name, target: target, saved: 0 }); // Initially saved is 0
            renderGoals();
            goalNameInput.value = '';
            targetAmountInput.value = '';
        } else {
            alert('Please enter a valid goal name and target amount.');
        }
    });

    backToDashboardBtn.addEventListener('click', () => {
        // Navigate back to the dashboard (index.html)
        window.location.href = 'index.html';
    });

    renderGoals(); // Initial rendering of goals
});