// Wait for the DOM to finish loading before running script
var expenseRowTemplate;

function OnAddExpenseClicked() {
    var newElement = document.createElement("div");
    newElement.innerHTML = expenseRowTemplate;
    newElement.classList.add("expense-row");

    document.querySelector("#expenses").appendChild(newElement);

    UpdateAddExpenseBtnEvent();
    UpdateRemoveExpenseClicked();
}

function UpdateAddExpenseBtnEvent() {
    document.querySelectorAll(".add-expense").forEach(function(button) {
        button.onclick = function () {OnAddExpenseClicked()};
    });
}

function OnRemoveExpenseClicked(button) {
    button.parentElement.remove();
}

function UpdateRemoveExpenseClicked() {
    document.querySelectorAll(".remove-expense").forEach(function(button) {
        button.onclick = function () {OnRemoveExpenseClicked(button)};
    });
}

function CalculateExpenses() {
    var Amount = 0;
    document.querySelectorAll(".transaction-amount-input").forEach(function(total) {
        Amount += Number(total.value);
    });

    var IncomeAmount = Number(document.querySelector(".income").value); 
    var TotalRemaining = IncomeAmount - Amount;

    document.querySelector("#total-expense-amount").innerHTML = "Total Expense: £" + Amount;
    document.querySelector("#total-remaining").innerHTML = "Total Remaining: £" + TotalRemaining;
}

document.addEventListener("DOMContentLoaded", function() {
    expenseRowTemplate = document.querySelector(".expense-row").innerHTML;
    UpdateAddExpenseBtnEvent();
    UpdateRemoveExpenseClicked();
});