// Wait for the DOM to load before running Javascript
document.addEventListener('DOMContentLoaded', function () {

    // Get the calculate budget button and add a click event listener
    const calculateBudgetBtn = document.getElementById('calculate-budget-btn');
    calculateBudgetBtn.addEventListener('click', calculateBudget);

    //Hide modal overlay when the user clicks 'close' button
    document.querySelector('#modal-close-btn').addEventListener('click', function () {
        document.querySelector('#modal-overlay').classList.add('hidden');
    });

    // Calculate the budget and display it on the page
    function calculateBudget() {
        // Get the name value
        const name = document.querySelector('#name').value;
        if (name === '') {
            // Show modal warning if the name input is empty
            document.querySelector('#modal-message').textContent = `Please enter your name!`;
            document.querySelector('#modal-overlay').classList.remove('hidden');
        } else {
            // Make the income input mandatory
            const incomeInputs = document.querySelectorAll('.income-item input[type="number"]');
            let totalIncomes = 0;
            for (let i = 0; i < incomeInputs.length; i++) {
                // Make the expense input mandatory
                if (incomeInputs[i].value <= 0) {
                    document.querySelector('#modal-message').textContent = 'Please enter a valid amount for all income using positive numbers';
                    document.querySelector('#modal-overlay').classList.remove('hidden');
                    return;
                }
                totalIncomes += parseInt(incomeInputs[i].value);
            }
            const expenseInputs = document.querySelectorAll('.expense-item input[type="number"]');
            let totalExpenses = 0;
            for (let i = 0; i < expenseInputs.length; i++) {
                // Make the expense input mandatory
                if (expenseInputs[i].value <= 0) {
                    document.querySelector('#modal-message').textContent = 'Please enter a valid amount for all expenses using positive numbers';
                    document.querySelector('#modal-overlay').classList.remove('hidden');
                    return;
                }
                totalExpenses += parseInt(expenseInputs[i].value);
            }
            const currency = document.getElementById('currency').value;
            const budget = totalIncomes - totalExpenses;
            document.getElementById('budget').innerHTML = `Budget: ${budget} ${currency}s`;
            document.getElementById('total-expenses').innerHTML = `Total expenses: ${totalExpenses} ${currency}s`;
            document.getElementById('total-income').innerHTML = `Total income: ${totalIncomes} ${currency}s`;
        }
    }

    // Get the add expense button and add a click event listener
    const addExpenseBtn = document.getElementById('add-expense-btn');
    addExpenseBtn.addEventListener('click', addExpense);

    // Add a new expense item to the expense container
    function addExpense() {
        const expenseContainer = document.getElementById('expense-container');
        const newExpenseItem = document.createElement('div');
        newExpenseItem.classList.add('expense-item');
        // Set the inner HTML of the new expense item
        newExpenseItem.innerHTML = `
          <input type="text" placeholder="Expense name">
          <input type="number" placeholder="Expense amount" class="expense">
          <button type="button" class="remove-expense-btn">Remove</button>`;
        // Add a click event listener to the remove button
        newExpenseItem.querySelector('.remove-expense-btn').addEventListener('click', removeExpense);
        // Append the new expense item to the expense container
        expenseContainer.appendChild(newExpenseItem);
    }

    // Remove an expense item
    function removeExpense(event) {
        const expenseItem = event.target.parentElement;
        expenseItem.remove();
    }

    // Get the add income button and add a click event listener
    const addIncomeBtn = document.getElementById('add-income-btn');
    addIncomeBtn.addEventListener('click', addIncome);

    // Add a new income item to the income container
    function addIncome() {
        const incomeContainer = document.getElementById('income-container');
        const newIncomeItem = document.createElement('div');
        newIncomeItem.classList.add('income-item');
        // Set the inner HTML of the new income item
        newIncomeItem.innerHTML = `
          <input type="text" placeholder="Income name" required>
          <input type="number" placeholder="Income amount" class="income" required>
          <button type="button" class="remove-income-btn">Remove</button>
        `;
        // Add a click event listener to the remove button
        newIncomeItem.querySelector('.remove-income-btn').addEventListener('click', removeIncome);
        // Append the new income item to the income container
        incomeContainer.appendChild(newIncomeItem);
    }

    // Remove an income item
    function removeIncome(event) {
        const incomeItem = event.target.parentElement;
        incomeItem.remove();
    }

    // Add a click event listener to the reset form button
    const resetFormBtn = document.getElementById('reset-form-btn');
    resetFormBtn.addEventListener('click', resetForm);

    // Reset the form, set the currency back to default (Euro)
    function resetForm() {
        document.querySelector('#total-income').textContent = '';
        document.getElementById('currency').value = 'Euro';
        document.querySelector('#total-expenses').textContent = '';
        document.getElementById('name').value = '';
        document.querySelector('h1').textContent = 'Budget Calculator';
        // Clear inputs of all income
        const incomeInputs = document.querySelectorAll('.income-item input[type="text"], .income-item input[type="number"]');
        for (let i = 0; i < incomeInputs.length; i++) {
            incomeInputs[i].value = '';
        }
        // Clear inputs of all expenses
        const expenseInputs = document.querySelectorAll('.expense-item input[type="text"], .expense-item input[type="number"]');
        for (let i = 0; i < expenseInputs.length; i++) {
            expenseInputs[i].value = '';
        }
        // Remove all income fields except the first one
        const incomeFields = document.querySelectorAll('.income-item');

        incomeFields.forEach(function (field, index) {
            if (index !== 0) {
                field.remove();
            }
        });

        // Remove all expense fields except the first one
        const expenseFields = document.querySelectorAll('.expense-item');
        expenseFields.forEach(function (field, index) {
            if (index !== 0) {
                field.remove();
            }
        });
        //Clear the budget and add new and empty expense/income item
        document.getElementById('budget').innerHTML = '';
    }

    // Prevent the user to accidentally input the letter 'e' as the income/expense value
    document.getElementById('income-container').addEventListener('keydown', function (event) {
        if (event.target.classList.contains('income') && event.key === 'e') {
            event.preventDefault();
        }
    });
    document.getElementById('expense-container').addEventListener('keydown', function (event) {
        if (event.target.classList.contains('expense') && event.key === 'e') {
            event.preventDefault();
        }
    });

    // Add a submit event listener to the name form
    document.querySelector('#name-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Get the name value and show a welcome message in the modal
        const name = document.querySelector('#name').value;
        document.querySelector('#modal-message').textContent = `Welcome, ${name}!`;
        document.querySelector('#modal-overlay').classList.remove('hidden');
        // Insert the name into the title of the page
        document.querySelector('h1').textContent = `${name}'s Budget Calculator`;
    });

    // Get the element to display the date and time
    const dateTimeDisplay = document.getElementById('date-time-display');

    // Update the date and time display
    function updateDateTime() {
        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString('en-US', {
            hour12: false
        });
        const day = currentDate.getDate();
        // month index starts at 0, so we need to add 1 to get the correct month number
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        // Set the text content of the date and time display element
        dateTimeDisplay.textContent = `${day}/${month}/${year} ${currentTime}`;
    }

    // Update the date and time display every second
    setInterval(updateDateTime, 1000);

    // Update the date and time display initially
    updateDateTime();

    // Add a click event listener to the print button
    document.querySelector('#print-btn').addEventListener('click', function () {
        // Print the current page
        window.print();
    });

    // Add a submit event listener to the about text
    document.querySelector('#about').addEventListener('click', function (event) {
        event.preventDefault();
        // Show the message in the opened modal
        document.querySelector('#modal-message').innerHTML =
            `<div id=modal-about-text><h3>Welcome to your personal budget calculator!</h3>
        <h4>Made with passion and out of necessity to clearly see how the income and expenses affect the final budget.</h4>
        <ul>
            <li>You can use it to add multiple incomes and expenses and get the final calculation on your leftover budget.</li>
            <li>The income/expense names are not required if you need a quick calculation.</li>
            <li>The income/expense values are mandatory however, the calculator will not work unless at least one input is entered,
            and it has to be a positive number value.</li>
            <li>When you enter your name the calculator becomes personalized and it is easy to make a reference to the person that used it, it is also required.</li>
            <li>When you are done, there is a handy print button with the current date and time so you can print the results for accounting/bookkeeping.</li>
        </ul>
        <h4>Enjoy using the calculator, hope there is a lot left over in the budget when you're done!</h4>
        </div>`;
        document.querySelector('#modal-overlay').classList.remove('hidden');
    });

});