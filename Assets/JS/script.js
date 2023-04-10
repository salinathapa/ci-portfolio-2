// Wait for the DOM to finish loading before running script
var expenseRowTemplate;

function OnAddExpenseClicked() {
    var newElement = document.createElement("div");
    newElement.innerHTML = expenseRowTemplate;
    newElement.classList.add("expense-row");

    document.querySelector("#expenses").appendChild(newElement);

    UpdateAddExpenseBtnEvent();
}

function UpdateAddExpenseBtnEvent() {
    document.querySelectorAll(".add-expense").forEach(function(el) {
        el.onclick = function () {OnAddExpenseClicked()};
    });
}

document.addEventListener("DOMContentLoaded", function() {
    expenseRowTemplate = document.querySelector(".expense-row").innerHTML;
    UpdateAddExpenseBtnEvent();
});