// Fungsi untuk mengunggah dan menampilkan foto profil
document.addEventListener('DOMContentLoaded', function() {
    // Elemen-elemen DOM
    const photoInput = document.getElementById('photo-input');
    const uploadBtn = document.getElementById('upload-btn');
    const removeBtn = document.getElementById('remove-btn');
    const profilePhoto = document.getElementById('profile-photo');
    const photoCircle = document.getElementById('photo-circle');
    const placeholderIcon = document.querySelector('.placeholder-icon');
    
    // Cek apakah ada foto yang tersimpan di localStorage
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
        profilePhoto.classList.remove('hidden');
        placeholderIcon.classList.add('hidden');
        removeBtn.classList.remove('hidden');
    } else if (profilePhoto.src && profilePhoto.src.includes('poto lintg.jpeg')) {
        // Jika foto default ada (tapi belum diupload baru)
        placeholderIcon.classList.add('hidden');
        profilePhoto.classList.remove('hidden');
        removeBtn.classList.remove('hidden');
    }
    
    // Event listener untuk tombol upload
    uploadBtn.addEventListener('click', function() {
        photoInput.click();
    });
    
    // Event listener untuk input file
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                
                // Tampilkan gambar
                profilePhoto.src = imageUrl;
                profilePhoto.classList.remove('hidden');
                placeholderIcon.classList.add('hidden');
                removeBtn.classList.remove('hidden');
                
                // Simpan ke localStorage
                localStorage.setItem('profilePhoto', imageUrl);
                
                // Tampilkan pesan sukses
                showMessage('Foto berhasil diunggah!', 'success');
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Event listener untuk tombol hapus foto
    removeBtn.addEventListener('click', function() {
        // Hapus foto
        profilePhoto.src = '';
        profilePhoto.classList.add('hidden');
        placeholderIcon.classList.remove('hidden');
        removeBtn.classList.add('hidden');
        
        // Hapus dari localStorage
        localStorage.removeItem('profilePhoto');
        
        // Reset input file
        photoInput.value = '';
        
        // Tampilkan pesan
        showMessage('Foto telah dihapus', 'info');
    });
    
    // Efek hover untuk item keterampilan
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Efek hover untuk tag hobi
    const hobbyTags = document.querySelectorAll('.hobby-tag');
    hobbyTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animasi untuk timeline item
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Fungsi untuk menampilkan pesan sementara
    function showMessage(text, type) {
        // Hapus pesan sebelumnya jika ada
        const existingMessage = document.querySelector('.message-toast');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Buat elemen pesan baru
        const message = document.createElement('div');
        message.className = `message-toast message-${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        // Warna berdasarkan jenis pesan
        if (type === 'success') {
            message.style.backgroundColor = '#4caf50';
        } else if (type === 'error') {
            message.style.backgroundColor = '#f44336';
        } else {
            message.style.backgroundColor = '#2196f3';
        }
        
        // Tambahkan ke body
        document.body.appendChild(message);
        
        // Hapus setelah 3 detik
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
    
    // Tambahkan style animasi untuk pesan
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Efek klik untuk ikon media sosial
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Efek ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(