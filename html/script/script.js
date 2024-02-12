// Funktion för att öppna och stänga sidomenyn
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
    var menuBtn = document.querySelector(".menu-btn");
    if (sidebar.classList.contains("active")) {
        menuBtn.textContent = "Stäng";
    } else {
        menuBtn.textContent = "Meny";
    }
}

// Get the element to animate
const mainContent = document.querySelector(".main-content");

// Define the options for the Intersection Observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

// Create a new Intersection Observer
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    // If element is in viewport, add the 'show' class to trigger the animation
    if (entry.isIntersecting) {
      element.classList.add('show');
    }
    else {
      element.classList.remove('show');
    }
  });
}, options);
// Start observing the element
observer.observe(element);
