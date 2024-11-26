<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]); // Kullanıcı adını al ve temizle

    // Yanıt olarak HTML döndür
    echo "
        <h2>Merhaba, $username!</h2>
        <p>Hangi renkleri seviyorsunuz?</p>
        <button class='color-btn' data-color='Sarı'>Sarı</button>
        <button class='color-btn' data-color='Lacivert'>Lacivert</button>
        <div id='next-step'></div>
    ";
}
?>
