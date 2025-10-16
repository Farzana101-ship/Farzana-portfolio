document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return; // page doesn't have a contact form (e.g. project pages)

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const messageBox = document.getElementById("message").value;

    const thankYou = document.getElementById("thankYouMessage");
    if (thankYou) thankYou.textContent = `Thanks for reaching out, ${name}! I'll get back to you soon.`;

    this.reset();
  });
});

