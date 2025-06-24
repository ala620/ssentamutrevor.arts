document.addEventListener('DOMContentLoaded', () => {

    // --- WEBSITE CONFIGURATION ---

    const ARTIST_NAME = "Trevor Ssentamu";
    const ARTIST_EMAIL = "ssentamutrevor9@gmail.com";
    const ARTIST_PHONE = "+256784717186";

    // Social Media Links (Replaced Facebook/Twitter with TikTok/WhatsApp)
    const TIKTOK_URL = "https://www.tiktok.com/@trevorart"; // <-- ADD YOUR TIKTOK LINK
    const WHATSAPP_URL = "https://wa.me/256784717186"; // <-- ADD YOUR WHATSAPP LINK (uses phone number)
    const INSTAGRAM_URL = "https://www.instagram.com/ssentamutrevor.art";
    const GMAIL_URL = "mailto:ssentamutrevor9@gmail.com";


    // --- ARTWORK DATA ---
    // Easy to manage: just add, edit, or remove objects from this array.
    const artworks = [
        {
            id: 1,
            title: "Veil in Silence",
            image: "viel in silence.PNG", // Use the correct filename
            description: "A hyperrealistic portrait capturing a moment of quiet contemplation.",
            dimensions: "30 x 40 cm",
            price: "120 USD",
            isAvailable: true // Add this line
        },
        { // Artwork 2 - The new artwork you requested
            id: 2,
            title: "The Jocker - through the glass, darkly",
            image: "Guy.PNG", // Use the correct filename for the Guy picture
            description: "Charcoal and graphite on canvas.",
            dimensions: "53.2 x 40 cm",
            price: "200 USD",
            isAvailable: true// Example: Set to false for this artwork
        },
        {
            id: 3,
            title: "Wonder ",
            image: "Female.PNG", // Use the correct filename
            description: "A detailed study of light and shadow on classic drawing tools.",
            dimensions: "25 x 35 cm",
            price: "100 USD",
            isAvailable: false
        },
        {
            id: 4,
            title: "Culture",
            image: "Dreds.PNG", // Use the correct filename
            description: "An intense and expressive charcoal portrait.",
            dimensions: "40 x 50 cm",
            price: "120 USD",
            isAvailable: false
        },
         {
            id: 5,
            title: "",
            image: "Sample.PNG", // Use the correct filename
            description: "A sample piece showcasing hyperrealistic techniques.",
            dimensions: "30 x 30 cm",
            price: "120 USD",
            isAvailable: false // Example: Set to false for this artwork


        }
    ];

    // --- DOM ELEMENT REFERENCES ---
    const appRoot = document.getElementById('app-root');
    const brandLogo = document.getElementById('brand-logo');
    // Desktop Nav
    const navHome = document.getElementById('nav-home');
    const navGallery = document.getElementById('nav-gallery');
    const navAbout = document.getElementById('nav-about'); // Changed from nav-contact
    // Mobile Nav
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavHome = document.getElementById('mobile-nav-home');
    const mobileNavGallery = document.getElementById('mobile-nav-gallery');
    const mobileNavAbout = document.getElementById('mobile-nav-about'); // Changed from mobile-nav-contact

    // --- RENDER FUNCTIONS (These build the HTML for each section) ---

    function renderHomeSection() {
        appRoot.innerHTML = `
            <section class="container mx-auto px-4 py-16">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="text-center md:text-left scroll-animate scroll-slide-in-left">
                        <h1 class="text-5xl md:text-7xl font-extrabold text-stone-800 leading-tight">
                            Hyper Realistic<br>Artistry
                        </h1>
                        <p class="mt-4 text-lg text-stone-600">
                            Exploring the boundaries of reality with charcoal and graphite. Each piece is a journey into detail and emotion.
                        </p>
                        <button id="home-view-gallery" class="mt-8 bg-amber-800 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-900 transition duration-300 transform hover:scale-105">
                            View Gallery
                        </button>
                    </div>

                    <div class="h-96 w-full scroll-animate scroll-slide-in-right">
                        <div class="slideshow-container">
                            ${artworks.map(art => `<div class="slide"><img src="${art.image}" alt="${art.title}"></div>`).join('')}
                            <a class="prev">&#10094;</a>
                            <a class="next">&#10095;</a>
                        </div>
                    </div>
                </div>

                <div class="mt-24 grid md:grid-cols-3 gap-12 items-center scroll-animate scroll-slide-in-up">
                     <div class="md:col-span-1">
                        <img src="Trevor.PNG" alt="Artist ${ARTIST_NAME}" class="rounded-lg shadow-xl w-full h-auto object-cover" style="border-radius: 40%;">
                    </div>
                    <div class="md:col-span-2 bg-white/60 p-8 rounded-lg shadow-md">
                        <h2 class="text-3xl font-bold text-stone-800">About the Artist</h2>
                        <p class="mt-4 text-stone-600">
                            My name is ${ARTIST_NAME}, a passionate artist dedicated to the arts of hyperrealism. I strive to capture more than just a likeness; I aim to capture the soul and story behind my subjects. My medium of choice, charcoal and graphite, allows for a dramatic interplay of light and shadow that brings each piece to life.
                        </p>
                    </div>
                </div>
            </section>
        `;
        initSlideshow();
        document.getElementById('home-view-gallery').addEventListener('click', () => navigateTo(renderGallerySection, '#nav-gallery, #mobile-nav-gallery'));
        initScrollAnimations();
    }

    function renderGallerySection() {
        appRoot.innerHTML = `
            <section class="container mx-auto px-4 py-16">
                <div class="text-center mb-12 scroll-animate scroll-fade-in">
                    <h1 class="text-5xl font-extrabold text-stone-800">Gallery</h1>
                    <p class="mt-2 text-lg text-stone-600">A collection of my recent works. Click 'Order Now' to inquire about a piece.</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${artworks.map(art => {
                        const emailSubject = encodeURIComponent(`Art Inquiry: ${art.title}`);
                        const emailBody = encodeURIComponent(
`Hello,

I am interested in purchasing the following artwork:

Title: ${art.title}
Dimensions: ${art.dimensions}
Price: ${art.price}

Please let me know the next steps for acquisition.

Thank you,
[Your Name]`
                        );

                        // Conditional rendering for the button
                        const orderButtonHtml = art.isAvailable
                            ? `<a href="mailto:${ARTIST_EMAIL}?subject=${emailSubject}&body=${emailBody}" class="order-button">Order Now</a>`
                            : `<button class="order-button bg-gray-400 cursor-not-allowed" disabled>Unavailable</button>`; // Added bg-gray-400 for a disabled look

                        return `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group scroll-animate scroll-slide-in-up">
                            <div class="overflow-hidden">
                                <img src="${art.image}" alt="${art.title}" class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h3 class="text-2xl font-bold text-stone-800">${art.title}</h3>
                                <p class="text-stone-500 mt-2 flex-grow">${art.description}</p>
                                <div class="mt-4 flex justify-between items-center text-sm font-semibold text-stone-700">
                                    <span>${art.dimensions}</span>
                                    <span class="bg-amber-100 text-amber-800 py-1 px-3 rounded-full">${art.price}</span>
                                </div>
                                ${orderButtonHtml}
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </section>
        `;
        initScrollAnimations();
    }

    function renderAboutSection() { // This now combines About and Contact
        appRoot.innerHTML = `
            <section class="container mx-auto px-4 py-16">
                 <div class="text-center mb-12 scroll-animate scroll-fade-in">
                    <h1 class="text-5xl font-extrabold text-stone-800">About & Contact</h1>
                    <p class="mt-2 text-lg text-stone-600">Learn more about the artist and how to get in touch.</p>
                </div>

                <div class="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-4xl mx-auto scroll-animate scroll-slide-in-up">
                    <div class="mb-12">
                        <h2 class="text-3xl font-bold text-stone-800 border-b-2 border-amber-800 pb-2">The Artist</h2>
                        <p class="mt-4 text-stone-700 leading-relaxed">
                            Based in Uganda, ${ARTIST_NAME} is a self-taught artist with a profound passion for hyperrealism. His work delves deep into the human condition, using charcoal and graphite to create evocative portraits that are rich in detail and emotion. He believes that art is a universal language, capable of transcending cultural and geographical boundaries to touch the soul. Each stroke is deliberate, aiming to build a connection between the subject, the artist, and the viewer.
                        </p>
                    </div>

                    <div>
                         <h2 class="text-3xl font-bold text-stone-800 border-b-2 border-amber-800 pb-2">Get In Touch</h2>
                         <p class="mt-4 text-stone-700">For commissions, inquiries, or to purchase a piece, please use the contact methods below.</p>
                         <ul class="mt-6 space-y-4">
                            <li class="flex items-center"><svg class="w-6 h-6 mr-4 text-amber-800" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg><a href="${GMAIL_URL}" class="text-stone-600 hover:text-amber-800">${ARTIST_EMAIL}</a></li>
                            <li class="flex items-center"><svg class="w-6 h-6 mr-4 text-amber-800" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg><a href="tel:${ARTIST_PHONE}" class="text-stone-600 hover:text-amber-800">${ARTIST_PHONE}</a></li>
                         </ul>
                         <div class="mt-8 flex space-x-6">
                            <a href="${TIKTOK_URL}" target="_blank" class="text-stone-500 hover:text-amber-800 transition duration-300 transform hover:scale-110" aria-label="TikTok"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.94-6.37-2.96-2.2-2.95-2.2-6.82 0-9.78 1.59-2.09 4.19-3.26 6.78-3.14.09 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01-1.92.01-3.84-.02-5.75z"></path></svg></a>
                            <a href="${WHATSAPP_URL}" target="_blank" class="text-stone-500 hover:text-amber-800 transition duration-300 transform hover:scale-110" aria-label="WhatsApp"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.89-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.03l-1.214 4.429 4.562-1.195z"></path></svg></a>
                            <a href="${INSTAGRAM_URL}" target="_blank" class="text-stone-500 hover:text-amber-800 transition duration-300 transform hover:scale-110" aria-label="Instagram"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919.058-1.265.07-1.645.07-4.85zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a>
                         </div>
                    </div>
                </div>
            </section>
        `;
        initScrollAnimations();
    }

    // --- SLIDESHOW LOGIC ---
    let slideIndex = 1;
    function initSlideshow() {
        showSlides(slideIndex);
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        if (prev && next) {
            prev.addEventListener('click', () => plusSlides(-1));
            next.addEventListener('click', () => plusSlides(1));
            // Auto-play
            let slideInterval = setInterval(() => plusSlides(1), 5000);
            // Optional: Pause slideshow on hover
            const slideshowContainer = document.querySelector('.slideshow-container');
            slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slideshowContainer.addEventListener('mouseleave', () => slideInterval = setInterval(() => plusSlides(1), 5000));
        }
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        if(slides.length === 0) return; // Don't run if no slides
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
    }


    // --- SCROLL ANIMATION LOGIC ---
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate');
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

            animatedElements.forEach(el => observer.observe(el));
        } else { // Fallback for older browsers
            animatedElements.forEach(el => el.classList.add('is-visible'));
        }
    }

    // --- NAVIGATION LOGIC ---
    function updateActiveLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        if (activeLink) {
             document.querySelectorAll(activeLink).forEach(link => link.classList.add('active'));
        }
    }

    function navigateTo(sectionRenderer, activeLink) {
        sectionRenderer();
        updateActiveLink(activeLink);
        window.scrollTo(0, 0); // Scroll to top on new section
        mobileMenu.classList.add('hidden'); // Hide mobile menu on navigation
    }

    brandLogo.addEventListener('click', () => navigateTo(renderHomeSection, '#nav-home, #mobile-nav-home'));
    navHome.addEventListener('click', () => navigateTo(renderHomeSection, '#nav-home, #mobile-nav-home'));
    navGallery.addEventListener('click', () => navigateTo(renderGallerySection, '#nav-gallery, #mobile-nav-gallery'));
    navAbout.addEventListener('click', () => navigateTo(renderAboutSection, '#nav-about, #mobile-nav-about'));

    mobileNavHome.addEventListener('click', () => navigateTo(renderHomeSection, '#nav-home, #mobile-nav-home'));
    mobileNavGallery.addEventListener('click', () => navigateTo(renderGallerySection, '#nav-gallery, #mobile-nav-gallery'));
    mobileNavAbout.addEventListener('click', () => navigateTo(renderAboutSection, '#nav-about, #mobile-nav-about'));

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- INITIALIZATION ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
    navigateTo(renderHomeSection, '#nav-home, #mobile-nav-home'); // Start on the home page
});
