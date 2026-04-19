// ===== Initialize Variables First =====
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');
        const scrollTopBtn = document.getElementById('scrollTop');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinksContainer = document.getElementById('navLinks');
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        const contactForm = document.getElementById('contactForm');

        // Typing animation texts
        const typingTexts = [
            'Diploma CSE Student',
            'Future Software Engineer',
            'Web Developer',
            'Problem Solver'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        // ===== Typing Animation =====
        function typeText() {
            const typingElement = document.getElementById('typingText');
            if (!typingElement) return;
            
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeout = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                timeout = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                timeout = 500;
            }

            setTimeout(typeText, timeout);
        }

        // ===== Scroll Reveal Animation =====
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const revealPoint = 150;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }

        // ===== Navbar Scroll Effect =====
        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // ===== Active Nav Link on Scroll =====
        function updateActiveNavLink() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        }

        // ===== Scroll to Top Button =====
        function handleScrollTopButton() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // ===== Skill Progress Bars Animation =====
        function animateSkillBars() {
            const skillsSection = document.getElementById('skills');
            if (!skillsSection) return;
            
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 200) {
                skillProgressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
            }
        }

        // ===== Mobile Menu Toggle =====
        function toggleMobileMenu() {
            mobileMenuBtn.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        }

        // ===== Event Listeners =====
        // Scroll events
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            updateActiveNavLink();
            handleScrollTopButton();
            revealOnScroll();
            animateSkillBars();
        });

        // Scroll to top click
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mobile menu click
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Nav link clicks (close mobile menu)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('open')) {
                    toggleMobileMenu();
                }
            });
        });

        // Contact form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ===== Initialize on Page Load =====
        document.addEventListener('DOMContentLoaded', () => {
            // Start typing animation
            setTimeout(typeText, 1000);
            
            // Initial reveal check
            revealOnScroll();
            
            // Initial navbar check
            handleNavbarScroll();
            
            // Initial skill bars check
            animateSkillBars();
        });

        // ===== Keyboard Accessibility =====
        document.addEventListener('keydown', (e) => {
            // Close mobile menu on Escape
            if (e.key === 'Escape' && navLinksContainer.classList.contains('open')) {
                toggleMobileMenu();
            }
        });

        // Focus visible polyfill-like behavior
        document.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });