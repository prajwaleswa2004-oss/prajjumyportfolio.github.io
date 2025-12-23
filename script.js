/* PRAJWAL E. PORTFOLIO - CYBER OPS EDITION */

document.addEventListener("DOMContentLoaded", () => {

    /* ====== 1. BOOT SEQUENCE (Hacker Style) ====== */
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const loader = document.querySelector('.loader-line');

    const msgs = [
        "INITIALIZING KERNEL...",
        "BYPASSING FIREWALL...",
        "CONNECTING TO GLOBAL GRID...",
        "ACCESS GRANTED."
    ];

    if (bootScreen) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < msgs.length) {
                bootText.innerText = `> ${msgs[i]}`;
                loader.style.width = `${(i + 1) * 25}%`;
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    bootScreen.classList.add('fade-out');
                    setTimeout(() => bootScreen.style.display = 'none', 500);
                }, 500);
            }
        }, 600);
    }

    /* ====== 2. RED THREAT MAP BACKGROUND (Canvas) ====== */
    const canvas = document.getElementById('cyber-map');
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() > 0.9 ? 3 : 1.5; // Some large threat nodes
            this.color = Math.random() > 0.9 ? '#39ff14' : '#ff003c'; // Green or Red
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Create Nodes
    for (let i = 0; i < 60; i++) nodes.push(new Node());

    const animateMap = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
        ctx.fillRect(0, 0, width, height);

        nodes.forEach((node, index) => {
            node.update();
            node.draw();

            // Draw Lines (Network connections)
            for (let j = index + 1; j < nodes.length; j++) {
                const other = nodes[j];
                const dist = Math.hypot(node.x - other.x, node.y - other.y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(255, 0, 60, ${1 - dist / 150})`; // Red lines
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateMap);
    };
    animateMap();

    /* ====== 3. HACKER TEXT SCRAMBLE ====== */
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    document.querySelector('h1').onmouseover = event => {
        let iterations = 0;
        const originalText = event.target.dataset.text;
        const interval = setInterval(() => {
            event.target.innerText = originalText.split("").map((letter, index) => {
                if (index < iterations) return originalText[index];
                return letters[Math.floor(Math.random() * 36)];
            }).join("");
            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    };

    /* ====== 4. UNIFIED POPUP SYSTEM ====== */
    const modal = document.getElementById('universal-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    const openModal = (title, contentHTML) => {
        modalTitle.innerText = title;
        modalContent.innerHTML = contentHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    // -- CARD HANDLERS --

    // 1. Education (Loads Template)
    document.getElementById('edu-card').addEventListener('click', () => {
        const tmpl = document.getElementById('edu-template').innerHTML;
        openModal("ACADEMIC LOGS", tmpl);
    });

    // 2. Project (Loads Template + Slider logic)
    document.querySelector('.project-card').addEventListener('click', () => {
        const tmpl = document.getElementById('project-template').innerHTML;
        openModal("PROJECT: CURRY MAKER", tmpl);
        
        // Re-attach slider logic dynamically
        window.currentSlide = 0;
        window.imgs = ["assets/IMG-20251206-WA0058.jpg", "assets/IMG-20251206-WA0058.jpg"];
    });

    // 3. Generic Cards
    document.getElementById('profile-card').addEventListener('click', () => {
        openModal("OPERATOR PROFILE", 
            `<p>Specializing in <strong>Mechanical Design</strong> and <strong>Automation</strong>.</p>
             <br><p>> Objective: To secure an internship where physical engineering meets digital intelligence.</p>`);
    });

    document.getElementById('engineering-card').addEventListener('click', () => {
        openModal("WEAPONRY (SKILLS)", 
            `<ul><li>Fusion 360 (Advanced)</li><li>Hypermesh (Analysis)</li><li>AutoCAD</li></ul>`);
    });

    document.getElementById('programming-card').addEventListener('click', () => {
        openModal("CODE INJECTION", 
            `<p>Bridging hardware with software.</p><br>
             <p>> Python: Automation Scripts</p>
             <p>> C: Embedded Systems</p>`);
    });

    // Slider Helper
    window.changeSlide = function(n) {
        const img = document.getElementById('modal-img');
        if(img && window.imgs) {
            window.currentSlide = (window.currentSlide + n + window.imgs.length) % window.imgs.length;
            img.src = window.imgs[window.currentSlide];
        }
    };

    /* ====== 5. SCROLL COUNTERS ====== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden-element');
                entry.target.classList.add('fade-in'); // simple fade
                
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(c => {
                    const target = +c.dataset.target;
                    const update = () => {
                        const val = +c.innerText;
                        const inc = Math.ceil(target / 50);
                        if (val < target) {
                            c.innerText = val + inc;
                            setTimeout(update, 20);
                        } else c.innerText = target;
                    };
                    update();
                });
            }
        });
    });

    document.querySelectorAll('.cyber-card, header').forEach(el => observer.observe(el));

    // Time
    setInterval(() => document.getElementById('system-time').innerText = new Date().toLocaleTimeString(), 1000);
    feather.replace();
});
