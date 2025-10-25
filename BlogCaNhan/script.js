// Smooth scrolling cho các liên kết
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate sections khi scroll vào view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Áp dụng animation cho các post cards
document.addEventListener('DOMContentLoaded', function() {
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Toggle nội dung bài viết (mở rộng/thu gọn)
    const postTitles = document.querySelectorAll('.post-title');
    postTitles.forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.post-content');
            if (content) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            }
        });
    });

    // Hiệu ứng hover cho skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Thêm active class cho navigation dựa trên trang hiện tại
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Scroll to top button
let scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#fff';
    this.style.color = '#000';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#000';
    this.style.color = '#fff';
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu form
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Hiển thị thông báo thành công
            alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
            
            // Reset form
            contactForm.reset();
            
            // Trong thực tế, bạn có thể gửi dữ liệu đến server
            console.log('Form data:', formData);
        });
    }
});

// Learn More Button - Show/Hide Content
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const contentSections = document.getElementById('contentSections');
    let isContentVisible = false;

    if (learnMoreBtn && contentSections) {
        learnMoreBtn.addEventListener('click', function() {
            isContentVisible = !isContentVisible;
            
            if (isContentVisible) {
                // Show content
                contentSections.classList.remove('hidden');
                contentSections.style.display = 'block';
                
                // Smooth scroll to content
                setTimeout(() => {
                    contentSections.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
                
                // Change button text and icon
                learnMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Thu Gọn';
            } else {
                // Hide content
                contentSections.classList.add('hidden');
                
                // Scroll back to top
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
                
                // Change button text and icon back
                setTimeout(() => {
                    learnMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Tìm Hiểu Thêm';
                }, 500);
                
                // Hide after animation
                setTimeout(() => {
                    contentSections.style.display = 'none';
                }, 500);
            }
        });
    }
});

// Blog Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card-grid');

    if (filterButtons.length > 0 && postCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter posts
                postCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all') {
                        // Show all posts
                        card.classList.remove('hidden');
                        // Re-trigger animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 10);
                    } else if (category === filterValue) {
                        // Show matching posts
                        card.classList.remove('hidden');
                        // Re-trigger animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 10);
                    } else {
                        // Hide non-matching posts
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close-modal');
    
    // Lấy tất cả các certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    // Thêm sự kiện click cho mỗi certificate card
    certificateCards.forEach(function(card) {
        const img = card.querySelector('.certificate-image img');
        const title = card.querySelector('.certificate-info h3');
        
        card.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.textContent = title ? title.textContent : img.alt;
        });
    });
    
    // Đóng modal khi click vào nút X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Đóng modal khi click bên ngoài hình ảnh
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Đóng modal khi nhấn phím ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
