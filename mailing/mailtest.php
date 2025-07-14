<?php
$to = "leo.aguirre@me.com, leonardo.azo@memanejo.cl";  // Cambia aquí por tu correo de prueba
$subject = "Promoción de repuestos Hyundai";

$nombre = "Leonardo";
$modelo = "Hyundai Tucson";

$message = "
<html>
<head>
  <title>Promoción de Repuestos Hyundai</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333; margin: 0; padding: 20px;}
    .container { background: white; max-width: 600px; margin: auto; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);}
    h2 { color: #0056b3; }
    p { font-size: 16px; line-height: 1.5;}
    a.button { display: inline-block; background-color: #0056b3; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;}
    a.button:hover { background-color: #003d80;}
    .footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center;}
  </style>
</head>
<body>
  <div class='container'>
    <h2>¡Repuestos Hyundai para tu vehículo!</h2>
    <p>Hola <strong>$nombre</strong>,</p>
    <p>Queremos que tu Hyundai siga funcionando como el primer día. Por eso tenemos disponibles repuestos originales y de alta calidad para tu <strong>$modelo</strong>.</p>
    <p>Visita nuestro catálogo exclusivo y cotiza en línea de forma rápida y segura.</p>
    <a href='https://www.memanejo.cl/Catalogo/indexcatalogo.html' class='button' target='_blank' rel='noopener'>Ver Catálogo Hyundai</a>
    <p class='footer'>Gracias por confiar en Memanejo. Para consultas, responde a este correo o visítanos en nuestra web.</p>
  </div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Memanejo <leonardo.azo@memanejo.cl>\r\n";
$headers .= "Reply-To: leonardo.azo@memanejo.cl\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo "✅ Correo enviado correctamente a $to";
} else {
    echo "❌ Error al enviar el correo";
}
?>