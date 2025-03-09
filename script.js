const players = {
    'oosterwolde': {
        name: 'Jayden Oosterwolde',
        position: 'stoper',
        style: 'agresif',
        strength: 'çeviklik',
        image: 'images/oosterwolde.png',
        description: 'Sol bek ve stoper pozisyonlarında oynayan, agresif savunma anlayışı ve çevikliğiyle öne çıkan modern bir defans oyuncusun!',
        stats: {
            matches: 28,
            goals: 1,
            assists: 2
        }
    },
    'tadic': {
        name: 'Dusan Tadic',
        position: 'kanat',
        style: 'sakin',
        strength: 'teknik',
        image: 'images/tadic.png',
        description: 'Sahada teknik kapasiten ve sakin oyun kurman ile takımına liderlik eden bir oyuncusun!',
        stats: {
            matches: 25,
            goals: 10,
            assists: 15
        }
    },
    'szymanski': {
        name: 'Sebastian Szymanski',
        position: 'orta saha',
        style: 'teknik',
        strength: 'çeviklik',
        image: 'images/szymanski.png',
        description: 'Orta sahada teknik kapasiten ve çevikliğinle fark yaratan bir oyuncusun!'
    },
    'dzeko': {
        name: 'Edin Dzeko',
        position: 'forvet',
        style: 'agresif',
        strength: 'güç',
        image: 'images/dzeko.png',
        description: 'Ceza sahası içinde güçlü ve agresif oyun stilinle rakip savunmaların korkulu rüyasısın!'
    },
    'fred': {
        name: 'Fred',
        position: 'orta saha',
        style: 'lider',
        strength: 'teknik',
        image: 'images/fred.png',
        description: 'Orta sahada liderlik vasfın ve teknik kapasiten ile takımının beyni gibisin!'
    }
};

function showResult() {
    const matchedPlayer = findMatchingPlayer(userAnswers);
    
    questionScreen.classList.remove('active');
    resultScreen.classList.add('active', 'animate__fadeIn');
    
    const playerImage = document.getElementById('player-image');
    playerImage.src = matchedPlayer.image;
    playerImage.alt = matchedPlayer.name;
    
    document.getElementById('player-result').textContent = matchedPlayer.name;
    document.getElementById('player-description').textContent = matchedPlayer.description;
    
    // İstatistikleri ekleyelim
    const statsDiv = document.createElement('div');
    statsDiv.className = 'player-stats animate__animated animate__fadeIn';
    statsDiv.innerHTML = `
        <h4>Bu Sezon</h4>
        <p class="stats-line">
            📌 ${matchedPlayer.stats.matches} maç 
            ⚽ ${matchedPlayer.stats.goals} gol 
            🎯 ${matchedPlayer.stats.assists} asist
        </p>
    `;
    
    // İstatistikleri description ile result arasına ekleyelim
    const resultContent = document.querySelector('.result-content');
    resultContent.insertBefore(statsDiv, document.getElementById('player-description'));
    
    crowdSound.src = 'export.mp3';
    crowdSound.play();

    // Konfeti efekti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#fdb913']
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#041e42']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // İndirme butonu ekle
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-primary download-btn';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Sonucu İndir';
    downloadBtn.onclick = captureResult;
    resultScreen.appendChild(downloadBtn);
}

// Sonucu resim olarak kaydetme fonksiyonu
function captureResult() {
    const resultElement = document.getElementById('result-screen');
    const downloadBtn = resultElement.querySelector('.download-btn');
    const restartBtn = resultElement.querySelector('#restart-btn');
    
    // Butonları geçici olarak gizle
    downloadBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    
    html2canvas(resultElement, {
        scale: 2, // Daha yüksek kalite için
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // Butonları tekrar göster
        downloadBtn.style.display = 'block';
        restartBtn.style.display = 'block';
        
        // Canvas'ı resme çevir ve indir
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'fb-test-sonucum.png';
        link.href = image;
        link.click();
    });
}

const questions = [
    {
        id: 1,
        text: 'Sahada hangi pozisyonda oynamayı tercih edersin?',
        options: [
            { text: 'Stoper', value: 'stoper' },
            { text: 'Kanat', value: 'kanat' },
            { text: 'Orta Saha', value: 'orta saha' },
            { text: 'Forvet', value: 'forvet' }
        ]
    },
    {
        id: 2,
        text: 'Oyun stilini nasıl tanımlarsın?',
        options: [
            { text: 'Agresif', value: 'agresif' },
            { text: 'Sakin', value: 'sakin' },
            { text: 'Teknik', value: 'teknik' },
            { text: 'Lider', value: 'lider' }
        ]
    },
    {
        id: 3,
        text: 'En güçlü özelliğin hangisi?',
        options: [
            { text: 'Hız', value: 'hız' },
            { text: 'Güç', value: 'güç' },
            { text: 'Teknik', value: 'teknik' },
            { text: 'Çeviklik', value: 'çeviklik' }
        ]
    }
];

// Gerekli DOM elementleri
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const restartBtn = document.getElementById('restart-btn');

// Ses efekleri
const clickSound = new Audio();
clickSound.src = 'click.wav';
clickSound.volume = 0.5;
const crowdSound = new Audio('export.mp3');

// Kullanıcı cevapları
let currentQuestion = 0;
let userAnswers = {};

// Animasyon sınıfları
const fadeIn = 'animate__animated animate__fadeIn';
const fadeOut = 'animate__animated animate__fadeOut';

// Quiz'i başlat
startBtn.addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value;
    if (!playerName) {
        alert('Lütfen adınızı girin!');
        return;
    }
    
    // Karşılama mesajını ekle
    const welcomeMessage = document.createElement('h3');
    welcomeMessage.textContent = `Merhaba, ${playerName}`;
    welcomeMessage.classList.add('animate__animated', 'animate__fadeIn', 'welcome-text');
    questionScreen.insertBefore(welcomeMessage, questionText);
    
    startScreen.classList.add('animate__fadeOut');
    setTimeout(() => {
        startScreen.classList.remove('active');
        questionScreen.classList.add('active', 'animate__fadeIn');
        showQuestion(currentQuestion);
    }, 500);
});

// Soruyu göster
function showQuestion(index) {
    if (index >= questions.length) {
        showResult();
        return;
    }

    const question = questions[index];
    questionText.textContent = question.text;
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn animate__animated animate__fadeInUp';
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(option.value));
        optionsContainer.appendChild(button);
    });
}

// Cevap seçme
function selectOption(answer) {
    clickSound.play();
    userAnswers[questions[currentQuestion].id] = answer;

    // Seçilen butona parlama efekti
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        if (btn.textContent === answer) {
            btn.style.animation = 'glow 0.5s ease-in-out';
        }
    });

    // Geçiş süresini kısalttım
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            showResult();
        }
    }, 300); // Gecikmeyi 300ms'ye düşürdüm
}

// Eşleşen oyuncuyu bul
function findMatchingPlayer(answers) {
    for (let playerId in players) {
        const player = players[playerId];
        if (player.position === answers[1] && 
            player.style === answers[2] && 
            player.strength === answers[3]) {
            return player;
        }
    }
    // Eğer tam eşleşme bulunamazsa en yakın eşleşmeyi döndür
    return findClosestMatch(answers);
}

// En yakın eşleşmeyi bul
function findClosestMatch(answers) {
    let bestMatch = null;
    let maxMatches = 0;

    for (let playerId in players) {
        const player = players[playerId];
        let matches = 0;

        if (player.position === answers[1]) matches++;
        if (player.style === answers[2]) matches++;
        if (player.strength === answers[3]) matches++;

        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = player;
        }
    }

    return bestMatch;
}

// Yeniden başlat
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = {};
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
});


