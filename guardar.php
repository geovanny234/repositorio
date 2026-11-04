<?php
// 1. Configuración de las credenciales de tu base de datos (según tu captura)
// y no usen ROOT 
$host = "127.0.0.1";
$usuario = "root";
$password = ""; // Deja vacío si no configuraste contraseña en tu MySQL
$base_datos = "integrantes"; // Tu base de datos que mencionaste

// 2. Crear la conexión utilizando la extensión MySQLi
$conexion = new mysqli($host, $usuario, $password, $base_datos);

// Verificar si hay errores en la conexión
if ($conexion->connect_error) {
    die("Error crítico de conexión: " . $conexion->connect_error);
}

// 3. Verificar si el formulario envió datos a través del método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Capturar el valor del input HTML de manera segura
    $nombreRecibido = $_POST['nombreUsuario'];

    // 4. Preparar la consulta SQL para evitar inyecciones de código (SQL Injection)
    // Cambia 'usuarios' por el nombre real de tu tabla
    $sql = "INSERT INTO usuarios (nombre) VALUES (?)";
    
    $stmt = $conexion->prepare($sql);
    
    if ($stmt) {
        // Enlazar el parámetro ("s" significa que es un String / Texto)
        $stmt->bind_param("s", $nombreRecibido);
        
        // Ejecutar la consulta en la base de datos
if ($stmt->execute()) {
    echo "<h3>¡Registro guardado con éxito en la base de datos!</h3>";
    echo "<a href='index.html'>Volver al formulario</a>"; // <-- Cambiado a .html
}
 else {
            echo "Error al intentar guardar los datos: " . $stmt->error;
        }
        
        // Cerrar la sentencia preparada
        $stmt->close();
    } else {
        echo "Error al preparar la consulta: " . $conexion->error;
    }
}

// Cerrar la conexión general
$conexion->close();
?>
