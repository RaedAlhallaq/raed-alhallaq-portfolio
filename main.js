document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // 1. Scroll Progress Circle in Top Button
  // =====================================
  let scrollCircle = document.querySelector(".scroll-to-top circle");
  let scrollPercentage = document.getElementById("scrollPercentage"); // This element is updated to show '↑'

  function updateScrollCircle() {
    // Calculate the total scrollable height of the document
    let totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    // Get the current vertical scroll position
    let scrollTop = document.documentElement.scrollTop;
    // Calculate the scroll progress as a ratio (0 to 1)
    let progress = totalHeight > 0 ? scrollTop / totalHeight : 0;
    // Calculate the percentage (though not directly used for text, useful for understanding)

    let percentage = Math.round(progress * 100);
    // Calculate the circumference of the circle (2 * π * radius)

    let circleLength = 2 * Math.PI * 26; // 2πr
    // Calculate the stroke-dashoffset to animate the circle

    let offset = circleLength * (1 - progress);
    // Apply the offset to the SVG circle to show scroll progress

    if (scrollCircle) {
      scrollCircle.style.strokeDashoffset = offset;
    }
    // Update the text content of the scroll percentage element to an arrow

    if (scrollPercentage) {
      scrollPercentage.textContent = "↑";
    }
  }
  // Attach the scroll event listener to update the circle
  window.addEventListener("scroll", updateScrollCircle);
  // Call it once on page load to set the initial state
  updateScrollCircle(); // initial

  // ============================
  // 2. Parallax Avatar Effect
  // ============================
  let avatar = document.getElementById("avatar");
  let header = document.querySelector(".home"); // Assuming '.home' is the container for the avatar

  if (avatar && header) {
    // Add mousemove listener to the header for parallax effect
    header.addEventListener("mousemove", (e) => {
      // Calculate x and y translation based on mouse position relative to the viewport
      let x = (e.clientX / window.innerWidth - 0.5) * 10;
      let y = (e.clientY / window.innerHeight - 0.5) * 10;
      // Apply the transformation
      avatar.style.transform = `translate(${x}px, ${y}px)`;
    });
    // Reset avatar position when mouse leaves the header
    header.addEventListener("mouseleave", () => {
      avatar.style.transform = "translate(0, 0)";
    });
    // Add click effect to the avatar (grow briefly)
    avatar.addEventListener("click", () => {
      avatar.classList.add("grow");
      setTimeout(() => avatar.classList.remove("grow"), 300);
    });
  }

  // ============================
  // 3. Typewriter Effect
  // ============================
  /**
   * Implements a typewriter effect on a given HTML element.
   * @param {HTMLElement} element - The DOM element to apply the effect to.
   * @param {string[]} words - An array of words/phrases to type out.
   * @param {number} delay - Delay in milliseconds between typing each character.
   * @param {number} pause - Pause in milliseconds before deleting and typing the next word.
   */
  function typewriter(element, words, delay = 150, pause = 1500) {
    let wordIndex = 0; // Current word being typed
    let charIndex = 0; // Current character in the word
    let typing = true; // Flag to indicate if currently typing or deleting

    function type() {
      if (!element) return; // Ensure the element exists

      if (typing) {
        // Typing phase: add characters one by one
        if (charIndex < words[wordIndex].length) {
          element.textContent += words[wordIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, delay);
        } else {
          // Word fully typed, pause then start deleting
          typing = false;
          setTimeout(type, pause);
        }
      } else {
        // Deleting phase: remove characters one by one
        if (charIndex > 0) {
          element.textContent = words[wordIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(type, delay / 2); // Faster deletion
        } else {
          // Word fully deleted, move to the next word and start typing
          typing = true;
          wordIndex = (wordIndex + 1) % words.length; // Cycle through words
          setTimeout(type, delay);
        }
      }
    }

    type(); // Start the typewriter effect
  }

  // Initialize typewriter effect on the element with ID 'typewriter-job'
  let jobEl = document.getElementById("typewriter-job");
  if (jobEl) {
    typewriter(jobEl, ["Student", "Frontend Developer", "Web Designer"]);
  }

  // ============================
  // 4. Theme Switcher
  // ============================
  let themeToggleBtn = document.getElementById("themeToggle");
  let body = document.body;
  // Retrieve the saved theme from local storage
  let currentTheme = localStorage.getItem("theme");

  if (themeToggleBtn) {
    // Apply saved theme on page load

    if (currentTheme) {
      body.classList.add(currentTheme);
      // Set the correct icon based on the loaded theme
      if (currentTheme === "light-theme") {
        themeToggleBtn.classList.remove("fa-moon");
        themeToggleBtn.classList.add("fa-sun");
      } else {
        themeToggleBtn.classList.remove("fa-sun");
        themeToggleBtn.classList.add("fa-moon");
      }
    } else {
      // If no theme is saved, default to dark theme
      body.classList.add("dark-theme");
      themeToggleBtn.classList.remove("fa-sun");
      themeToggleBtn.classList.add("fa-moon");
    }

    // Add click listener to toggle theme
    themeToggleBtn.addEventListener("click", () => {
      if (body.classList.contains("dark-theme")) {
        // Switch to light theme
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeToggleBtn.classList.remove("fa-moon");
        themeToggleBtn.classList.add("fa-sun");
        localStorage.setItem("theme", "light-theme"); // Save preference
      } else {
        // Switch to dark theme
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeToggleBtn.classList.remove("fa-sun");
        themeToggleBtn.classList.add("fa-moon");
        localStorage.setItem("theme", "dark-theme"); // Save preference
      }
    });
  }

  // ============================
  // 5. Scroll Progress Bar
  // ============================
  let scrollProgressBar = document.getElementById("scrollProgressBar");

  function updateScrollProgress() {
    if (!scrollProgressBar) return; // Exit if progress bar element doesn't exist

    // Calculate total scrollable height
    let totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    // Get current scroll position
    let scrollPosition = document.documentElement.scrollTop;

    // Calculate progress as a percentage
    let progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
    // Set the width of the progress bar
    scrollProgressBar.style.width = progress + "%";
  }

  if (scrollProgressBar) {
    // Attach scroll event listener
    window.addEventListener("scroll", updateScrollProgress);
    // Call it once on load to set initial state
    updateScrollProgress();
  }

  // ==================================================
  // 6. Active Navbar Links & Smooth Scrolling
  // ==================================================
  let sections = document.querySelectorAll("section"); // All content sections
  let navLinks = document.querySelectorAll("header .navbar a"); // All navigation links

  // Smooth Scrolling for Navbar links when clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor jump

      let targetId = this.getAttribute("href"); // Get target section ID from href
      let targetSection = document.querySelector(targetId);

      if (targetSection) {
        let headerHeight = document.querySelector("header").offsetHeight;
        // Calculate scroll offset, accounting for fixed header and progress bar
        let scrollOffset =
          targetSection.offsetTop -
          headerHeight -
          (scrollProgressBar ? scrollProgressBar.offsetHeight : 0);
        // Scroll smoothly to the calculated position
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });

        // Immediately update active class on click for quicker feedback
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Intersection Observer for highlighting active navbar links based on scroll position
  let observerOptions = {
    root: null, // Observe relative to the viewport
    rootMargin: "0px",
    threshold: 0.3, // Section is considered "intersecting" when 30% visible
  };

  let sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // إزالة الكلاس active من جميع الروابط
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add 'active' class to the link corresponding to the intersecting section
        let targetId = entry.target.id;
        let activeLink = document.querySelector(
          `header .navbar a[href="#${targetId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);
  // Observe each section
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // =====================================
  // 7. Scroll To Top Button
  // =====================================
  let scrollToTopBtn = document.querySelector(".scroll-to-top"); // تأكد أن الكلاس هو .scroll-to-top

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // =====================================
  // 8. Skills Section Animation
  // =====================================

  let skillSection = document.getElementById("skills");
  let progressLines = document.querySelectorAll(".progress-line");

  if (skillSection && progressLines.length > 0) {
    let skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the skills section becomes visible
            progressLines.forEach((bar) => {
              bar.style.transform = "scaleX(0)";
              void bar.offsetWidth;
              bar.style.transform = "scaleX(1)";
            });
            // If you want the animation to run only once, uncomment below:
            // observer.unobserve(skillSection);
          } else {
            // If the section exits the viewport, reset bars to 0
            progressLines.forEach((bar) => {
              bar.style.transform = "scaleX(0)";
            });
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    skillObserver.observe(skillSection);
  }

  // =====================================
  // 9. Contact Form Validation and Draft Saving
  // =====================================

  // Get form elements
  let contactForm = document.getElementById("contactForm");
  let fullNameInput = document.getElementById("fullName");
  let emailAddressInput = document.getElementById("emailAddress");
  let messageInput = document.getElementById("message");

  // Get error message spans
  let fullNameError = document.getElementById("fullNameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");
  let charCount = document.getElementById("charCount");

  // Get custom message box elements
  let messageBoxOverlay = document.getElementById("messageBoxOverlay");
  let messageBoxTitle = document.getElementById("messageBoxTitle");
  let messageBoxText = document.getElementById("messageBoxText");
  let messageBoxCloseBtn = document.getElementById("messageBoxCloseBtn");

  // Constants for validation
  let MAX_CHARS = 500;
  let EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // --- Custom Message Box Functions ---
  function showMessageBox(title, message) {
    messageBoxTitle.textContent = title;
    messageBoxText.textContent = message;
    messageBoxOverlay.classList.add("show");
  }

  function hideMessageBox() {
    messageBoxOverlay.classList.remove("show");
  }

  // Close button listener for the custom message box
  if (messageBoxCloseBtn) {
    messageBoxCloseBtn.addEventListener("click", hideMessageBox);
    // Close when clicking outside the message box content
    messageBoxOverlay.addEventListener("click", function (event) {
      if (event.target === messageBoxOverlay) {
        // Close when clicking outside content
        hideMessageBox();
      }
    });
  }

  // Ensure all critical form elements exist before proceeding with form logic
  if (
    contactForm &&
    fullNameInput &&
    emailAddressInput &&
    messageInput &&
    charCount
  ) {
    //  LocalStorage functionality (Save Draft)
    function saveDraft() {
      localStorage.setItem("contactFullName", fullNameInput.value);
      localStorage.setItem("contactEmail", emailAddressInput.value);
      localStorage.setItem("contactMessage", messageInput.value);
    }

    function loadDraft() {
      fullNameInput.value = localStorage.getItem("contactFullName") || "";
      emailAddressInput.value = localStorage.getItem("contactEmail") || "";
      messageInput.value = localStorage.getItem("contactMessage") || "";
      updateCharCount(); // Update char count after loading draft
    }

    loadDraft(); // Load draft on page load

    // Save draft whenever an input changes
    fullNameInput.addEventListener("input", saveDraft);
    emailAddressInput.addEventListener("input", saveDraft);
    messageInput.addEventListener("input", saveDraft);

    //  Character Count for Message
    function updateCharCount() {
      let currentLength = messageInput.value.length;
      charCount.textContent = `${currentLength}/${MAX_CHARS} Characters`;

      if (currentLength > MAX_CHARS) {
        charCount.style.color = "var(--error-color)";
        messageError.textContent = `Message exceeds ${MAX_CHARS} characters.`;
        messageInput.classList.add("invalid");
      } else if (currentLength === 0) {
        charCount.style.color = "var(--char-count-color)";
        messageError.textContent = "Message cannot be empty.";
        messageInput.classList.add("invalid"); // Mark as invalid if empty
      } else {
        charCount.style.color = "var(--char-count-color)";
        messageError.textContent = ""; // Clear error if valid length
        messageInput.classList.remove("invalid"); // Remove invalid class if now valid
      }
    }

    messageInput.addEventListener("input", updateCharCount);
    updateCharCount(); // Initial call to set correct count on load

    // --- Validation Logic Functions ---
    // General validation function (used for fullName and email format)

    function validateInput(
      inputElement,
      errorElement,
      validationFn,
      errorMessage
    ) {
      let value = inputElement.value.trim();
      if (!validationFn(value)) {
        errorElement.textContent = errorMessage;
        inputElement.classList.add("invalid");
        return false;
      } else {
        errorElement.textContent = "";
        inputElement.classList.remove("invalid");
        return true;
      }
    }
    // Specific validation for email format
    function validateEmail(email) {
      return EMAIL_REGEX.test(email);
    }
    // Specific validation for not empty
    function validateNotEmpty(value) {
      return value.length > 0;
    }

    // --- Form Submission Logic ---
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      let isValid = true; // Overall form validity flag

      // Validate Full Name
      isValid =
        validateInput(
          fullNameInput,
          fullNameError,
          validateNotEmpty,
          "Full Name cannot be empty."
        ) && isValid;

      // Validate Email Address
      // First check if it's empty then if it's a valid email format
      let isEmailEmpty = !validateNotEmpty(emailAddressInput.value.trim());
      if (isEmailEmpty) {
        emailError.textContent = "Email Address cannot be empty.";
        emailAddressInput.classList.add("invalid");
        isValid = false;
      } else {
        isValid =
          validateInput(
            emailAddressInput,
            emailError,
            validateEmail,
            "Please enter a valid email address."
          ) && isValid;
      }

      // Validate Message
      let isMessageEmpty = !validateNotEmpty(messageInput.value.trim());
      if (isMessageEmpty) {
        messageError.textContent = "Message cannot be empty.";
        messageInput.classList.add("invalid");
        isValid = false;
      } else if (messageInput.value.length > MAX_CHARS) {
        messageError.textContent = `Message exceeds ${MAX_CHARS} characters.`;
        messageInput.classList.add("invalid");
        isValid = false;
      } else {
        messageError.textContent = "";
        messageInput.classList.remove("invalid");
      }

      if (isValid) {
        showMessageBox("Success!", "Your message has been sent successfully.");
        contactForm.reset();
        // Clear local storage after successful submission
        localStorage.removeItem("contactFullName");
        localStorage.removeItem("contactEmail");
        localStorage.removeItem("contactMessage");
        updateCharCount(); // Reset character count
      } else {
        showMessageBox(
          "Error!",
          "Please fill in all required fields correctly."
        );
      }
    });

    // Add immediate validation feedback on input change for better UX
    fullNameInput.addEventListener("input", () =>
      validateInput(
        fullNameInput,
        fullNameError,
        validateNotEmpty,
        "Full Name cannot be empty."
      )
    );
    emailAddressInput.addEventListener("input", () => {
      let isEmailEmpty = !validateNotEmpty(emailAddressInput.value.trim());
      if (isEmailEmpty) {
        emailError.textContent = "Email Address cannot be empty.";
        emailAddressInput.classList.add("invalid");
      } else {
        validateInput(
          emailAddressInput,
          emailError,
          validateEmail,
          "Please enter a valid email address."
        );
      }
    });
    // Message input validation is primarily handled by updateCharCount and submit listener for real-time feedback
  } else {
    console.error(
      "One or more required DOM elements were not found. Please check your HTML IDs."
    );
  }

  // =====================================
  // 10. Dynamic Year for Footer
  // =====================================

  let currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =====================================
  // 11. Read More / Read Less toggle for bio
  // =====================================
 let readMoreBtn = document.getElementById("readMoreBtn");
  let bioText = document.getElementById("bioText");
  if (readMoreBtn && bioText) {
    // Define full and short bio content
    let fullBio = `Passionate about building and developing comprehensive web applications, from the front-end to the back-end. I thrive on transforming complex ideas into practical and efficient software solutions. I possess extensive experience in database design, developing robust Application Programming Interfaces (APIs), and crafting engaging, interactive user interfaces that ensure a smooth and enjoyable user experience. I constantly stay updated with the latest technologies and best practices to deliver innovative, high-quality solutions that meet business needs and exceed expectations. I continuously seek new challenges and opportunities for learning and growth in the dynamic field of web development.`;

    let shortBio = `Passionate about building and developing comprehensive web applications, from the front-end to the back-end.`;

    let isExpanded = false; // Track current state of the bio

    readMoreBtn.addEventListener("click", () => {
      if (!isExpanded) {
        // Expand the bio
        bioText.innerHTML = ""; // Clear current content
        // Split full bio by sentence and animate each sentence
        fullBio.split(". ").forEach((line, index) => {
          let span = document.createElement("span");
          // Add back the period if it's not the last sentence
          span.textContent =
            line + (index < fullBio.split(". ").length - 1 ? ". " : "");
          span.style.opacity = "0";
          span.style.display = "block"; // Make each sentence a block for animation
          span.style.animation = `fadeIn 1s ease forwards`;
          span.style.animationDelay = `${index * 0.2}s`; // Stagger animation
          bioText.appendChild(span);
        });
        readMoreBtn.textContent = "Read Less";
      } else {
        // Collapse the bio
        bioText.textContent = shortBio;
        readMoreBtn.textContent = "Read More";
      }
      isExpanded = !isExpanded; // Toggle state
    });
  }

  // =====================================
  // 12. Download Resume Button Feedback & File Check
  // =====================================
  let downloadBtn = document.getElementById("downloadResumeBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault();

      let fileUrl = downloadBtn.getAttribute("href"); // Get the file URL
      downloadBtn.textContent = "Downloading..."; // Update button text
      downloadBtn.classList.add("disabled"); // Add disabled styling

      // Attempt to fetch the file to check its existence
      fetch(fileUrl)
        .then((response) => {
          if (!response.ok) {
            // If response is not OK (e.g., 404), throw an error
            throw new Error("Resume file not found.");
          }
          return response.blob(); // Get the file as a blob
        })
        .then((blob) => {
          // Create a temporary URL for the blob
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a"); // Create a temporary anchor element
          a.href = url;
          a.download = "My_Resume.pdf"; // Set desired download filename
          document.body.appendChild(a); // Append to body
          a.click(); // Programmatically click the link to trigger download
          a.remove(); // Remove the temporary link
          window.URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch((error) => {
          // Handle errors (e.g., file not found)
          showMessageBox("Error!", "Resume file could not be found.");
        })
        .finally(() => {
          // Reset button text and state after a delay, regardless of success or failure
          setTimeout(() => {
            downloadBtn.textContent = "Download Resume";
            downloadBtn.classList.remove("disabled");
          }, 1500);
        });
    });
  }

  // =====================================
  // 13. Animate Timeline Items on Scroll
  // =====================================

  let timelineItems = document.querySelectorAll(".timeline-item");

  let timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate"); // Add 'animate' class when visible
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the item is visible
    }
  );
  // Observe each timeline item
  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  // Updates character count for the message and validates it
  function updateCharCount() {
    let currentLength = messageInput.value.length;
    charCount.textContent = `${currentLength}/${MAX_CHARS} Characters`;

    if (currentLength > MAX_CHARS) {
      charCount.style.color = "var(--error-color)"; // Red if too long
      messageError.textContent = `Message exceeds ${MAX_CHARS} characters.`;
      messageInput.classList.add("invalid"); // Add error styling
    } else if (currentLength === 0) {
      charCount.style.color = "var(--char-count-color)";
      messageError.textContent = "Message cannot be empty.";
      messageInput.classList.add("invalid");
    } else {
      charCount.style.color = "var(--char-count-color)";
      messageError.textContent = ""; // Clear errors
      messageInput.classList.remove("invalid"); // Remove error styling
    }
  }

  // Listen for typing in the message input to update count and validate
  messageInput.addEventListener("input", updateCharCount);

  // Validates the full name input field
  function validateName() {
    let value = fullNameInput.value.trim();
    if (value === "") {
      fullNameError.textContent = "Full Name cannot be empty.";
      fullNameInput.classList.add("invalid");
      return false;
    } else {
      fullNameError.textContent = "";
      fullNameInput.classList.remove("invalid");
      return true;
    }
  }

  // Validates the email address input field
  function validateEmail() {
    let value = emailAddressInput.value.trim();
    if (value === "") {
      emailError.textContent = "Email Address cannot be empty.";
      emailAddressInput.classList.add("invalid");
      return false;
    } else if (!EMAIL_REGEX.test(value)) {
      // Check email format
      emailError.textContent = "Please enter a valid email address.";
      emailAddressInput.classList.add("invalid");
      return false;
    } else {
      emailError.textContent = "";
      emailAddressInput.classList.remove("invalid");
      return true;
    }
  }

  // Real-time validation for name and email inputs (on type and on blur/leaving field)
  fullNameInput.addEventListener("input", validateName);
  fullNameInput.addEventListener("blur", validateName);

  emailAddressInput.addEventListener("input", validateEmail);
  emailAddressInput.addEventListener("blur", validateEmail);

  messageInput.addEventListener("input", updateCharCount);
  messageInput.addEventListener("blur", updateCharCount);

  //  LocalStorage Draft Saving
  // Saves current form values to browser's local storage as a draft
  function saveDraftToLocalStorage() {
    localStorage.setItem("draftFullName", fullNameInput.value);
    localStorage.setItem("draftEmail", emailAddressInput.value);
    localStorage.setItem("draftMessage", messageInput.value);
  }
  // Loads saved draft values from local storage into the form fields
  function loadDraftFromLocalStorage() {
    let name = localStorage.getItem("draftFullName");
    let email = localStorage.getItem("draftEmail");
    let message = localStorage.getItem("draftMessage");

    if (name) fullNameInput.value = name;
    if (email) emailAddressInput.value = email;
    if (message) messageInput.value = message;

    updateCharCount(); // Update character count after loading
  }

  // Load draft when the page loads
  loadDraftFromLocalStorage();
  // Save draft to local storage whenever user types in the fields
  fullNameInput.addEventListener("input", saveDraftToLocalStorage);
  emailAddressInput.addEventListener("input", saveDraftToLocalStorage);
  messageInput.addEventListener("input", () => {
    updateCharCount(); // Update count immediately
    saveDraftToLocalStorage();
  });

  // Clears saved draft data from local storage, typically after successful form submission
  localStorage.removeItem("draftFullName");
  localStorage.removeItem("draftEmail");
  localStorage.removeItem("draftMessage");

  // =====================================
  // 14. Project Modal + Carousel
  // =====================================

  let modal = document.getElementById("projectModal");
  let modalTitle = document.getElementById("modalTitle");
  let modalDesc = document.getElementById("modalDescription");
  let modalImg = document.getElementById("carouselImage");
  let modalLinks = document.getElementById("modalLinks");
  let closeBtn = document.getElementById("modalCloseBtn");
  let nextBtn = document.getElementById("nextBtn");
  let prevBtn = document.getElementById("prevBtn");

  let currentImageIndex = 0; // Index of the current image in the carousel
  let currentImages = []; // Array of images for the current project
  // Project data (can be loaded from an external JSON or defined here)
  let projects = [
    {
      title: "E-commerce Website",
      desc: "A full-stack e-commerce platform built with React and Node.js.",
      images: [
        "images/ecommerce-Website-Project.webp",
        "images/flat-design-e-commerce-website-landing-page_23-2149581940.avif",
        "images/website-landing-page-mockup-for-e-commerce-free-vector.jpg",
      ],
      link: "#", // Replace with actual project link
    },
    {
      title: "Portfolio Website",
      desc: "Personal portfolio showcasing skills and projects using HTML, CSS, JS.",
      images: [
        "images/bfb933fcd3f49054c923c6b9d231e34d9effe768-1713894769.webp",
        "images/still-0881fd5ba2033c2cbc13b366c678861e.webp",
      ],
      link: "#", // Replace with actual project link
    },
    {
      title: "Mobile App Design",
      desc: "UI/UX design for a recipe sharing mobile application.",
      images: ["images/MicrosoftTeams-image-73-compressed-1.jpg.webp"],
      link: "#", // Replace with actual project link
    },
  ];
  // Add click listeners to each project card to open the modal
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      let project = projects[index]; // Get project data based on card index
      if (!project) return; // Exit if project data is missing

      modal.classList.add("active"); // Show the modal
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      currentImages = project.images;
      currentImageIndex = 0; // Reset image index
      modalImg.src = currentImages[currentImageIndex]; // Set initial image

      modalLinks.innerHTML = ""; // Clear previous links
      if (project.link) {
        let a = document.createElement("a");
        a.href = project.link;
        a.target = "_blank"; // Open link in new tab
        a.textContent = "View Project";
        modalLinks.appendChild(a);
      }
    });
  });
  // Close modal when close button is clicked
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  // Next image in carousel
  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentImageIndex];
  });
  // Previous image in carousel
  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentImageIndex];
  });

  // =====================================
  // 15. Testimonial Slider
  // =====================================

  let testimonialTrack = document.getElementById("testimonialTrack");
  let testimonialNext = document.getElementById("testimonialNext");
  let testimonialPrev = document.getElementById("testimonialPrev");

  let testimonialIndex = 0; // Current testimonial displayed
  // Get total number of testimonials
  let totalTestimonials = testimonialTrack
    ? testimonialTrack.children.length
    : 0;
  // Function to update the slider position
  function updateTestimonialSlider() {
    // Get the width of a single testimonial (assuming all are same width)
    let width = testimonialTrack.offsetWidth; // Calculate width of one item
    testimonialTrack.style.transform = `translateX(-${
      testimonialIndex * width
    }px)`;
  }

  if (testimonialNext && testimonialPrev && testimonialTrack) {
    // Next testimonial button
    testimonialNext.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
      updateTestimonialSlider();
    });
    // Previous testimonial button
    testimonialPrev.addEventListener("click", () => {
      testimonialIndex =
        (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
      updateTestimonialSlider();
    });
    // Recalculate slider position on window resize
    window.addEventListener("resize", updateTestimonialSlider);
  }
  // =====================================
  // 16. Mobile Menu Toggle
  // =====================================

  let menuToggle = document.getElementById("menuToggle");
  let navbar = document.querySelector("header .navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open"); // Toggle 'open' class for navbar visibility
    menuToggle.classList.toggle("open"); // Toggle 'open' class for menu icon animation
  });
});
