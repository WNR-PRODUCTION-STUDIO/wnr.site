document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PARTICLE ANIMATION ---
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

    // --- 2. SCROLL REVEAL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // --- 3. NAVIGATION LOGIC ---
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

    // --- 4. TYPEWRITER ---
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

    // --- 5. RESUME MODAL LOGIC ---
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