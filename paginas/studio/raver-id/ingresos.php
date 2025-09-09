<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ingresos Confirmados - RAVER ID</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #121212;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      padding: 2rem;
    }
    h1 {
      margin-bottom: 2rem;
      text-align: center;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 500px;
      margin-bottom: 2rem;
    }
    th, td {
      border: 1px solid #fff;
      padding: 0.5rem 1rem;
      text-align: center;
    }
    th {
      background-color: #3498db;
    }
    tr:nth-child(even) {
      background-color: #1a1a1a;
    }
    .mensaje {
      font-size: 1.2rem;
      margin-top: 1rem;
      color: #f39c12;
    }
    .actualizar {
      padding: 0.5rem 1rem;
      background-color: #1abc9c;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .actualizar:hover {
      background-color: #16a085;
    }
  </style>
</head>
<body>
  <h1>Ingresos Confirmados</h1>
  <?php
    $ingresosFile = __DIR__ . '/data/ingresos.json';
    if (!file_exists($ingresosFile)) {
        echo "<div class='mensaje'>No hay ingresos confirmados aún.</div>";
    } else {
        $ingresos = json_decode(file_get_contents($ingresosFile), true);
        if (empty($ingresos)) {
            echo "<div class='mensaje'>No hay ingresos confirmados aún.</div>";
        } else {
            echo "<table>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Código</th>
                      <th>Fecha / Hora</th>
                    </tr>";
            foreach ($ingresos as $idx => $item) {
                $num = $idx + 1;
                echo "<tr>
                        <td>$num</td>
                        <td>{$item['nombre']}</td>
                        <td>{$item['codigo']}</td>
                        <td>{$item['fecha']}</td>
                      </tr>";
            }
            echo "</table>";
            echo "<button class='actualizar' onclick='location.reload()'>Actualizar lista</button>";
        }
    }
  ?>
</body>
</html>