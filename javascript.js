// ========================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// ========================================
window.addEventListener("load", function () {
    document.querySelector(".preloader").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  // Preloader
  const preloader = document.querySelector(".preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  });

  // Custom Cursor (Desktop only)
  if (window.matchMedia("(pointer: fine)").matches) {
    initCustomCursor();
  }

  // Navigation
  initNavigation();

  // Theme Toggle
  initThemeToggle();

  // Skills Animation
  initSkillsAnimation();

  // Portfolio Filter
  initPortfolioFilter();

  // Testimonials Slider
  initTestimonialsSlider();

  // Contact Form
  initContactForm();

  // Smooth Scroll
  initSmoothScroll();

  // Back to Top
  initBackToTop();

  // Counter Animation
  initCounterAnimation();
});

// ========================================
// CUSTOM CURSOR
// ========================================
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  function animate() {
    // Cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    // Follower follows with delay
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animate);
  }
  animate();

  // Hover effects
  const interactiveElements = document.querySelectorAll(
    "a, button, .portfolio-card, .service-card",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      follower.style.transform = "translate(-50%, -50%) scale(1.5)";
      follower.style.borderColor = "var(--secondary)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.borderColor = "var(--primary)";
    });
  });
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// ========================================
// THEME TOGGLE
// ========================================
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const icon = themeToggle.querySelector("i");

  // Check saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
}

// ========================================
// SKILLS ANIMATION
// ========================================
function initSkillsAnimation() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
        }
      });
    },
    { threshold: 0.5 },
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// ========================================
// PORTFOLIO FILTER
// ========================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      // Filter items
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.classList.remove("hidden");
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.classList.add("hidden");
          }, 300);
        }
      });
    });
  });
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================
function initTestimonialsSlider() {
  const track = document.querySelector(".testimonials-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const dotsContainer = document.querySelector(".testimonials-dots");

  let currentIndex = 0;
  const totalCards = cards.length;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-play
  let autoplay = setInterval(nextSlide, 5000);

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(autoplay));
  track.addEventListener("mouseleave", () => {
    autoplay = setInterval(nextSlide, 5000);
  });

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  });
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector(".btn-submit");
  const formWrapper = document.querySelector(".contact-form-wrapper");
  const successMessage = document.querySelector(".form-success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message
    form.style.display = "none";
    successMessage.classList.add("active");

    // Reset button
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    // Reset form after delay
    setTimeout(() => {
      form.reset();
    }, 500);
  });
}

function resetForm() {
  const form = document.getElementById("contactForm");
  const successMessage = document.querySelector(".form-success");

  successMessage.classList.remove("active");
  form.style.display = "block";
  form.style.animation = "fadeIn 0.5s ease";
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-target"));
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + "+";
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  }
}

// ========================================
// ADDITIONAL UTILITIES
// ========================================

// Parallax effect for hero orbs
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    const speed = 0.5 + index * 0.2;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Reveal animations on scroll
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => revealObserver.observe(el));
