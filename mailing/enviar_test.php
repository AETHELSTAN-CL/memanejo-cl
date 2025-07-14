<?php
// Ruta del archivo CSV
$archivo = fopen("testcontacto.csv", "r");

// Leer la primera línea (encabezados)
$encabezados = fgetcsv($archivo, 1000, ";");

// Leer solo la primera línea de datos
if (($datos = fgetcsv($archivo, 1000, ";")) !== false) {
    $nombre  = $datos[0];
    $correo  = $datos[1];
    $modelo  = $datos[4];

    // Armado del mensaje HTML
    $asunto = "🚗 ¡Tenemos repuestos para tu $modelo!";
    $mensaje = "
    <html>
    <head><title>Repuestos disponibles</title></head>
    <body style='font-family: Arial, sans-serif;'>
        <h2>Hola $nombre,</h2>
        <p>Tenemos repuestos compatibles para tu <strong>$modelo</strong>.</p>
        <p>Haz clic para ver el catálogo y cotizar en línea:</p>
        <p><a href='https://www.memanejo.cl/Catalogo/indexcatalogo.html' style='background: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;'>Ver catálogo</a></p>
        <p style='color: #777;'>Gracias por confiar en nosotros.</p>
    </body>
    </html>";

    // Cabeceras del correo
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: leonardo.azo@memanejo.cl" . "\r\n";

    if (mail($correo, $asunto, $mensaje, $headers)) {
        echo "✅ Correo enviado a $correo con éxito.";
    } else {
        echo "❌ Error al enviar a $correo.";
    }
} else {
    echo "⚠️ No se encontraron datos en el archivo.";
}

fclose($archivo);
?>