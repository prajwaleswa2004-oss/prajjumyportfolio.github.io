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
                if(bootText) bootText.innerText = `> ${msgs[i]}`;
                if(loader) loader.style.width = `${(i + 1) * 25}%`;
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
    if (canvas) {
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
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() > 0.9 ? 3 : 1.5;
                this.color = Math.random() > 0.9 ? '#39ff14' : '#ff003c';
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

        for (let i = 0; i < 60; i++) nodes.push(new Node());

        const animateMap = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            nodes.forEach((node, index) => {
                node.update();
                node.draw();
                for (let j = index + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(255, 0, 60, ${1 - dist / 150})`;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateMap);
        };
        animateMap();
    }

    /* ====== 3. HACKER TEXT SCRAMBLE ====== */
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const h1 = document.querySelector('h1');
    if(h1) {
        h1.onmouseover = event => {
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
    }

    /* ====== 4. UNIFIED POPUP SYSTEM ====== */
    const modal = document.getElementById('universal-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    const openModal = (title, contentHTML) => {
        if(!modal) return;
        modalTitle.innerText = title;
        modalContent.innerHTML = contentHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if(!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    // -- CARD HANDLERS --
    const safeAddListener = (id, callback) => {
        const el = document.getElementById(id) || document.querySelector(id);
        if(el) el.addEventListener('click', callback);
    };

    // 1. Education
    safeAddListener('#edu-card', () => {
        const tmpl = document.getElementById('edu-template').innerHTML;
        openModal("ACADEMIC LOGS", tmpl);
    });

    // 2. Project
    safeAddListener('.project-card', () => {
        const tmpl = document.getElementById('project-template').innerHTML;
        openModal("PROJECT: CURRY MAKER", tmpl);
        window.currentSlide = 0;
        window.imgs = ["assets/IMG-20251206-WA0058.jpg", "assets/IMG-20251206-WA0058.jpg"];
    });

    // 3. Generic Cards
    safeAddListener('#profile-card', () => {
        openModal("OPERATOR PROFILE", 
            `<p>Specializing in <strong>Mechanical Design</strong> and <strong>Automation</strong>.</p>
             <br><p>> Objective: To secure an internship where physical engineering meets digital intelligence.</p>`);
    });

    safeAddListener('#engineering-card', () => {
        openModal("WEAPONRY (SKILLS)", 
            `<ul><li>Fusion 360 (Advanced)</li><li>Hypermesh (Analysis)</li><li>AutoCAD</li></ul>`);
    });

    safeAddListener('#programming-card', () => {
        openModal("CODE INJECTION", 
            `<p>Bridging hardware with software.</p><br>
             <p>> Python: Automation Scripts</p>
             <p>> C: Embedded Systems</p>`);
    });
    
    // Social
    safeAddListener('#social-card', () => {
        openModal("FIELD OPERATIONS", 
            `<p>Impact Reports:</p>
             <p>> 10,000+ Trees Planted (CRPF Drive)</p>
             <p>> 2 Years Class Representative Leadership</p>`);
    });
    
    // Creative
    safeAddListener('#creative-card', () => {
        openModal("SURVEILLANCE MEDIA", 
            `<p>Visual Documentation Skills:</p>
             <p>> DaVinci Resolve Editing</p>
             <p>> Cinematography & Storytelling</p>`);
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
                entry.target.classList.add('fade-in'); 
                
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

    // Observe everything
    document.querySelectorAll('.cyber-card, header').forEach(el => observer.observe(el));

    // Time
    setInterval(() => {
        const t = document.getElementById('system-time');
        if(t) t.innerText = new Date().toLocaleTimeString();
    }, 1000);
    
    if (typeof feather !== 'undefined') feather.replace();
});
