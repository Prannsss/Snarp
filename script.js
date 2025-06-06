$(document).ready(function(){
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
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Designer", "Frontend Developer", "Video Editor", "Graphic Designer", "YouTuber"],
        typeSpeed: 125,
        backSpeed: 70,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Designer", "Frontend Developer", "Video Editor", "Graphic Designer", "YouTuber"],
        typeSpeed: 125,
        backSpeed: 70,
        loop: true
    });

    // owl carousel script for hobbies
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
    
    // works carousel with special effects
    $('.works-carousel').owlCarousel({
        margin: 15,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        dots: true,
        responsive: {
            0:{
                items: 1,
            },
            600:{
                items: 2,
            },
            900:{
                items: 3,
            },
            1200:{
                items: 4,
            }
        }
    });
});

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Display the success message
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";

    // Optionally, clear the form fields
    this.reset();

    // Hide the success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
});