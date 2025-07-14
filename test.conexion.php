<?php
$conexion = new mysqli('localhost', 'memanej1_usuario_agenda', 'Leomcfly6969', 'memanej1_agenda_clases');

if ($conexion->connect_error) {
    die('❌ Conexión fallida: ' . $conexion->connect_error);
} else {
    echo '✅ ¡Conexión exitosa!';
}
?>