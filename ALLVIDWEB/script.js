// =========================================================================
// CRITICAL AREA: AAP APNI WEBSITE KI VIDEOS, NEWS AUR PRODUCTS YAHA SE BADAL SAKTE HAIN
// =========================================================================

// Yahan aap apne videos add ya badal sakte hain. Ek sample dummy video link, aur do pixabay ke live status links add kiye hain.
const myVideos = [
    {
        title: "Sample HTML5 Big Buck Bunny Movie Stream",
        category: "Entertainment",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "ALLVIDWEB",
        category: "Technology",
        videoUrl: "videos/allvidweb_intro_video.mp4"
    },
    {
        title: "Cyberpunk City Network Traffic Display",
        category: "Gaming",
        videoUrl: "https://cdn.pixabay.com/video/2023/10/18/185526-875605342_large.mp4"
    }
];

// Yahan aap apni Daily News headlines badal sakte hain
const myNews = [
    {
        title: "Artificial Intelligence Next Milestone Reached in 2026",
        description: "New decentralized interface web systems are now fully active without requiring bulky backend setup blocks globally.",
        imageUrl: "https://picsum.photos/id/1px/500/300"
    },
    {
        title: "Global Tech Summit 3D Visual Architecture Showcase",
        description: "UI Designers are rapidly adopting glassmorphism theme layouts to give websites a futuristic gaming dashboard look.",
        imageUrl: "https://picsum.photos/id/2px/500/300"
    }
];

// Yahan aap market items/products aur unke daam (Price) badal sakte hain
const myProducts = [
    {
        title: "Cyberpunk Premium Holographic VR Set",
        price: "$299.99",
        imageUrl: "https://picsum.photos/id/3px/500/300"
    },
    {
        title: "AllVidWeb Premium Developer Mech Keyboard",
        price: "$124.50",
        imageUrl: "https://picsum.photos/id/4px/500/300"
    }
];


// =========================================================================
// CORE RENDER LOGIC ENGINE (Yeh arrays se data lekar HTML templates banata hai)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Setup
    const hamburger = document.getElementById('hamburger-menu');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('mobile-open');
    });

    // 2. Load and Render Content Sections
    renderVideos(myVideos);
    renderNews(myNews);
    renderProducts(myProducts);

    // 3. Setup Dynamic Live Search Input Filter for Videos Section
    const searchInput = document.getElementById('video-search');
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        
        // Videos array ko name ke anusar filter kar rahe hain
        const filteredVideos = myVideos.filter(video => 
            video.title.toLowerCase().includes(searchText)
        );
        renderVideos(filteredVideos);
    });
});

// Videos Render karne ka code function
function renderVideos(videoArray) {
    const videoGrid = document.getElementById('videos-grid');
    videoGrid.innerHTML = ''; // Pehle grid khali karein
    
    videoArray.forEach(v => {
        const card = document.createElement('div');
        card.className = 'glass-card visual-3d-effect-card';
        card.innerHTML = `
            <video src="${v.videoUrl}" controls class="card-media"></video>
            <span class="card-tag">${v.category}</span>
            <h3 class="card-title">${v.title}</h3>
        `;
        videoGrid.appendChild(card);
    });
    apply3DTiltAnimation(); // Naye cards par 3D Mouse movement effect active karein
}

// News Render karne ka code function
function renderNews(newsArray) {
    const newsGrid = document.getElementById('news-grid');
    newsGrid.innerHTML = '';
    
    newsArray.forEach(n => {
        const card = document.createElement('div');
        card.className = 'glass-card visual-3d-effect-card';
        card.innerHTML = `
            <img src="${n.imageUrl}" class="card-media" alt="News Image">
            <span class="card-tag" style="color: var(--neon-purple);">Breaking News</span>
            <h3 class="card-title">${n.title}</h3>
            <p class="card-desc">${n.description}</p>
        `;
        newsGrid.appendChild(card);
    });
    apply3DTiltAnimation();
}

// Products Render karne ka code function
function renderProducts(productArray) {
    const marketGrid = document.getElementById('market-grid');
    marketGrid.innerHTML = '';
    
    productArray.forEach(p => {
        const card = document.createElement('div');
        card.className = 'glass-card visual-3d-effect-card';
        card.innerHTML = `
            <img src="${p.imageUrl}" class="card-media" alt="Product Image">
            <span class="card-tag" style="color: var(--neon-green);">In Stock</span>
            <h3 class="card-title">${p.title}</h3>
            <div class="card-row-flex">
                <span class="price">${p.price}</span>
                <a href="#" class="btn-sm" onclick="alert('Order placed successfully for ${p.title}!')">Buy Now</a>
            </div>
        `;
        marketGrid.appendChild(card);
    });
    apply3DTiltAnimation();
}

// =========================================================================
// HARDCORE MATH LOGIC FOR PURE 3D INTERACTIVE INTERACTION MOUSE TILT
// =========================================================================
function apply3DTiltAnimation() {
    const targetCards = document.querySelectorAll('.visual-3d-effect-card');
    
    targetCards.forEach(card => {
        // Jab user card par mouse ghumaye tab mouse coordinates ke anusar card tilt hoga
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            
            // Mouse ki exact position card ke andar calculate ho rahi hai
            const xPos = e.clientX - cardRect.left;
            const yPos = e.clientY - cardRect.top;
            
            // Card ka center nikal rahe hain
            const centerHorizontal = cardRect.width / 2;
            const centerVertical = cardRect.height / 2;
            
            // Angles calculate karne ka core 3D matrix math formula
            const rotationDegreesX = (centerVertical - yPos) / 12; // Controls Up/Down Tilt Angle
            const rotationDegreesY = (xPos - centerHorizontal) / 12; // Controls Left/Right Tilt Angle
            
            // Webkit inline layout transformation apply karein
            card.style.transform = `perspective(800px) rotateX(${rotationDegreesX}deg) rotateY(${rotationDegreesY}deg) translateY(-6px)`;
        });
        
        // Jab mouse card se baahar nikle, toh card wapas apni jagah normal flat ho jaye
        card.style.transition = "transform 0.1s ease-out";
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.transition = "transform 0.5s ease"; // Smooth normal back transform transition
        });
    });
}