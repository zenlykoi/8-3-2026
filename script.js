// ===== DANH SÁCH PHẦN QUÀ =====
// Bạn có thể chỉnh sửa danh sách này dễ dàng
const GIFT_LIST = [
    { type: 'money', value: 1000, emoji: '💵', text: '+1.000 ₫', desc: 'Một chút tiền nhỏ để thêm vào ví yêu thương nha! 💕' },
    { type: 'money', value: 10000, emoji: '💵', text: '+10.000 ₫', desc: 'Mua được ly trà sữa rồi đấy! 🧋' },
    { type: 'money', value: 20000, emoji: '💰', text: '+20.000 ₫', desc: 'Đủ tiền ăn sáng ngon lành cho em! 🥐' },
    { type: 'money', value: 50000, emoji: '💰', text: '+50.000 ₫', desc: 'Bữa cơm trưa đầy đủ dành cho em yêu! 🍜' },
    { type: 'money', value: 100000, emoji: '💎', text: '+100.000 ₫', desc: 'Wow! Một khoản tiền kha khá đấy nhé! 💰' },
    { type: 'money', value: 200000, emoji: '💎', text: '+200.000 ₫', desc: 'Đi shopping nhẹ nhàng luôn nè! 🛍️' },
    { type: 'money', value: 500000, emoji: '👑', text: '+500.000 ₫', desc: 'Jackpot lớn rồi! Anh giàu quá đi mất! 👑✨' },
    { type: 'money', value: -50000, emoji: '😢', text: '-50.000 ₫', desc: 'Ối dồi ôi! Mất tiền rồi em ơi... Nhưng anh vẫn yêu em! 💔' },
    { type: 'money', value: -100000, emoji: '😭', text: '-100.000 ₫', desc: 'Ối giời ơi! Phá sản rồi... Nhưng còn tình yêu mà! 😭💕' },
    { type: 'money', value: 150000, emoji: '💰', text: '+150.000 ₫', desc: 'Ăn tối sang chảnh và xem phim nhé! 🍿🎬' },

    { type: 'money', value: 2000, emoji: '💵', text: '+2.000 ₫', desc: 'Ít thôi nhưng tình cảm đong đầy! 💖' },
    { type: 'money', value: 3000, emoji: '💵', text: '+3.000 ₫', desc: 'Từng đồng một tích góp cũng thành núi vàng! 💰' },
    { type: 'money', value: 4000, emoji: '💵', text: '+4.000 ₫', desc: 'Tiền ít tình nhiều em nhé! 🥰' },
    { type: 'money', value: 5000, emoji: '💵', text: '+5.000 ₫', desc: 'Mua được que kem cho em đây! 🍦' },

    { type: 'multiply', value: 2, emoji: '✨', text: 'Nhân 2 tổng tiền', desc: 'Ma thuật x2! Số tiền hiện tại của em sẽ tăng gấp đôi! ✨🎰' },
    { type: 'multiply', value: 3, emoji: '🌟', text: 'Nhân 3 tổng tiền', desc: 'Siêu ma thuật x3! Em vừa trúng bùa yêu tài lộc! 🌟💫' },

    { type: 'divide', value: 2, emoji: '💔', text: 'Chia 2 tổng tiền', desc: 'Ối! Phép toán tàn nhẫn... Tiền của em bị cắt đôi rồi! 💔😢' },

    { type: 'percent', value: -30, emoji: '📉', text: 'Trừ 30% tổng tiền', desc: 'Thuế tình yêu đây! Mất 30% nhưng anh vẫn yêu em nhiều hơn! 📉💕' },
    { type: 'percent', value: 50, emoji: '📈', text: '+50% tổng tiền', desc: 'Lãi suất tình yêu! Tài khoản của em tăng 50%! 📈💰' },

    { type: 'special', value: 0, emoji: '😘', text: '+1 Nụ hôn miễn phí', desc: 'Một nụ hôn ngọt ngào không giới hạn thời gian! 💋😘' },
    { type: 'special', value: 0, emoji: '🤗', text: '+1 Ôm 100 phút', desc: 'Ôm em thật lâu thật chặt, không muốn buông ra! 🤗💕' },
    { type: 'special', value: 0, emoji: '🚿', text: '+1 Tắm cho iem', desc: 'Anh sẽ phục vụ em tắm thật thoải mái nha! 🚿✨' },
    { type: 'special', value: 0, emoji: '🧽', text: '+1 Rửa bát', desc: 'Anh sẽ rửa bát sạch sẽ sau bữa ăn cho em! 🧽💪' },
    { type: 'special', value: 0, emoji: '🧹', text: '+1 Dọn dẹp phòng', desc: 'Anh sẽ dọn dẹp phòng gọn gàng ngăn nắp luôn! 🧹✨' },
];

// ===== CONSTANTS =====
const TOTAL_BOXES = 24;
const MAX_OPENS = 11; // Số hộp quà tối đa được mở (thay đổi số này để điều chỉnh)
const STORAGE_KEY = 'gift_game_data';

// ===== STATE =====
let gameState = {
    totalMoney: 0,
    openedBoxes: [],
    history: [],
    hasStarted: false
};

// ===== DOM ELEMENTS =====
const welcomeScreen = document.getElementById('welcome-screen');
const giftScreen = document.getElementById('gift-screen');
const startBtn = document.getElementById('start-btn');
const giftsGrid = document.getElementById('gifts-grid');
const totalMoneyEl = document.getElementById('total-money');
const opensLeftEl = document.getElementById('opens-left');
const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const closeHistoryBtn = document.getElementById('close-history');
const historyList = document.getElementById('history-list');
const resetBtn = document.getElementById('reset-btn');
const confettiCanvas = document.getElementById('confetti-canvas');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadGameState();
    initEventListeners();
    setupConfetti();
    
    // Kiểm tra nếu đã vào màn mở quà rồi thì hiển thị luôn
    if (gameState.hasStarted) {
        welcomeScreen.classList.remove('active');
        giftScreen.classList.add('active');
        window.scrollTo(0, 0);
        initGiftsGrid();
    }
});

// ===== EVENT LISTENERS =====
function initEventListeners() {
    startBtn.addEventListener('click', () => {
        gameState.hasStarted = true;
        saveGameState();
        welcomeScreen.classList.remove('active');
        giftScreen.classList.add('active');
        window.scrollTo(0, 0);
        initGiftsGrid();
    });

    historyBtn.addEventListener('click', () => {
        showHistory();
    });

    closeHistoryBtn.addEventListener('click', () => {
        historyModal.classList.remove('active');
    });

    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) {
            historyModal.classList.remove('active');
        }
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử và chơi lại từ đầu?')) {
            resetGame();
        }
    });
}

// ===== GIFTS GRID =====
function initGiftsGrid() {
    giftsGrid.innerHTML = '';
    
    for (let i = 1; i <= TOTAL_BOXES; i++) {
        const box = createGiftBox(i);
        giftsGrid.appendChild(box);
    }
    
    updateTotalMoney();
    updateRemainingOpens();
}

function createGiftBox(boxNumber) {
    const boxDiv = document.createElement('div');
    boxDiv.className = 'gift-box';
    boxDiv.dataset.boxNumber = boxNumber;
    
    const openedBox = gameState.openedBoxes.find(box => box.boxNumber === boxNumber);
    
    if (openedBox) {
        // Hộp đã mở
        boxDiv.classList.add('opened');
        boxDiv.innerHTML = `
            <div class="gift-content">
                <span class="gift-emoji">${openedBox.gift.emoji}</span>
                <div class="gift-text">${openedBox.gift.text}</div>
                <button class="gift-info-btn" data-box="${boxNumber}">ℹ️</button>
            </div>
        `;
        
        // Add event listener cho nút info
        const infoBtn = boxDiv.querySelector('.gift-info-btn');
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showGiftInfo(openedBox.gift, infoBtn);
        });
    } else {
        // Hộp chưa mở
        boxDiv.innerHTML = `
            <span class="gift-icon">🎁</span>
            <div class="gift-number">Hộp ${boxNumber}</div>
        `;
        
        boxDiv.addEventListener('click', () => openBox(boxNumber, boxDiv));
    }
    
    return boxDiv;
}

// ===== OPEN BOX LOGIC =====
function openBox(boxNumber, boxElement) {
    // Kiểm tra đã mở chưa
    if (gameState.openedBoxes.find(box => box.boxNumber === boxNumber)) {
        return;
    }
    
    // Kiểm tra giới hạn số lần mở
    if (gameState.openedBoxes.length >= MAX_OPENS) {
        alert(`Em chỉ được mở ${MAX_OPENS} hộp quà thôi nhé! 🎁💕\n\nMuốn chơi tiếp thì phải xóa lịch sử và chơi lại từ đầu nha! 😘`);
        return;
    }
    
    // Animation mở hộp
    boxElement.classList.add('opening');
    
    setTimeout(() => {
        // Random phần quà
        const gift = getRandomGift();
        
        // Cập nhật state
        const openedBox = {
            boxNumber,
            gift,
            timestamp: new Date().toISOString()
        };
        
        gameState.openedBoxes.push(openedBox);
        gameState.history.push(openedBox);
        
        // Tính toán tiền mới
        const oldMoney = gameState.totalMoney;
        gameState.totalMoney = calculateNewMoney(gameState.totalMoney, gift);
        
        // Lưu vào localStorage
        saveGameState();
        
        // Update UI
        boxElement.classList.remove('opening');
        boxElement.classList.add('opened');
        boxElement.innerHTML = `
            <div class="gift-content">
                <span class="gift-emoji">${gift.emoji}</span>
                <div class="gift-text">${gift.text}</div>
                <button class="gift-info-btn">ℹ️</button>
            </div>
        `;
        
        // Add event listener cho nút info
        const infoBtn = boxElement.querySelector('.gift-info-btn');
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showGiftInfo(gift, infoBtn);
        });
        
        // Update tổng tiền với animation
        updateTotalMoney();
        updateRemainingOpens();
        
        // Hiệu ứng confetti nếu là quà lớn
        if (shouldShowConfetti(gift)) {
            launchConfetti();
        }
        
        // Remove click listener
        boxElement.style.cursor = 'default';
        
    }, 600);
}

function getRandomGift() {
    const randomIndex = Math.floor(Math.random() * GIFT_LIST.length);
    return { ...GIFT_LIST[randomIndex] };
}

function calculateNewMoney(currentMoney, gift) {
    let newMoney = currentMoney;
    
    switch (gift.type) {
        case 'money':
            newMoney += gift.value;
            break;
        case 'multiply':
            newMoney *= gift.value;
            break;
        case 'divide':
            newMoney = Math.floor(newMoney / gift.value);
            break;
        case 'percent':
            newMoney += Math.floor(newMoney * gift.value / 100);
            break;
        case 'special':
            // Không ảnh hưởng tiền
            break;
    }
    
    // Không cho phép âm
    return Math.max(0, Math.floor(newMoney));
}

function shouldShowConfetti(gift) {
    if (gift.type === 'money' && gift.value >= 100000) return true;
    if (gift.type === 'multiply' && gift.value >= 2) return true;
    if (gift.type === 'percent' && gift.value > 0) return true;
    return false;
}

// ===== UPDATE UI =====
function updateTotalMoney() {
    totalMoneyEl.classList.add('updated');
    totalMoneyEl.textContent = formatMoney(gameState.totalMoney);
    
    setTimeout(() => {
        totalMoneyEl.classList.remove('updated');
    }, 600);
}

function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + ' ₫';
}

function updateRemainingOpens() {
    const remaining = MAX_OPENS - gameState.openedBoxes.length;
    opensLeftEl.textContent = remaining;
    
    // Đổi màu nếu còn ít
    if (remaining <= 2) {
        opensLeftEl.style.color = '#ff4757';
    } else if (remaining <= 5) {
        opensLeftEl.style.color = '#ffa502';
    } else {
        opensLeftEl.style.color = '#ff1493';
    }
}

// ===== GIFT INFO TOOLTIP =====
let currentTooltip = null;

function showGiftInfo(gift, buttonElement) {
    // Xóa tooltip cũ nếu có
    if (currentTooltip) {
        currentTooltip.remove();
    }
    
    // Tạo tooltip mới
    const tooltip = document.createElement('div');
    tooltip.className = 'gift-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <span class="tooltip-emoji">${gift.emoji}</span>
            <span class="tooltip-title">${gift.text}</span>
        </div>
        <div class="tooltip-desc">${gift.desc || 'Món quà đặc biệt dành cho em! 💝'}</div>
        <div class="tooltip-arrow"></div>
    `;
    
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;
    
    // Tính vị trí tooltip
    const buttonRect = buttonElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top = buttonRect.top - tooltipRect.height - 10;
    let left = buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2);
    
    // Kiểm tra nếu tooltip bị tràn ra ngoài màn hình
    if (top < 10) {
        top = buttonRect.bottom + 10;
        tooltip.classList.add('bottom');
    }
    
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    
    tooltip.style.top = top + window.scrollY + 'px';
    tooltip.style.left = left + 'px';
    
    // Animation
    setTimeout(() => tooltip.classList.add('show'), 10);
    
    // Đóng khi click ra ngoài
    setTimeout(() => {
        document.addEventListener('click', closeTooltip);
    }, 100);
}

function closeTooltip() {
    if (currentTooltip) {
        currentTooltip.classList.remove('show');
        setTimeout(() => {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        }, 300);
        document.removeEventListener('click', closeTooltip);
    }
}

// ===== HISTORY =====
function showHistory() {
    historyList.innerHTML = '';
    
    if (gameState.history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">Chưa có lịch sử mở quà nào 🎁</div>';
    } else {
        // Hiển thị từ mới nhất đến cũ nhất
        const reversedHistory = [...gameState.history].reverse();
        
        reversedHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const time = formatTime(item.timestamp);
            
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <span class="history-box-number">🎁 Hộp ${item.boxNumber}</span>
                    <span class="history-time">${time}</span>
                </div>
                <div class="history-gift">${item.gift.emoji} ${item.gift.text}</div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }
    
    historyModal.classList.add('active');
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
}

// ===== RESET =====
function resetGame() {
    localStorage.removeItem(STORAGE_KEY);
    gameState = {
        totalMoney: 0,
        openedBoxes: [],
        history: [],
        hasStarted: false
    };
    
    historyModal.classList.remove('active');
    giftScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}

// ===== LOCAL STORAGE =====
function saveGameState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
        console.error('Lỗi khi lưu dữ liệu:', e);
    }
}

function loadGameState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            gameState = JSON.parse(saved);
            // Đảm bảo hasStarted tồn tại (cho tương thích với dữ liệu cũ)
            if (gameState.hasStarted === undefined) {
                gameState.hasStarted = false;
            }
        }
    } catch (e) {
        console.error('Lỗi khi tải dữ liệu:', e);
        gameState = {
            totalMoney: 0,
            openedBoxes: [],
            history: [],
            hasStarted: false
        };
    }
}

// ===== CONFETTI EFFECT =====
let confettiParticles = [];
let confettiAnimationId = null;

function setupConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
}

function launchConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffd700', '#ff6347', '#da70d6', '#87cefa'];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    if (!confettiAnimationId) {
        animateConfetti();
    }
}

function animateConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles = confettiParticles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravity
        particle.rotation += particle.rotationSpeed;
        
        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
        
        // Keep particle if still visible
        return particle.y < confettiCanvas.height + 10;
    });
    
    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
        confettiAnimationId = null;
    }
}
