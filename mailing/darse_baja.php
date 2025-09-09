<?php
if (!isset($_GET['email'])) {
    die("❌ Correo no proporcionado");
}

$email = trim($_GET['email']);
$archivo = __DIR__ . "/contactos-elantra.csv";

if (!file_exists($archivo)) {
    die("❌ Archivo CSV no encontrado");
}

// Leer todas las filas
$filas = file($archivo);
$nuevasFilas = [];

foreach ($filas as $i => $linea) {
    if ($i == 0) { // encabezado
        $nuevasFilas[] = $linea;
        continue;
    }
    if (stripos($linea, $email) === false) {
        $nuevasFilas[] = $linea;
    }
}

// Guardar CSV actualizado
file_put_contents($archivo, implode("", $nuevasFilas));

echo "✅ $email ha sido dado de baja correctamente.";
?>