document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const messageBox = document.getElementById("message").value;

    // Send data to Formspree
    fetch("https://formspree.io/f/xyznvpol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: messageBox
      })
    })
    .then(response => {
      if (response.ok) {
        const thankYou = document.getElementById("thankYouMessage");
        if (thankYou) {
          thankYou.textContent = `Thanks for reaching out, ${name}! I'll get back to you soon.`;
          thankYou.style.color = "green";
        }
        contactForm.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please check your connection.");
    });
  });
});

