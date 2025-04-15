document.addEventListener('DOMContentLoaded', () => {
    const balanceChartCanvas = document.getElementById('balance-chart');
    const spendingChartCanvas = document.getElementById('spending-chart');

    if (balanceChartCanvas) {
        renderBalanceChart(balanceChartCanvas);
    }

    if (spendingChartCanvas) {
        renderSpendingChart(spendingChartCanvas);
    }

    function renderBalanceChart(canvas) {
        const ctx = canvas.getContext('2d');
        const spending = 500.75;
        const saving = 2500.20;
        const total = spending + saving;

        const data = [spending, saving];
        const labels = ['Spending', 'Saving'];
        const colors = ['#007bff', '#28a745'];

        let startAngle = 0;
        for (let i = 0; i < data.length; i++) {
            const sliceAngle = 2 * Math.PI * (data[i] / total);
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 3, startAngle, startAngle + sliceAngle);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fillStyle = colors[i];
            ctx.fill();
            startAngle += sliceAngle;
        }

        // Add labels
        const legendX = canvas.width / 2 + Math.min(canvas.width, canvas.height) / 2 * 0.6;
        let legendY = canvas.height / 2 - labels.length * 15 / 2;
        for (let i = 0; i < labels.length; i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(legendX, legendY, 10, 10);
            ctx.fillStyle = '#333';
            ctx.font = '10px sans-serif';
            ctx.fillText(labels[i], legendX + 15, legendY + 10);
            legendY += 15;
        }
    }

    function renderSpendingChart(canvas) {
        const ctx = canvas.getContext('2d');
        // Prototype spending data for the last 7 days
        const spendingData = [50, 75, 30, 100, 60, 85, 40];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        const barWidth = 30;
        const startX = 50;
        const maxY = Math.max(...spendingData);
        const scaleFactor = canvas.height - 50;

        ctx.fillStyle = '#007bff';
        for (let i = 0; i < spendingData.length; i++) {
            const barHeight = (spendingData[i] / maxY) * scaleFactor;
            const x = startX + i * (barWidth + 20);
            const y = canvas.height - barHeight - 20;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Add day labels
            ctx.fillStyle = '#333';
            ctx.font = '10px sans-serif';
            ctx.fillText(days[i], x + barWidth / 2 - 10, canvas.height - 5);

            // Add value labels (optional)
            // ctx.fillText(`$${spendingData[i]}`, x + barWidth / 2 - 15, y - 5);
        }

        // Add axis labels (optional)
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.fillText('Amount ($)', 10, 30);
        ctx.fillText('Day', canvas.width / 2 - 15, canvas.height - 15);
    }
});