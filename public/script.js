async function deleteTransaction(id) {
    try {
        await fetch(`/transactions/${id}`, { method: 'DELETE' });
        fetchTransactions();
    } catch (error) {
        console.error('Error deleting transaction:', error);
    }
}
async function fetchTransactions() {
    try {
        const response = await fetch('/transactions');
        const transactions = await response.json();

        updateTotal(transactions);
        renderList(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}
const list = document.getElementById('transactionList');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

function updateTotal(transactions) {
    const incomeTotal = transactions
        .filter((trx) => trx.type === 'income')
        .reduce((total, trx) => total + trx.amount, 0);

    const expenseTotal = transactions
        .filter((trx) => trx.type === 'expense')
        .reduce((total, trx) => total + trx.amount, 0);

    const balanceTotal = incomeTotal - expenseTotal;

    balance.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'always',
    }).format(balanceTotal).substring(1);

    income.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(incomeTotal);

    expense.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(expenseTotal * -1);
}

function renderList(transactions) {
    list.innerHTML = '';

    if (transactions.length === 0) {
        const status = document.getElementById('status');
        status.textContent = 'No transactions.';
        return;
    }

    transactions.forEach(({ _id, name, amount, date, type }) => {
        const sign = type === 'income' ? 1 : -1;

        const li = document.createElement('li');

        li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount ${type}">
        <span>${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount * sign)}</span>
      </div>

      <div class="action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction('${_id}')">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;

        list.appendChild(li);
    });
}
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('transactionForm');

    // Fetch transactions from the server


    form.addEventListener('submit', addTransaction);





    async function addTransaction(e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    amount: parseFloat(formData.get('amount')),
                    date: formData.get('date'),
                    type: formData.get('type') === 'on' ? 'income' : 'expense',
                }),
            });

            const newTransaction = await response.json();
            fetchTransactions();
            form.reset();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    }

    // Initial fetch when the page loads
    fetchTransactions();
});
