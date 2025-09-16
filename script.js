// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactive elements
    initThemeToggle();
    initNavigation();
    initHeroAnimation();
    initFeatureCards();
    initDemoAnimation();
    initTestimonialSlider();
    initScrollAnimations();
    initBlockchainBackground();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use default (light)
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Toggle theme classes on body
            body.classList.toggle('light-theme');
            body.classList.toggle('dark-theme');
            
            // Save theme preference to localStorage
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }
}

// Mobile Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Menu toggle element:', menuToggle);
    console.log('Nav links element:', navLinks);
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu toggle clicked!');
            
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            console.log('Nav links classes:', navLinks.className);
            console.log('Menu toggle classes:', this.className);
        });
    } else {
        console.error('Menu toggle or nav links not found!');
    }
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Hero Section Animation
function initHeroAnimation() {
    const dashboardAnimation = document.querySelector('.dashboard-animation');
    
    if (dashboardAnimation) {
        // Create animated crypto dashboard elements
        createDashboardElements(dashboardAnimation);
    }
}

// Create animated dashboard elements
function createDashboardElements(container) {
    // Create SVG for dashboard
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // Add gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'chart-gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#00c2ff');
    stop1.setAttribute('stop-opacity', '0.8');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#00c2ff');
    stop2.setAttribute('stop-opacity', '0.1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Create chart lines
    const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    chartGroup.setAttribute('transform', 'translate(0, 200)');
    
    // Generate random chart data
    const points = generateChartPoints(20, 100);
    
    // Create path for line
    const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    linePath.setAttribute('d', createLinePath(points));
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute('stroke', '#00c2ff');
    linePath.setAttribute('stroke-width', '3');
    linePath.setAttribute('stroke-linecap', 'round');
    linePath.setAttribute('stroke-linejoin', 'round');
    
    // Create area under the line
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    areaPath.setAttribute('d', createAreaPath(points));
    areaPath.setAttribute('fill', 'url(#chart-gradient)');
    
    // Add animation to the paths
    linePath.style.strokeDasharray = linePath.getTotalLength();
    linePath.style.strokeDashoffset = linePath.getTotalLength();
    linePath.style.animation = 'dash 2s ease-in-out forwards';
    
    areaPath.style.opacity = '0';
    areaPath.style.animation = 'fadeIn 1s ease-in-out 1s forwards';
    
    chartGroup.appendChild(areaPath);
    chartGroup.appendChild(linePath);
    svg.appendChild(chartGroup);
    
    // Add the SVG to the container
    container.appendChild(svg);
    
    // Create dashboard UI elements
    createDashboardUI(container);
    
    // Add keyframes for the animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dash {
            to {
                stroke-dashoffset: 0;
            }
        }
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Generate random chart points
function generateChartPoints(numPoints, maxHeight) {
    const points = [];
    const width = 600;
    const step = width / (numPoints - 1);
    
    for (let i = 0; i < numPoints; i++) {
        const x = i * step;
        // Create a somewhat realistic crypto chart pattern
        const y = -Math.random() * maxHeight * (0.5 + Math.sin(i / 3) * 0.5);
        points.push({ x, y });
    }
    
    return points;
}

// Create SVG path for line
function createLinePath(points) {
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
        const { x, y } = points[i];
        path += ` L ${x} ${y}`;
    }
    
    return path;
}

// Create SVG path for area under the line
function createAreaPath(points) {
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
        const { x, y } = points[i];
        path += ` L ${x} ${y}`;
    }
    
    path += ` L ${points[points.length - 1].x} 0 L ${points[0].x} 0 Z`;
    
    return path;
}

// Create dashboard UI elements
function createDashboardUI(container) {
    // Create dashboard header
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    header.style.position = 'absolute';
    header.style.top = '20px';
    header.style.left = '20px';
    header.style.right = '20px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    
    const title = document.createElement('div');
    title.className = 'dashboard-title';
    title.textContent = 'Crypto Analytics';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.color = '#fff';
    
    const controls = document.createElement('div');
    controls.className = 'dashboard-controls';
    controls.style.display = 'flex';
    controls.style.gap = '10px';
    
    for (let i = 0; i < 3; i++) {
        const control = document.createElement('div');
        control.className = 'dashboard-control';
        control.style.width = '10px';
        control.style.height = '10px';
        control.style.borderRadius = '50%';
        control.style.backgroundColor = i === 0 ? '#00f090' : i === 1 ? '#00c2ff' : '#7928ca';
        controls.appendChild(control);
    }
    
    header.appendChild(title);
    header.appendChild(controls);
    container.appendChild(header);
    
    // Create price indicators
    const priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';
    priceContainer.style.position = 'absolute';
    priceContainer.style.top = '60px';
    priceContainer.style.left = '20px';
    priceContainer.style.display = 'flex';
    priceContainer.style.flexDirection = 'column';
    priceContainer.style.gap = '15px';
    
    const cryptos = [
        { name: 'BTC', price: '$42,384.21', change: '+2.4%' },
        { name: 'ETH', price: '$2,271.09', change: '+1.8%' },
        { name: 'SOL', price: '$103.57', change: '+5.2%' }
    ];
    
    cryptos.forEach(crypto => {
        const priceItem = document.createElement('div');
        priceItem.className = 'price-item';
        priceItem.style.display = 'flex';
        priceItem.style.alignItems = 'center';
        priceItem.style.gap = '10px';
        
        const cryptoName = document.createElement('div');
        cryptoName.className = 'crypto-name';
        cryptoName.textContent = crypto.name;
        cryptoName.style.fontWeight = 'bold';
        cryptoName.style.color = '#fff';
        cryptoName.style.width = '40px';
        
        const cryptoPrice = document.createElement('div');
        cryptoPrice.className = 'crypto-price';
        cryptoPrice.textContent = crypto.price;
        cryptoPrice.style.color = '#a0a3b1';
        
        const cryptoChange = document.createElement('div');
        cryptoChange.className = 'crypto-change';
        cryptoChange.textContent = crypto.change;
        cryptoChange.style.color = '#00f090';
        cryptoChange.style.fontWeight = 'bold';
        
        priceItem.appendChild(cryptoName);
        priceItem.appendChild(cryptoPrice);
        priceItem.appendChild(cryptoChange);
        priceContainer.appendChild(priceItem);
    });
    
    container.appendChild(priceContainer);
    
    // Add animation to make elements appear with delay
    header.style.opacity = '0';
    priceContainer.style.opacity = '0';
    
    setTimeout(() => {
        header.style.transition = 'opacity 0.5s ease-in-out';
        header.style.opacity = '1';
    }, 1500);
    
    setTimeout(() => {
        priceContainer.style.transition = 'opacity 0.5s ease-in-out';
        priceContainer.style.opacity = '1';
    }, 2000);
}

// Feature Cards Animation
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add delay to stagger animations
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 * index);
    });
}

// Demo Section Animation
function initDemoAnimation() {
    const demoVisual = document.querySelector('.demo-visual');
    
    if (demoVisual) {
        // Create animated demo elements
        createDemoElements(demoVisual);
    }
}

// Create animated demo elements
function createDemoElements(container) {
    // Create a simple animated interface for the demo
    const demoContent = document.createElement('div');
    demoContent.className = 'demo-content';
    demoContent.style.position = 'relative';
    demoContent.style.width = '100%';
    demoContent.style.height = '100%';
    demoContent.style.overflow = 'hidden';
    demoContent.style.borderRadius = 'inherit';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'demo-header';
    header.style.padding = '20px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    
    const title = document.createElement('div');
    title.textContent = 'Marketing Dashboard';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    
    const tabs = document.createElement('div');
    tabs.style.display = 'flex';
    tabs.style.gap = '20px';
    
    const tabNames = ['Overview', 'Campaigns', 'Analytics', 'Audience'];
    tabNames.forEach((name, index) => {
        const tab = document.createElement('div');
        tab.textContent = name;
        tab.style.cursor = 'pointer';
        tab.style.padding = '5px 0';
        tab.style.position = 'relative';
        
        if (index === 0) {
            tab.style.color = '#00c2ff';
            
            const indicator = document.createElement('div');
            indicator.style.position = 'absolute';
            indicator.style.bottom = '0';
            indicator.style.left = '0';
            indicator.style.width = '100%';
            indicator.style.height = '2px';
            indicator.style.backgroundColor = '#00c2ff';
            tab.appendChild(indicator);
        } else {
            tab.style.color = '#a0a3b1';
        }
        
        tabs.appendChild(tab);
    });
    
    header.appendChild(title);
    header.appendChild(tabs);
    
    // Create main content area
    const mainContent = document.createElement('div');
    mainContent.style.padding = '20px';
    mainContent.style.display = 'grid';
    mainContent.style.gridTemplateColumns = 'repeat(2, 1fr)';
    mainContent.style.gap = '20px';
    
    // Create metric cards
    const metrics = [
        { title: 'Total Reach', value: '2.4M', change: '+12%' },
        { title: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
        { title: 'Engagement', value: '18.5%', change: '+5.3%' },
        { title: 'ROI', value: '287%', change: '+32%' }
    ];
    
    metrics.forEach((metric, index) => {
        const card = document.createElement('div');
        card.style.backgroundColor = 'rgba(26, 29, 45, 0.8)';
        card.style.borderRadius = '12px';
        card.style.padding = '20px';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        const metricTitle = document.createElement('div');
        metricTitle.textContent = metric.title;
        metricTitle.style.color = '#a0a3b1';
        metricTitle.style.fontSize = '14px';
        metricTitle.style.marginBottom = '10px';
        
        const metricValue = document.createElement('div');
        metricValue.textContent = metric.value;
        metricValue.style.fontSize = '28px';
        metricValue.style.fontWeight = 'bold';
        metricValue.style.marginBottom = '5px';
        
        const metricChange = document.createElement('div');
        metricChange.textContent = metric.change;
        metricChange.style.color = '#00f090';
        metricChange.style.fontSize = '14px';
        metricChange.style.fontWeight = 'bold';
        
        card.appendChild(metricTitle);
        card.appendChild(metricValue);
        card.appendChild(metricChange);
        mainContent.appendChild(card);
        
        // Animate cards with delay
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Create chart section
    const chartSection = document.createElement('div');
    chartSection.style.gridColumn = '1 / -1';
    chartSection.style.backgroundColor = 'rgba(26, 29, 45, 0.8)';
    chartSection.style.borderRadius = '12px';
    chartSection.style.padding = '20px';
    chartSection.style.marginTop = '20px';
    chartSection.style.height = '250px';
    chartSection.style.opacity = '0';
    chartSection.style.transform = 'translateY(20px)';
    
    const chartTitle = document.createElement('div');
    chartTitle.textContent = 'Campaign Performance';
    chartTitle.style.marginBottom = '20px';
    chartTitle.style.fontSize = '16px';
    chartTitle.style.fontWeight = 'bold';
    
    const chartContent = document.createElement('div');
    chartContent.style.height = 'calc(100% - 40px)';
    chartContent.style.position = 'relative';
    
    // Create simple chart bars
    const barContainer = document.createElement('div');
    barContainer.style.display = 'flex';
    barContainer.style.alignItems = 'flex-end';
    barContainer.style.justifyContent = 'space-between';
    barContainer.style.height = '100%';
    barContainer.style.padding = '0 10px';
    
    const campaigns = ['Email', 'Social', 'Content', 'Referral', 'Direct', 'Organic'];
    campaigns.forEach((campaign, index) => {
        const barGroup = document.createElement('div');
        barGroup.style.display = 'flex';
        barGroup.style.flexDirection = 'column';
        barGroup.style.alignItems = 'center';
        barGroup.style.width = `${100 / campaigns.length}%`;
        
        const barHeight = 30 + Math.random() * 60; // Random height between 30-90%
        
        const bar = document.createElement('div');
        bar.style.width = '20px';
        bar.style.height = '0';
        bar.style.backgroundColor = index % 2 === 0 ? '#00c2ff' : '#7928ca';
        bar.style.borderRadius = '4px 4px 0 0';
        bar.style.marginBottom = '10px';
        bar.style.transition = 'height 1s ease';
        
        const label = document.createElement('div');
        label.textContent = campaign;
        label.style.fontSize = '12px';
        label.style.color = '#a0a3b1';
        label.style.transform = 'rotate(-45deg)';
        label.style.transformOrigin = 'left top';
        label.style.whiteSpace = 'nowrap';
        
        barGroup.appendChild(bar);
        barGroup.appendChild(label);
        barContainer.appendChild(barGroup);
        
        // Animate bars with delay
        setTimeout(() => {
            bar.style.height = `${barHeight}%`;
        }, 1000 + (index * 100));
    });
    
    chartContent.appendChild(barContainer);
    chartSection.appendChild(chartTitle);
    chartSection.appendChild(chartContent);
    
    // Animate chart section
    setTimeout(() => {
        chartSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        chartSection.style.opacity = '1';
        chartSection.style.transform = 'translateY(0)';
    }, 900);
    
    mainContent.appendChild(chartSection);
    
    demoContent.appendChild(header);
    demoContent.appendChild(mainContent);
    container.appendChild(demoContent);
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide and activate the corresponding dot
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Event listeners for prev/next buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    // Auto-rotate slides every 5 seconds
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .features-grid, .demo-visual, .insights-grid, .testimonials-slider, .cta-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Blockchain Background Animation
function initBlockchainBackground() {
    const blockchainBg = document.querySelector('.blockchain-bg');
    
    if (blockchainBg) {
        createBlockchainAnimation(blockchainBg);
    }
}

// Create blockchain animation
function createBlockchainAnimation(container) {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Create nodes and connections
    const nodes = [];
    const numNodes = 30;
    
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 2 + Math.random() * 3,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: i % 3 === 0 ? '#00c2ff' : i % 3 === 1 ? '#7928ca' : '#00f090'
        });
    }
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < nodes.length; j++) {
                const otherNode = nodes[j];
                const dx = otherNode.x - node.x;
                const dy = otherNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}