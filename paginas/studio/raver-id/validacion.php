<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verificación RAVER ID</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #121212;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      text-align: center;
    }
    h1 { margin-bottom: 2rem; }
    .mensaje {
      font-size: 1.5rem;
      padding: 1rem 2rem;
      border-radius: 10px;
      margin-top: 1rem;
    }
    .valido { background-color: #1abc9c; }
    .usado { background-color: #e74c3c; }
    .invalido { background-color: #f39c12; }
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      border: none;
      background-color: #3498db;
      color: #fff;
    }
    button:disabled { background-color: #555; cursor: default; }
  </style>
</head>
<body>
  <h1>Verificación de Código</h1>
  <?php
    $codigo = strtoupper($_GET['codigo'] ?? '');
    $jsonFile = __DIR__ . '/data/codigos.json';
    $ingresosFile = __DIR__ . '/data/ingresos.json';
    $mensaje = "Código inválido";
    $clase = "invalido";
    $permitirConfirmar = false;

    // Crear archivo de ingresos si no existe
    if (!file_exists($ingresosFile)) file_put_contents($ingresosFile, json_encode([]));

    if (file_exists($jsonFile)) {
        $codigos = json_decode(file_get_contents($jsonFile), true);
        foreach ($codigos as &$item) {
            if ($item['codigo'] === $codigo) {
                if (!isset($item['qr_usado'])) $item['qr_usado'] = false;

                if ($item['qr_usado']) {
                    $mensaje = "Código válido para: " . $item['nombre'];
                    $clase = "valido";
                } else {
                    $mensaje = "Código válido para: " . $item['nombre'];
                    $clase = "valido";
                }

                $permitirConfirmar = true;
                break;
            }
        }
        unset($item);
    }
    echo "<div class='mensaje $clase'>$mensaje</div>";

    if ($permitirConfirmar) {
        echo "<form method='POST'>
                <input type='hidden' name='codigo' value='$codigo'>
                <button type='submit' name='confirmar'>Confirmar ingreso</button>
              </form>";
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['confirmar'])) {
        $codigoConfirm = strtoupper($_POST['codigo']);
        $ingresos = json_decode(file_get_contents($ingresosFile), true);

        foreach ($codigos as &$item) {
            if ($item['codigo'] === $codigoConfirm) {
                $item['qr_usado'] = true; // marcar como usado
                $ingresos[] = [
                    'codigo' => $item['codigo'],
                    'nombre' => $item['nombre'],
                    'fecha' => date('Y-m-d H:i:s')
                ];
                file_put_contents($jsonFile, json_encode($codigos, JSON_PRETTY_PRINT));
                file_put_contents($ingresosFile, json_encode($ingresos, JSON_PRETTY_PRINT));
                $mensaje = "Ingreso confirmado para: " . $item['nombre'];
                echo "<div class='mensaje valido'>$mensaje</div>";
                break;
            }
        }
        unset($item);
    }
  ?>
</body>
</html>