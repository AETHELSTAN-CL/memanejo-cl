<?php
header('Content-Type: application/json');

$codigo = strtoupper($_GET['codigo'] ?? '');
$correo = strtolower($_GET['correo'] ?? '');
$jsonFile = __DIR__ . '/data/codigos.json';

if (!file_exists($jsonFile)) {
    echo json_encode(['status'=>'invalido']);
    exit;
}

$codigos = json_decode(file_get_contents($jsonFile), true);
$encontrado = false;

foreach ($codigos as &$item) {
    if ($item['codigo'] === $codigo && strtolower($item['correo']) === $correo) {
        $encontrado = true;
        if ($item['qr_generado']) {
            echo json_encode(['status'=>'qr_usado', 'nombre'=>$item['nombre']]);
            exit;
        } else {
            $item['qr_generado'] = true;
            file_put_contents($jsonFile, json_encode($codigos, JSON_PRETTY_PRINT));
            echo json_encode(['status'=>'ok', 'nombre'=>$item['nombre'], 'codigo'=>$codigo]);
            exit;
        }
    }
}

if (!$encontrado) {
    echo json_encode(['status'=>'invalido']);
}