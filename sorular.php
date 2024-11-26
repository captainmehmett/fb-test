<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $step = htmlspecialchars($_POST["step"]); // Adım bilgisini al ve temizle

    // Adım numarasına göre yeni içerik döndür
    if ($step == "1") {
        echo "
            <p>Hangi pozisyonu istersiniz?</p>
            <button class='position-btn' data-position='Defansif'>Defansif</button>
            <button class='position-btn' data-position='Ofansif'>Ofansif</button>
            <div id='next-step'></div>
        ";
    } elseif ($step == "2") {
        echo "
            <p>Kendinizi nasıl tanımlarsınız?</p>
            <button class='trait-btn' data-trait='Sakin'>Sakin</button>
            <button class='trait-btn' data-trait='Komik'>Komik</button>
            <button class='trait-btn' data-trait='Samimi'>Samimi</button>
            <button class='trait-btn' data-trait='Sinirli'>Sinirli</button>
            <button class='trait-btn' data-trait='Çabuk Ayak Uyduran'>Çabuk Ayak Uyduran</button>
            <div id='next-step'></div>
        ";
    } elseif ($step == "3") {
        echo "
            <p>Futbolcu olsan maçına kimin gelmesini isterdin?</p>
            <button class='guest-btn' data-guest='Ailem'>Ailem</button>
            <button class='guest-btn' data-guest='Sevgilim'>Sevgilim</button>
            <button class='guest-btn' data-guest='Eşim ve Çocuklarım'>Eşim ve Çocuklarım</button>
            <div id='next-step'></div>
        ";
    } else {
        echo "<p>Test tamamlandı! Teşekkürler.</p>";
    }
}
?>
