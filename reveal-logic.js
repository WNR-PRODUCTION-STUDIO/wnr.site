// reveal-logic.js

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// --- 1. The Hero Image "Swell & Fade" Effect (Desktop Only) ---

// Create a matchMedia instance to handle desktop vs mobile logic
let mm = gsap.matchMedia();

// DESKTOP ONLY (Screens wider than 768px)
mm.add("(min-width: 769px)", () => {
    
    // Phase 1: Initial State (When page loads, no scrolling yet)
    // Starts small and faded
    gsap.set(".hero-showcase", { 
        scale: 0.75, 
        opacity: 0.3 
    });

    // Create a timeline tied to the scroll wheel
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",     // Starts exactly when the page loads
            end: "bottom top",    // Ends when the hero section is scrolled past
            scrub: 1              // 1-second smoothing delay
        }
    });

    // Phase 2: As you scroll down the first half, it grows to full size/brightness
    heroTl.to(".hero-showcase", {
        scale: 1,
        opacity: 1,
        duration: 1 // Relative duration mapping to the first half of the scroll
    })
    // Phase 3: As you continue scrolling past it, it shrinks and fades away
    .to(".hero-showcase", {
        scale: 0.8,
        opacity: 0.2,
        y: 100, // Pushes it down slightly for a parallax exit
        duration: 1 // Relative duration mapping to the second half of the scroll
    });

});

// MOBILE ONLY (Screens 768px and smaller)
mm.add("(max-width: 768px)", () => {
    // Keep it simple on phones to save battery/performance
    // Starts at full size, just slightly fades and pushes down on scroll
    gsap.set(".hero-showcase", { scale: 1, opacity: 1 });
    
    gsap.to(".hero-showcase", {
        scale: 0.9,
        opacity: 0.4,
        y: 50,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});

// --- 2. Text Content Reveal (Scrubbing) ---
// Grabs every main section on the page
const sections = document.querySelectorAll(".reveal-section:not(#hero)");

sections.forEach((section) => {
    // We animate the inner content wrapper of each section
    const content = section.querySelector(".content-wrapper");

    // Start invisible and pushed down
    gsap.set(content, { opacity: 0, y: 150 });

    // Animate to visible and original position based on scroll
    gsap.to(content, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: section,
            start: "top 85%", // Starts animation when the section is 15% up from the bottom
            end: "top 35%",   // Ends animation when the section reaches the upper-middle of the screen
            scrub: true       // Tied strictly to scroll movement
        }
    });
});

// --- 3. Keep the Side Nav Working ---
// (We keep the intersection observer just for updating the little dots on the right)
const navLinks = document.querySelectorAll('.side-nav a');
const observerOptions = { rootMargin: '-50% 0px -50% 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-section').forEach(section => {
    sectionObserver.observe(section);
});

// --- 4. The Gallery Cascade Animation (Optimized) ---
const galleryItems = gsap.utils.toArray(".masonry-grid > *");

// Set initial state
gsap.set(galleryItems, { opacity: 0, y: 50 });

// Create the stagger animation tied to the scroll
ScrollTrigger.create({
    trigger: ".masonry-grid",
    start: "top 80%", // Triggers when the grid hits 80% down the screen
    animation: gsap.to(galleryItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    }),
    // Play on scroll down, reverse smoothly on scroll up
    toggleActions: "play none none reverse" 
});


// --- 5. Architecture Cards (Apple-Style Scrub) ---
// Set the initial hidden state for the cards (pushed down, slightly shrunk, invisible)
gsap.set(".spec-card", { opacity: 0, y: 100, scale: 0.9 });

// Tie their entrance directly to the scrollbar
gsap.to(".spec-card", {
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.2, // The second card delays slightly, creating a beautiful sequence
    scrollTrigger: {
        trigger: ".specs-grid",
        start: "top 85%", // Starts when the top of the grid enters the screen
        end: "top 35%",   // Finishes when the grid is in the upper-middle of the screen
        scrub: 1          // Adds that 1-second buttery smooth scroll lag
    }
});