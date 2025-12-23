/* PRAJWAL E. PORTFOLIO - INDUSTRIAL ENGINEERING EDITION */

document.addEventListener("DOMContentLoaded", () => {

    /* ====== 1. SYSTEM BOOT SEQUENCE (Industrial Style) ====== */
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const loadBar = document.querySelector('.loading-progress');

    const bootMessages = [
        "INITIALIZING CORE SYSTEMS...",
        "LOADING CAD MODULES...",
        "CALIBRATING PHYSICS ENGINE...",
        "SYSTEM ONLINE. WELCOME."
    ];

    if (bootScreen && bootText) {
        let step = 0;
        const interval = setInterval(() => {
            if (step < bootMessages.length) {
                bootText.innerText = bootMessages[step];
                loadBar.style.width = `${(step + 1) * 25}%`;
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    bootScreen.classList.add('fade-out');
                    document.body.style.overflow = 'auto';
                    setTimeout(() => { bootScreen.style.display = 'none'; }, 500);
                }, 500);
            }
        }, 800);
    }

    /* ====== 2. CAD CURSOR TRACKING SYSTEM ====== */
    const cursorX = document.getElementById('cursor-x');
    const cursorY = document.getElementById('cursor-y');
    const coords = document.getElementById('coordinates');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Move Lines
            cursorX.style.left = x + 'px';
            cursorY.style.top = y + 'px';

            // Update Coords (Fake CAD coordinates)
            coords.innerText = `X: ${x + 1024} | Y: ${y + 408}`;
        });
    }

    /* ====== 3. GEAR ROTATION ON SCROLL ====== */
    const gear1 = document.querySelector('.gear-1');
    const gear2 = document.querySelector('.gear-2');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if(gear1) gear1.style.transform = `rotate(${scrolled * 0.2}deg)`;
        if(gear2) gear2.style.transform = `rotate(-${scrolled * 0.2}deg)`;
    });

    /* ====== 4. UNIVERSAL MODAL HANDLER ====== */
    // This handles opening ANY card into a popup
    
    // -- A. Specific Modals (Project & Education) --
    const projectCard = document.querySelector('.project-card');
    const projectModal = document.getElementById('project-modal');
    
    const eduCard = document.getElementById('edu-card');
    const eduModal = document.getElementById('education-modal');

    // -- B. Generic Info Modals (Profile, Tech, Creative, Social) --
    const genericModal = document.getElementById('generic-modal');
    const modalTitle = document.getElementById('modal-heading');
    const modalBody = document.getElementById('modal-body-content');
    const modalTags = document.getElementById('modal-tags');

    const openGeneric = (title, tags, htmlContent) => {
        modalTitle.innerText = title;
        modalTags.innerHTML = tags.map(t => `<span>${t}</span>`).join('');
        modalBody.innerHTML = htmlContent;
        genericModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Event Listeners for Cards
    if(projectCard) projectCard.addEventListener('click', () => {
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if(eduCard) eduCard.addEventListener('click', () => {
        eduModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Animate Timeline
        const items = eduModal.querySelectorAll('.edu-item');
        items.forEach((item, index) => {
            item.classList.remove('show');
            setTimeout(() => item.classList.add('show'), index * 200);
        });
    });

    // Defining Content for Generic Cards
    document.getElementById('profile-card')?.addEventListener('click', () => {
        openGeneric("ENGINEER PROFILE", ["CAD", "AUTOMATION"], 
            `<p>I am a Mechanical Engineer focused on bridging the gap between physical mechanisms and digital control logic.</p>
             <br><h3>OBJECTIVE</h3>
             <p>To design intelligent machines that solve real-world problems using Fusion 360, Python, and rapid prototyping.</p>`
        );
    });

    document.getElementById('engineering-card')?.addEventListener('click', () => {
        openGeneric("TECHNICAL ARSENAL", ["DESIGN", "ANALYSIS"], 
            `<ul>
                <li><strong>CAD:</strong> Fusion 360, AutoCAD, UG NX</li>
                <li><strong>CAE:</strong> Hypermesh (FEA Analysis)</li>
                <li><strong>MFG:</strong> 3D Printing, CNC Basics</li>
             </ul>`
        );
    });

    document.getElementById('creative-card')?.addEventListener('click', () => {
        openGeneric("VISUAL MEDIA", ["FILM", "DESIGN"], 
            `<p>Engineering requires communication. I use visual storytelling to present complex technical concepts.</p>
             <ul><li>Video Editing (DaVinci Resolve)</li><li>Cinematography</li></ul>`
        );
    });

    document.getElementById('programming-card')?.addEventListener('click', () => {
        openGeneric("LOGIC STACK", ["CONTROL", "DATA"], 
            `<p>Mechanisms need brains. I write code to control hardware.</p>
             <ul><li><strong>Python:</strong> Automation & Scripts</li><li><strong>C:</strong> Embedded Systems</li></ul>`
        );
    });

    document.getElementById('social-card')?.addEventListener('click', () => {
        openGeneric("SOCIAL IMPACT", ["VOLUNTEER", "LEADERSHIP"], 
            `<p><strong>CRPF Drive:</strong> Planted 10,000+ trees to combat deforestation.</p>
             <p><strong>Leadership:</strong> Class Representative for 2 consecutive years.</p>`
        );
    });

    /* ====== 5. CLOSE MODAL LOGIC (Universal) ====== */
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        const closeBtn = overlay.querySelector('.close-modal');
        const closeModal = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if(closeBtn) closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => {
                m.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });

    /* ====== 6. SCROLL REVEAL ANIMATION ====== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                
                // Trigger Counters
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const inc = Math.ceil(target / 50);
                        if(count < target) {
                            counter.innerText = count + inc;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    });

    document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));
    document.querySelectorAll('.card').forEach(el => observer.observe(el));

    /* ====== 7. TIME UPDATE ====== */
    setInterval(() => {
        const timeBox = document.getElementById('system-time');
        if(timeBox) timeBox.innerText = new Date().toLocaleTimeString('en-US', {hour12:false});
    }, 1000);

    /* ====== 8. PROJECT SLIDER LOGIC ====== */
    let currentSlide = 0;
    const projectImages = ["assets/IMG-20251206-WA0058.jpg", "assets/IMG-20251206-WA0058.jpg", "assets/IMG-20251206-WA0058.jpg"];
    const galleryImg = document.getElementById('gallery-img');
    const counterDisplay = document.getElementById('current-slide');

    window.changeSlide = function(n) {
        if(!galleryImg) return;
        galleryImg.style.opacity = 0;
        setTimeout(() => {
            currentSlide = (currentSlide + n + projectImages.length) % projectImages.length;
            galleryImg.src = projectImages[currentSlide];
            if(counterDisplay) counterDisplay.innerText = currentSlide + 1;
            galleryImg.style.opacity = 1;
        }, 200);
    };

    // Init Icons
    if(typeof feather !== 'undefined') feather.replace();
});
