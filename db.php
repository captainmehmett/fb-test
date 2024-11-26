<?php
$servername = "localhost"; // Sunucu adresi (genelde localhost)
$username = "root"; // Varsayılan kullanıcı adı
$password = ""; // Varsayılan şifre (boş olabilir)
$dbname = "fb_test"; // Oluşturduğunuz veritabanı adı

// Bağlantıyı kur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}
?>
