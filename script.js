$(document).ready(function(){
    // Consolidated configuration object for better performance
    const config = {
        observer: {
            threshold: [0, 0.15, 0.85],
            rootMargin: '0px 0px 0px 0px'
        },
        typing: {
            strings: ["Designer", "Frontend Developer", "Video Editor", "Graphic Designer", "YouTuber"],
            typeSpeed: 125,
            backSpeed: 70,
            loop: true
        },
        carousel: {
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeOut: 2000,
            responsive: {
                0: { items: 1, nav: false },
                600: { items: 2, nav: false },
                1000: { items: 3, nav: false }
            }
        }
    };

    // Intersection Observer for fade-in/fade-out animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const target = entry.target;
            const elements = target.querySelectorAll('.fade-in-element');
            
            // Don't fade out content when at the top of the page
            if (target.closest('#home') && window.scrollY < 200) {
                return;
            }
            
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                // Fade in when scrolling down and element comes into view
                target.classList.add('visible');
                
                // Add staggered animation for child elements
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 100);
                });
            } else if (entry.intersectionRatio < 0.15 && entry.boundingClientRect.top < 0) {
                // Fade out when scrolling down and element goes out of view at the top
                target.classList.remove('visible');
                
                // Remove visible class from child elements immediately for more obvious effect
                elements.forEach((element) => {
                    element.classList.remove('visible');
                });
            } else if (entry.intersectionRatio < 0.15 && entry.boundingClientRect.top > window.innerHeight * 0.5) {
                // Fade out when scrolling up and element goes out of view at the bottom
                target.classList.remove('visible');
                
                // Remove visible class from child elements immediately
                elements.forEach((element) => {
                    element.classList.remove('visible');
                });
            }
        });
    }, config.observer);

    // Observe all content containers with fade-in-section class (now on .max-width divs)
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Also observe individual fade-in elements that are not children of sections
    document.querySelectorAll('.fade-in-element').forEach(element => {
        if (!element.closest('.fade-in-section')) {
            observer.observe(element);
        }
    });

    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script - using consolidated config
    var typed1 = new Typed(".typing", config.typing);
    var typed2 = new Typed(".typing-2", config.typing);

    // owl carousel script for hobbies - using consolidated config
    $('.carousel').owlCarousel(config.carousel);

    // Dynamic works slider with seamless loop - eliminates duplicate HTML
    const worksTrack = document.querySelector('.works-track');
    if (worksTrack) {
        const workItems = Array.from(worksTrack.children);
        // Clone items for seamless loop
        workItems.forEach(item => {
            const clone = item.cloneNode(true);
            worksTrack.appendChild(clone);
        });
    }

    // Initialize EmailJS
    emailjs.init('WAPvCjPme_s0QHkcF');
});

// Optimized form submission with async/await
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const sendBtn = document.getElementById("send-btn");
    const successMessage = document.getElementById("success-message");
    
    // Change button text to show loading state
    const originalBtnText = sendBtn.innerHTML;
    sendBtn.innerHTML = "Sending...";
    sendBtn.disabled = true;

    try {
        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'vfrancelaurence@gmail.com' 
        };

        // Send both emails concurrently for better performance
        await Promise.all([
            emailjs.send('service_7uqcaai', 'template_0mink6m', {
                from_name: templateParams.from_name,
                from_email: templateParams.from_email,
                subject: templateParams.subject,
                message: templateParams.message,
                to_email: 'vfrancelaurence@gmail.com'
            }),
            emailjs.send('service_7uqcaai', 'template_s13jdfk', {
                from_name: templateParams.from_name,
                from_email: templateParams.from_email,
                subject: templateParams.subject,
                message: templateParams.message,
                to_email: templateParams.from_email
            })
        ]);

        // Show success message
        successMessage.innerHTML = "Message sent successfully! I will get back to you soon😊!";
        successMessage.style.display = "block";
        successMessage.style.color = "#ffffff";
        
        // Clear the form fields
        this.reset();
        
        // Hide the success message after 5 seconds
        setTimeout(() => successMessage.style.display = "none", 5000);
        
    } catch (error) {
        console.log('Failed to send emails...', error);
        
        // Show error message
        successMessage.innerHTML = "Failed to send message. Please try again or contact me directly at vfrancelaurence@gmail.com";
        successMessage.style.display = "block";
        successMessage.style.color = "#f44336";
        
        // Hide the error message after 7 seconds
        setTimeout(() => successMessage.style.display = "none", 7000);
    } finally {
        // Reset button state
        sendBtn.innerHTML = originalBtnText;
        sendBtn.disabled = false;
    }
});