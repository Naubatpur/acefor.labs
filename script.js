// Show WhatsApp widget on scroll
window.addEventListener("scroll", () => {
    const widget = document.getElementById("whatsapp-widget");
    if (window.scrollY > 100) {
        widget.style.bottom = "20px";
        widget.style.opacity = "1";
    } else {
        widget.style.bottom = "-80px";
        widget.style.opacity = "0";
    }
});

// Dark/light toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    document.getElementById("theme-toggle").textContent = next === "light" ? "Dark Mode" : "Light Mode";
});

// Mobile menu toggle
document.querySelector(".hamburger").addEventListener("click", () => {
    document.getElementById("mobile-menu").classList.toggle("show");
});

// Contact Form Handler
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
    })
    .then((response) => {
        if (response.ok) {
            form.reset();
            status.textContent = "✅ Message sent successfully!";
            status.classList.remove("text-red-600");
            status.classList.add("text-green-600");
        } else {
            return response.json().then((data) => {
                throw new Error(data.message || "Something went wrong.");
            });
        }
    })
    .catch((error) => {
        status.textContent = "❌ Error: " + error.message;
        status.classList.remove("text-green-600");
        status.classList.add("text-red-600");
    })
    .finally(() => {
        status.style.display = "block";
        // A slight improvement: hide the status message after a few seconds
        setTimeout(() => {
            status.style.display = "none";
        }, 5000); // Hides after 5 seconds
    });
});

document.addEventListener('copy', (event) => {
    const selectedText = window.getSelection().toString();

    const customMessage = `Don't copy the code buddy contact us and we will provide you the custom code \n\n------------------------------\nThis content was copied from Acefor.Labs.\nRead more at: ${document.location.href}`;

    const fullText = selectedText + customMessage;

    event.clipboardData.setData('text/plain', fullText);
    
    event.preventDefault();
});
// Prevent right-click context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
}); 
// Prevent text selection
document.addEventListener('selectstart', (event) => {
    event.preventDefault();
});
// Prevent drag and drop
document.addEventListener('dragstart', (event) => {
    event.preventDefault();
}); 
// Prevent F12 and Ctrl+Shift+I
document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey && event.shiftKey && event.key === 'I') || 
        (event.ctrlKey && event.key === 'U') || 
        (event.key === 'F12')) {
        event.preventDefault();
    }
}); 
// Prevent Ctrl+S
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        alert("Saving is disabled on this page.");
    }
});
// Prevent Ctrl+P
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        alert("Printing is disabled on this page.");
    }
});

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {



  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });
  }

  // --- Discount Card Hover Effect ---
  // This replaces the inline onmouseover/onmouseout attributes
  const discountCard = document.getElementById('discount-card');
  if (discountCard) {
    discountCard.addEventListener('mouseover', () => {
      discountCard.style.transform = 'scale(1.02)';
      discountCard.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    });
    discountCard.addEventListener('mouseout', () => {
      discountCard.style.transform = 'scale(1)';
      discountCard.style.boxShadow = 'none';
    });
  }
  
  // --- WhatsApp Widget Scroll Logic ---
  const widget = document.getElementById("whatsapp-widget");
  if(widget) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            widget.style.bottom = "20px";
            widget.style.opacity = "1";
        } else {
            widget.style.bottom = "-80px";
            widget.style.opacity = "0";
        }
      });
  }

  // --- Contact Form Submission ---
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      status.style.display = "block";
      status.textContent = "Sending...";
      status.classList.remove("text-red-600", "text-green-600");

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      .then(response => {
        if (response.ok) {
          status.textContent = "✅ Message sent successfully!";
          status.classList.add("text-green-600");
          form.reset();
        } else {
          // Try to get error message from the response
          response.json().then(data => {
            status.textContent = `❌ Error: ${data.message || 'Something went wrong.'}`;
            status.classList.add("text-red-600");
          }).catch(() => {
            status.textContent = '❌ An unknown error occurred.';
            status.classList.add("text-red-600");
          });
        }
      })
      .catch(error => {
        status.textContent = `❌ Error: ${error.message}`;
        status.classList.add("text-red-600");
      })
      .finally(() => {
        // Hide the status message after 5 seconds
        setTimeout(() => {
          status.style.display = "none";
        }, 5000);
      });
    });
  }
});
