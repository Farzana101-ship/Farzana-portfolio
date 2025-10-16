document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loanForm");
  const resultBox = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const resultIcon = document.getElementById("resultIcon");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const income = parseFloat(document.getElementById("income").value);
    const creditScore = parseInt(document.getElementById("creditScore").value);

    let status = "Loan Denied";
    let iconClass = "fa-circle-xmark";
    let boxClass = "denied";

 if (income >= amount * 2 && creditScore >= 7) {
  status = "Loan Approved";
  iconClass = "fa-circle-check";
  boxClass = "approved";
} else {
  status = "Loan Denied";
  iconClass = "fa-circle-xmark";
  boxClass = "denied";
}

resultText.textContent = status;
resultIcon.className = `fa-solid ${iconClass}`;
resultBox.className = `${boxClass} show`;


    const application = {
  name: document.getElementById("name").value,
  amount,
  income,
  creditScore,
  status
};


    let history = JSON.parse(localStorage.getItem("loanHistory")) || [];
    history.push(application);
    localStorage.setItem("loanHistory", JSON.stringify(history));
    renderHistory();
  });

  function renderHistory() {
    const history = JSON.parse(localStorage.getItem("loanHistory")) || [];
    const tbody = document.querySelector("#historyTable tbody");
    tbody.innerHTML = "";

    history.forEach(app => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${app.name}</td>
        <td>${app.amount}</td>
        <td>${app.income}</td>
        <td>${app.creditScore}</td>
        <td>${app.status}</td>
      `;
      tbody.appendChild(row);
    });
  }

  renderHistory();
     document.getElementById("clearHistory").addEventListener("click", function () {
  localStorage.removeItem("loanHistory");
  renderHistory(); // refresh the table
});
});
