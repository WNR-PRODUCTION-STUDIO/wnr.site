document.addEventListener('DOMContentLoaded', () => {



    const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const magneticElements = document.querySelectorAll("a, button, .open-doc");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Show cursor on move
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";

    // Immediate follow for the dot
    cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;

    // Smooth follow for the outline (using animate for performance)
    cursorOutline.animate({
        transform: `translate(${posX - 20}px, ${posY - 20}px)`
    }, { duration: 500, fill: "forwards" });
});

// MAGNETIC DOCKING EFFECT
magneticElements.forEach(elem => {
    elem.addEventListener("mousemove", (e) => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distanceX = e.clientX - x;
        const distanceY = e.clientY - y;

        // Move the actual button slightly (Magnet effect)
        elem.style.transform = `translate(${distanceX * 0.3}px, ${distanceY * 0.3}px)`;
        
        // Expand cursor outline to "hug" the button
        cursorOutline.style.width = `${rect.width + 20}px`;
        cursorOutline.style.height = `${rect.height + 20}px`;
        cursorOutline.style.borderRadius = "8px"; // Match your card/button radius
        cursorOutline.animate({
            transform: `translate(${rect.left - 10}px, ${rect.top - 10}px)`
        }, { duration: 150, fill: "forwards" });
    });

    elem.addEventListener("mouseleave", () => {
        elem.style.transform = `translate(0px, 0px)`;
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.borderRadius = "50%";
    });
});




    
// --- TERMINAL TYPEWRITER LOGIC ---
    const terminalText = document.getElementById('terminal-text');
    
    // The lines of code the terminal will "type" out
    const bootSequence = [
        "Initializing WNR_OS v2.0...",
        "Establishing Serial Connection on COM3... [OK]",
        "Loading Hardware Modules: ESP32, Arduino, PCB... [OK]",
        "Compiling C++ Data Structures... [SUCCESS]",
        "Resolving complex algorithms...",
        "System Ready.",
        "Welcome, Muhammad Waleed."
    ];

    let lineIndex = 0;
    let charIndex = 0;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && lineIndex === 0) {
            typeTerminal();
        }
    }, { threshold: 0.5 });
    
    if (terminalText) {
        observer.observe(document.querySelector('.terminal-container'));
    }

    function typeTerminal() {
        if (lineIndex < bootSequence.length) {
            let currentLine = bootSequence[lineIndex];
            
            if (charIndex < currentLine.length) {
                // Type next character
                terminalText.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                // Randomize typing speed for realism (10ms - 50ms per char)
                setTimeout(typeTerminal, Math.random() * 40 + 10);
            } else {
                // Line finished. Add a line break and start the next line
                terminalText.innerHTML += "<br>";
                lineIndex++;
                charIndex = 0;
                // Pause slightly longer at the end of a line (300ms - 800ms)
                setTimeout(typeTerminal, Math.random() * 500 + 300);
            }
        }
    }


// --- EXPERIENCE DOCUMENT MODAL LOGIC ---
    const expDocBtns = document.querySelectorAll('.open-doc');
    const expDocModal = document.getElementById('expDocModal');
    const closeExpModalBtn = document.querySelector('.close-exp-modal');
    const expDocViewer = document.getElementById('expDocViewer');
    const expDocTitle = document.getElementById('expDocTitle');

    if (expDocBtns.length > 0 && expDocModal) {
        expDocBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Grab the file path and title from the button
                const docSrc = btn.getAttribute('data-doc');
                const docTitle = btn.getAttribute('data-title');
                
                // Update the modal
                expDocTitle.innerText = docTitle;
                expDocViewer.innerHTML = `<img src="${docSrc}" alt="${docTitle}">`;
                
                // Show the modal
                expDocModal.classList.add('active');
            });
        });

        // Close Modal Logic (Clicking X)
        closeExpModalBtn.addEventListener('click', () => {
            expDocModal.classList.remove('active');
            setTimeout(() => expDocViewer.innerHTML = '', 300); // Clear memory
        });

        // Close Modal Logic (Clicking outside the box)
        expDocModal.addEventListener('click', (e) => {
            if (e.target === expDocModal) {
                expDocModal.classList.remove('active');
                setTimeout(() => expDocViewer.innerHTML = '', 300);
            }
        });
    }




    // --- MAGNETIC NAVBAR SLIDER LOGIC ---
    const navContainer = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Create the slider element automatically
    const slider = document.createElement('div');
    slider.classList.add('nav-slider');
    
    if (navContainer) {
        navContainer.appendChild(slider);
        
        navItems.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                // Only trigger on Desktop
                if (window.innerWidth > 768) {
                    const linkRect = e.target.getBoundingClientRect();
                    const containerRect = navContainer.getBoundingClientRect();
                    
                    // Move and resize the slider to match the hovered link
                    slider.style.width = `${linkRect.width}px`;
                    slider.style.left = `${linkRect.left - containerRect.left}px`;
                    slider.style.opacity = '1';
                }
            });
        });

        // Hide the slider when the mouse leaves the navigation bar
        navContainer.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                slider.style.opacity = '0';
                slider.style.width = '0px';
            }
        });
    }

    


    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() * 0.8) - 0.4;
                this.speedY = (Math.random() * 0.8) - 0.4;
                this.color = '#FFC107'; 
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = this.color; ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
            }
        }
        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 18000; 
            for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); }
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update(); particlesArray[i].draw();
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath(); ctx.strokeStyle = `rgba(255, 193, 7, ${1 - distance/100})`;
                        ctx.lineWidth = 0.5; ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y); ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        initParticles(); animateParticles();
    }

    const observerHidden = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach((el) => observerHidden.observe(el));

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
            }
        });
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
                }
            });
        });
    }

    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement; this.words = words; this.txt = ''; this.wordIndex = 0;
            this.wait = parseInt(wait, 10); this.type(); this.isDeleting = false;
        }
        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            if(this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); } 
            else { this.txt = fullTxt.substring(0, this.txt.length + 1); }
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
            let typeSpeed = 100; if(this.isDeleting) typeSpeed /= 2;
            if(!this.isDeleting && this.txt === fullTxt) { typeSpeed = this.wait; this.isDeleting = true; } 
            else if(this.isDeleting && this.txt === '') { this.isDeleting = false; this.wordIndex++; typeSpeed = 500; }
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    const txtElement = document.querySelector('.txt-type');
    if(txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }

    const openBtn = document.getElementById('openResumeBtn');
    const modal = document.getElementById('resumeModal');
    const closeBtn = document.querySelector('.close-modal');
    const printBtn = document.getElementById('printResumeBtn');
    const iframe = document.getElementById('resumeFrame');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
        closeBtn.addEventListener('click', () => { modal.classList.remove('active'); });
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
        
        printBtn.addEventListener('click', () => {
            if (iframe.contentWindow) {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            } else {
                alert("Please use the print button inside the PDF viewer controls.");
            }
        });
    }
});


    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });


    const interactiveElements = document.querySelectorAll('a, button, .hamburger, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

   // --- 7. CUSTOM FORM VALIDATION LOGIC (FIXED) ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // 1. NUCLEAR FIX: Disable default browser bubble via JS
        contactForm.setAttribute('novalidate', true);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default submit
            
            let isValid = true;
            // Select all required fields
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

            // Clear old errors
            document.querySelectorAll('.custom-error-bubble').forEach(el => el.remove());
            document.querySelectorAll('.invalid-field').forEach(el => el.classList.remove('invalid-field'));

            // Check each field
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    
                    // Highlight the box
                    input.classList.add('invalid-field');

                    // Create Custom Glass Bubble
                    const bubble = document.createElement('div');
                    bubble.className = 'custom-error-bubble';
                    bubble.innerText = "⚠ Please fill this field";
                    
                    // Add to DOM
                    input.parentElement.appendChild(bubble);

                    // Animation
                    requestAnimationFrame(() => {
                        bubble.classList.add('show-error');
                    });
                    
                    // Auto-remove after 3s
                    setTimeout(() => {
                        bubble.classList.remove('show-error');
                        setTimeout(() => bubble.remove(), 300);
                    }, 3000);
                }
            });

            if (isValid) {
                // Success!
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.innerText;
                
                submitBtn.innerText = "Sent! ✓";
                submitBtn.style.borderColor = "#4CAF50";
                submitBtn.style.color = "#4CAF50";
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.style.borderColor = "";
                    submitBtn.style.color = "";
                }, 3000);
            }
        });
    }


document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('expanded')) {
            card.classList.remove('expanded');
        } else {
            document.querySelectorAll('.project-card').forEach(c => c.classList.remove('expanded'));
            card.classList.add('expanded');
        }
    });
});



// --- 9. iOS ELASTIC PULL HEADER EFFECT ---
const bannerImg = document.querySelector('.full-width-banner img');
const heroContent = document.querySelector('.hero-content');

if (bannerImg && heroContent) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // ONLY Trigger if user is pulling down (Negative Scroll)
        // Note: This mostly works on iOS Safari / Mobile Browsers that allow overscroll
        if (scrollY < 0) {
            
            // Calculate Stretch Factor (The deeper the pull, the bigger the scale)
            const stretch = Math.abs(scrollY);
            const scale = 1 + (stretch / 500); // Adjust 500 to control sensitivity
            
            // 1. Zoom the Poster
            bannerImg.style.transform = `scale(${scale})`;
            
            // 2. Gently push/stretch the text downwards
            // We scale it slightly too for that "Rubber" text feeling
            heroContent.style.transform = `translateY(${stretch * 0.5}px) scale(${1 + (stretch / 2000)})`;
            
        } else {
            // Reset to normal when scrolling down
            bannerImg.style.transform = 'scale(1)';
            heroContent.style.transform = 'translateY(0) scale(1)';
        }
    });
}
// --- CONTACT FORM HANDLING (FIXED VERSION) ---
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Select the form and status text
    var form = document.getElementById("contactForm");
    var status = document.getElementById("form-status");

    // Only run this if the form actually exists on the page
    if (form) {
        form.addEventListener("submit", function(event) {
            // Stop the page from refreshing
            event.preventDefault();
            
            // Get the form data
            var data = new FormData(form);
            var button = form.querySelector('button');
            var originalText = button.innerText;

            // Update button to show loading
            button.innerText = "Sending...";
            button.disabled = true;

            // Send data to Formspree
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // SUCCESS: Show gold message & clear form
                    status.innerHTML = "Thanks! Your message has been sent.";
                    status.style.color = "#FFC107"; // Gold
                    form.reset();
                } else {
                    // ERROR: Formspree rejected it (e.g., spam)
                    response.json().then(data => {
                        if (data.errors) {
                            status.innerHTML = data.errors.map(error => error.message).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form";
                        }
                        status.style.color = "red";
                    });
                }
            }).catch(error => {
                // NETWORK ERROR: No internet or blocking issue
                status.innerHTML = "Oops! There was a network problem.";
                status.style.color = "red";
            }).finally(() => {
                // RESET BUTTON: Turn it back on
                button.innerText = originalText;
                button.disabled = false;
            });
        });
    }
});

// --- PRELOADER LOGIC (Simple & Clean) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Keep the cool animation running for at least 1.5 seconds
        // This prevents it from flashing too quickly on fast internet
        setTimeout(() => {
            
            // 1. Start the fade out
            preloader.classList.add('preloader-hidden');
            
            // 2. Remove it from the layout completely after fade ends
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Matches the 0.8s CSS transition
            
        }, 1500); 
    }
});