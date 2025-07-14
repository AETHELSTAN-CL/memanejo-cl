<?php
// Esto normalmente vendría de una base de datos
$datos = [
  "Toyota" => ["Yaris", "Corolla", "Hilux"],
  "Hyundai" => ["Accent", "Elantra", "Tucson"],
  "Kia" => ["Rio", "Cerato", "Sportage"]
];

header('Content-Type: application/json');
echo json_encode($datos);
?>