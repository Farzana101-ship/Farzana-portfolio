document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loanForm");
  const resultBox = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const resultIcon = document.getElementById("resultIcon");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ [NEW] Get inputs separately for validation
    const nameInput = document.getElementById("name");
    const amountInput = document.getElementById("amount");
    const incomeInput = document.getElementById("income");
    const creditScoreInput = document.getElementById("creditScore");

    // ✅ [NEW] Trim and parse values
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const income = parseFloat(incomeInput.value);
    const creditScore = parseInt(creditScoreInput.value);

    // ✅ [NEW] Reset previous error highlights
    [nameInput, amountInput, incomeInput, creditScoreInput].forEach(input => {
      input.classList.remove("error");
    });

    // ✅ [NEW] Validation for required fields
    let isValid = true;
    if (name === "") {
      nameInput.classList.add("error");
      isValid = false;
    }
    if (isNaN(amount) || amount <= 0) {
      amountInput.classList.add("error");
      isValid = false;
    }
    if (isNaN(creditScore) || creditScore <= 0) {
      creditScoreInput.classList.add("error");
      isValid = false;
    }

    // ✅ [NEW] Stop submission if invalid
    if (!isValid) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    // --- Existing loan approval logic below ---
    let status = "Loan Denied";
    let iconClass = "fa-circle-xmark";
    let boxClass = "denied";

    if (income >= amount * 2 && creditScore >= 700) {
      status = "Loan Approved";
      iconClass = "fa-circle-check";
      boxClass = "approved";
    }

    resultText.textContent = status;
    resultIcon.className = `fa-solid ${iconClass}`;
    resultBox.className = `${boxClass} show`;

    setTimeout(() => {
      resultBox.style.opacity = "0"; // Start fading out

      // ✅ Wait for transition to complete before fully hiding
      setTimeout(() => {
        resultBox.classList.remove("show", "approved", "denied");
        resultBox.style.opacity = ""; // Reset inline style
        resultText.textContent = "";
        resultIcon.className = "";
      }, 500); // Match CSS transition duration (0.5s)
    }, 3000);

    // ✅ [CHANGED] Use the validated variables instead of direct DOM access
    const application = {
      name,
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
    renderHistory();
  });
});
