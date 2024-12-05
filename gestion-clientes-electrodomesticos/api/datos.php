<?php
require_once 'modelos.php';
$accion = $_GET['accion'] ?? null;
$tabla = $_GET['tabla'] ?? null;
$tablaRelacionado = $_GET['tablaRelacionado'] ?? null;

$modelo = new Modelo();

switch ($accion) {
    case 'seleccionar':
        echo json_encode($modelo->seleccionar($tabla));
        break;
    case 'insertar':
        $datos = $_POST;
        echo json_encode($modelo->insertar($tabla, $datos));
        break;
    case 'actualizar':
        $id = $_GET['id'];
        $datos = $_POST;
        echo json_encode($modelo->actualizar($tabla, $id, $datos));
        break;
    case 'eliminar':
        $id = $_GET['id'];
        echo json_encode($modelo->eliminar($tabla, $id));
        break;
    case 'seleccionarConJoin':
        echo json_encode($modelo->seleccionarConJoin($tabla, $tablaRelacionado, 'id_cliente'));
        break;
}
?>
