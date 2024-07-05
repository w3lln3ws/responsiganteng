document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Terima kasih! Pesan Anda telah dikirim.');
        document.getElementById('order-confirmation').classList.remove('hidden');
        document.getElementById('contactForm').reset();
    });

    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', () => {
            openModal(button.dataset.product);
        });
    });

    document.querySelector('.close').addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == document.getElementById('orderModal')) {
            closeModal();
        }
    });

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const orderData = {
            name: document.getElementById('orderName').value,
            email: document.getElementById('orderEmail').value,
            phone: document.getElementById('orderPhone').value,
            instagram: document.getElementById('orderInstagram').value,
            product: document.getElementById('orderProduct').value
        };

        saveOrderToFile(orderData);

        closeModal();
        document.getElementById('order-confirmation').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('order-confirmation').classList.add('hidden');
        }, 3000);
    });

    window.addEventListener('scroll', () => {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    document.getElementById('scrollTopBtn').addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    showSlides();
});

function openModal(product) {
    document.getElementById('orderProduct').value = product;
    document.getElementById('orderModal').style.display = "block";
}

function closeModal() {
    document.getElementById('orderModal').style.display = "none";
}

function saveOrderToFile(orderData) {
    const text = `Order Details:\n
Name: ${orderData.name}
Email: ${orderData.email}
Phone: ${orderData.phone}
Instagram: ${orderData.instagram}
Product: ${orderData.product}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = "order_" + Date.now() + ".txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
}

let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000);
}

function plusSlides(n) {
    slideIndex += n;
    let slides = document.getElementsByClassName("mySlides");
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}