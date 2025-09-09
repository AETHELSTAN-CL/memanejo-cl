<?php
$jsonFile = __DIR__ . '/data/codigos.json';

if (!file_exists($jsonFile)) {
    echo "No se encontró el archivo de códigos.";
    exit;
}

$codigos = json_decode(file_get_contents($jsonFile), true);

// Resetear todos los QR a no usados
foreach ($codigos as &$item) {
    $item['qr_usado'] = false;
}
unset($item);

// Guardar cambios
file_put_contents($jsonFile, json_encode($codigos, JSON_PRETTY_PRINT));

echo "Todos los códigos han sido reseteados.";