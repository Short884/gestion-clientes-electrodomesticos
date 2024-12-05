-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 03-11-2024 a las 18:03:45
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reparaciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `iva` enum('inscripto','monotributo','exento') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `dni`, `nombre`, `apellido`, `telefono`, `iva`) VALUES
(2, 30780123, 'Walter', 'Lauxmann', '1234567890', 'exento'),
(7, 45950131, 'Stefano', 'Caccia', '3476653180', 'monotributo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `electrodomesticos`
--

DROP TABLE IF EXISTS `electrodomesticos`;
CREATE TABLE IF NOT EXISTS `electrodomesticos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `tipo` enum('lavarropas','heladera') NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `cantidad` int NOT NULL,
  `problema` text NOT NULL,
  `tipo_reparacion` enum('tecnica','mecanica') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `electrodomesticos`
--

INSERT INTO `electrodomesticos` (`id`, `id_cliente`, `tipo`, `modelo`, `cantidad`, `problema`, `tipo_reparacion`) VALUES
(1, 0, 'heladera', '', 1, 'Burletes dañados.', 'mecanica'),
(2, 0, 'lavarropas', '', 1, 'Burletes Dañados', 'tecnica');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
