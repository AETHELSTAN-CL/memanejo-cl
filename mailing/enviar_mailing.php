<?php
/**
 * Envío masivo de correos a partir de CSV con PHPMailer (SMTP).
 *
 * Uso en navegador:
 *   https://www.memanejo.cl/mailing/enviar_mailing.php?modelo=elantra
 *
 * CSV esperado:
 *   Nombre;Email;Celular;Modelo
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- PHPMailer ---
require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

// --- Configuración segura ---
$config = require '/home/memanej1/mail/.config_mail.php';

// --- Variables SMTP ---
$smtpHost = $config['SMTP_HOST'];
$smtpUser = $config['SMTP_USER'];
$smtpPass = $config['SMTP_PASS'];
$smtpPort = $config['SMTP_PORT'];

// --- Validar parámetro ---
if (!isset($_GET['modelo'])) {
    die("❌ Falta el parámetro 'modelo'. Ejemplo: enviar_mailing.php?modelo=elantra");
}

$modelo = strtolower(trim($_GET['modelo']));

// --- Rutas de archivos ---
$csvFile = __DIR__ . "/contactos-$modelo.csv";
$plantillaFile = __DIR__ . "/plantillas/promo_hyundai.html";

// --- Verificar existencia ---
if (!file_exists($csvFile)) die("❌ No se encontró el archivo CSV: $csvFile");
if (!file_exists($plantillaFile)) die("❌ No se encontró la plantilla HTML: $plantillaFile");

// --- Leer plantilla ---
$plantilla = file_get_contents($plantillaFile);

// --- Abrir CSV ---
$archivo = fopen($csvFile, "r");
$encabezados = fgetcsv($archivo, 1000, ";");

// --- Contadores ---
$enviados = 0;
$errores = 0;

// --- Recorrer contactos ---
while (($datos = fgetcsv($archivo, 1000, ";")) !== false) {
    if (count($datos) < 4) continue;

    $nombre = trim($datos[0]);
    $correo = trim($datos[1]);
    $modeloVehiculo = trim($datos[3]);

    // --- Personalizar mensaje ---
    $mensaje = str_replace(
        ["%%NOMBRE%%", "%%MODELO%%", "%%EMAIL%%"],
        [$nombre, $modeloVehiculo, $correo],
        $plantilla
    );

    // --- Crear mailer ---
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $smtpHost;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $smtpPort;

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        $mail->setFrom($smtpUser, 'memanejo.cl');
        $mail->addReplyTo($smtpUser, 'memanejo.cl');
        $mail->addAddress($correo, $nombre);

        $mail->isHTML(true);
        $mail->Subject = "Repuestos originales para tu Hyundai $modeloVehiculo";
        $mail->Body    = $mensaje;
        $mail->AltBody = "Hola $nombre,\n\nRepuestos originales para tu Hyundai $modeloVehiculo.\nRevisa nuestro catálogo online en www.memanejo.cl\n\nmemanejo.cl";

        $mail->send();
        echo "✅ Correo enviado a $correo<br>";
        $enviados++;
    } catch (Exception $e) {
        echo "❌ Error al enviar a $correo: {$mail->ErrorInfo}<br>";
        $errores++;
    }

    usleep(500000); // 0.5 segundos entre envíos
}

fclose($archivo);

// --- Resumen ---
echo "<hr>";
echo "Total enviados: $enviados<br>";
echo "Errores: $errores<br>";