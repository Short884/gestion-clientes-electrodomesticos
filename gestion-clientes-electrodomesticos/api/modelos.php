<?php
require_once 'conexion.php';

class Modelo extends Conexion {

    public function seleccionar($tabla) {
        $sql = "SELECT * FROM $tabla";
        return $this->db->query($sql)->fetch_all(MYSQLI_ASSOC);
    }

    public function insertar($tabla, $datos) {
        $campos = implode(",", array_keys($datos));
        $valores = implode("','", array_values($datos));
        $sql = "INSERT INTO $tabla ($campos) VALUES ('$valores')";
        return $this->db->query($sql);
    }

    public function actualizar($tabla, $id, $datos) {
        $actualizaciones = [];
        foreach ($datos as $key => $value) {
            $actualizaciones[] = "$key='$value'";
        }
        $sql = "UPDATE $tabla SET " . implode(",", $actualizaciones) . " WHERE id=$id";
        return $this->db->query($sql);
    }

    public function eliminar($tabla, $id) {
        $sql = "DELETE FROM $tabla WHERE id=$id";
        return $this->db->query($sql);
    }

    public function seleccionarConJoin($tabla, $joinTabla, $campo) {
        $sql = "SELECT * FROM $tabla LEFT JOIN $joinTabla ON $tabla.id = $joinTabla.$campo";
        return $this->db->query($sql)->fetch_all(MYSQLI_ASSOC);
    }
}
?>
