// ===== DANH SÁCH PHẦN QUÀ =====
// Bạn có thể chỉnh sửa danh sách này dễ dàng
const GIFT_LIST = [
    { type: 'money', value: 520000, emoji: '💘', text: '+520.000 ₫', desc: '520 - wǒ ài nǐ 💕' },
    { type: 'money', value: 1314000, emoji: '💘', text: '+1.314.000 ₫', desc: '1314 - Trọn đời trọn kiếp bên nhao em nhá' },
    { type: 'money', value: 5201314, emoji: '💘', text: '+5.201.314 ₫', desc: '5201314 - Anh sẽ iu em trọn đời trọn kiếp 💞' },
    { type: 'money', value: 999999, emoji: '💘', text: '+999.999 ₫', desc: '999 - Biểu trưng cho tình iu vĩnh cửu 😇' },
    { type: 'money', value: 1001, emoji: '💘', text: '+1001 ₫', desc: '1001 - Duy nhất, chỉ iu có một mình em thui ☝️' },
    { type: 'money', value: 111, emoji: '💘', text: '+111 ₫', desc: '111 - Một lòng một dạ' },
    { type: 'money', value: 222222, emoji: '💘', text: '+222.222 ₫', desc: '222 - Mình mãi mãi bên nhau em nhé 🙆' },
    { type: 'money', value: 1000, emoji: '💵', text: '+1.000 ₫', desc: 'Ít thôi nhưng tình cảm đong đầy! 💖' },
    { type: 'money', value: 50000, emoji: '💵', text: '+50.000 ₫', desc: 'Mua tà tưa cho ny nhoaa 🧋' },
    { type: 'money', value: 221022, emoji: '💵', text: '+221.022 ₫', desc: 'Ngày gì đó em nhỉ, ngày gì nhỉ??? 🙈' },
    { type: 'money', value: 9999999, emoji: '💵', text: '9.999.999 ₫', desc: 'Trúng sổ số à iem 🫣' },
    { type: 'money', value: 1000000, emoji: '💵', text: '1.000.000 ₫', desc: '💵 🪙 💰 💎 💸 💵 💴 💶 💷 💳 🎲' },
    { type: 'money', value: -99999, emoji: '😢', text: '-99.999 ₫', desc: 'Ối dồi ôi! Rơi xiền rồi iem ơi... Nhưng anh vẫn yêu em! 💔' },
    { type: 'money', value: -500000, emoji: '😭', text: '-500.000 ₫', desc: 'Ối giời ơi! Phá sản rồi... Nhưng còn tình yêu mà! 😭💕' },

    { type: 'multiply', value: 2, emoji: '✨', text: 'Nhân 2 tổng tiền', desc: 'Ma thuật x2! Số tiền hiện tại của em sẽ tăng gấp đôi! ✨🎰' },
    { type: 'multiply', value: 3, emoji: '🌟', text: 'Nhân 3 tổng tiền', desc: 'Siêu ma thuật x3! Em vừa trúng bùa yêu tài lộc! 🌟💫' },

    { type: 'divide', value: 2, emoji: '💔', text: 'Chia 2 tổng tiền', desc: 'Ối! Phép toán tàn nhẫn... Tiền của em bị cắt đôi rồi! 💔😢' },

    { type: 'percent', value: -30, emoji: '📉', text: 'Trừ 30% tổng tiền', desc: 'Thuế tình yêu đây! Rơi 30% nhưng anh vẫn yêu em nhiều hơn! 📉💕' },
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
    hasStarted: false,
    giftMapping: [] // Map giữa boxNumber và gift (shuffled)
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
        
        // Khởi tạo gift mapping nếu chưa có
        if (gameState.giftMapping.length === 0) {
            initGiftMapping();
        }
        
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
function initGiftMapping() {
    // Shuffle GIFT_LIST để random vị trí
    const shuffled = [...GIFT_LIST].sort(() => Math.random() - 0.5);
    gameState.giftMapping = shuffled;
    saveGameState();
}

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
        // Lấy phần quà từ mapping (mỗi hộp có 1 quà duy nhất)
        const gift = getGiftForBox(boxNumber);
        
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

function getGiftForBox(boxNumber) {
    // Lấy quà theo boxNumber từ giftMapping (index = boxNumber - 1)
    const gift = gameState.giftMapping[boxNumber - 1];
    return { ...gift };
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
        hasStarted: false,
        giftMapping: []
    };
    
    // Shuffle lại gift mapping cho lần chơi mới
    initGiftMapping();
    
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
            // Đảm bảo giftMapping tồn tại
            if (!gameState.giftMapping || gameState.giftMapping.length === 0) {
                initGiftMapping();
            }
        }
    } catch (e) {
        console.error('Lỗi khi tải dữ liệu:', e);
        gameState = {
            totalMoney: 0,
            openedBoxes: [],
            history: [],
            hasStarted: false,
            giftMapping: []
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
