document.getElementById("usernameForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Formun sayfa yenilemesini durdur

    const username = document.getElementById("username").value; // Kullanıcı adını al
    const contentDiv = document.getElementById("content"); // İçerik alanını seç

    // AJAX isteği gönder
    fetch("test.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "username=" + encodeURIComponent(username),
    })
        .then((response) => response.text()) // Yanıtı al
        .then((data) => {
            contentDiv.innerHTML = data; // İlk soruyu içerik alanına yazdır
            addColorSelectionListeners(); // Renk seçimi dinleyicilerini ekle
        })
        .catch((error) => {
            console.error("Hata:", error); // Hata durumunda konsola yazdır
        });
});

function addColorSelectionListeners() {
    const colorButtons = document.querySelectorAll(".color-btn");
    const nextStepDiv = document.getElementById("next-step");

    colorButtons.forEach((button) => {
        button.addEventListener("click", function () {
            selectedColor = this.getAttribute("data-color"); // Bu satırı ekleyin
            colorButtons.forEach((btn) => btn.classList.remove("selected"));
            this.classList.add("selected");

            nextStepDiv.innerHTML = `<button id="continue-btn" data-step="1">Devam Et</button>`;
            document.getElementById("continue-btn").addEventListener("click", loadNextStep);
        });
    });
}

function loadNextStep(event) {
    const step = event.target.getAttribute("data-step");
    const contentDiv = document.getElementById("content");

    // AJAX ile bir sonraki adımı yükle
    fetch("sorular.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "step=" + encodeURIComponent(step),
    })
        .then((response) => response.text())
        .then((data) => {
            contentDiv.innerHTML = data;

            switch (step) {
                case "1":
                    addPositionSelectionListeners();
                    break;
                case "2":
                    addTraitSelectionListeners();
                    break;
                case "3":
                    addGuestSelectionListeners();
                    break;
                default:
                    finalizeTest();
            }
        })
        .catch((error) => {
            console.error("Hata:", error);
        });
}

function addPositionSelectionListeners() {
    const positionButtons = document.querySelectorAll(".position-btn");
    const nextStepDiv = document.getElementById("next-step");

    positionButtons.forEach((button) => {
        button.addEventListener("click", function () {
            selectedPosition = this.getAttribute("data-position");
            positionButtons.forEach((btn) => btn.classList.remove("selected"));
            this.classList.add("selected");

            nextStepDiv.innerHTML = `<button id="continue-btn" data-step="2">Devam Et</button>`;
            document.getElementById("continue-btn").addEventListener("click", loadNextStep);
        });
    });
}

function addTraitSelectionListeners() {
    const traitButtons = document.querySelectorAll(".trait-btn");
    const nextStepDiv = document.getElementById("next-step");

    traitButtons.forEach((button) => {
        button.addEventListener("click", function () {
            selectedTrait = this.getAttribute("data-trait");
            traitButtons.forEach((btn) => btn.classList.remove("selected"));
            this.classList.add("selected");

            nextStepDiv.innerHTML = `<button id="continue-btn" data-step="3">Devam Et</button>`;
            document.getElementById("continue-btn").addEventListener("click", loadNextStep);
        });
    });
}

function addGuestSelectionListeners() {
    const guestButtons = document.querySelectorAll(".guest-btn");
    const nextStepDiv = document.getElementById("next-step");

    guestButtons.forEach((button) => {
        button.addEventListener("click", function () {
            selectedGuest = this.getAttribute("data-guest");
            guestButtons.forEach((btn) => btn.classList.remove("selected"));
            this.classList.add("selected");

            nextStepDiv.innerHTML = `<button id="continue-btn" data-step="4">Testi Tamamla</button>`;
            document.getElementById("continue-btn").addEventListener("click", finalizeTest);
        });
    });
}

function finalizeTest() {
    const contentDiv = document.getElementById("content");

    // Tüm seçimleri konsola yazdır
    console.log("Seçilen Renk:", selectedColor);
    console.log("Seçilen Pozisyon:", selectedPosition);
    console.log("Seçilen Tanım:", selectedTrait);
    console.log("Seçilen Misafir:", selectedGuest);

    // Sonuç ekranını göster
    contentDiv.innerHTML = `
        <div class="result-text">
            Test Sonucu Açıklanıyor...
        </div>
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    `;

    // 3 saniye sonra resmi göster
    setTimeout(() => {
        let playerImage = "";

        if (selectedColor === "Sarı" && 
            selectedPosition === "Ofansif" && 
            selectedTrait === "Sakin" && 
            selectedGuest === "Eşim ve Çocuklarım") {
            playerImage = "images/tadic.jpg";
        }

        if (playerImage) {
            contentDiv.innerHTML = `
                <div class="result-text">
                    Test Sonucu Açıklandı!
                    
                </div>
                <div class="player-image">
                    <img src="${playerImage}" alt="Oyuncu Resmi">
                </div>
            `;
        }
    }, 3000); // 3 saniye bekle
}
