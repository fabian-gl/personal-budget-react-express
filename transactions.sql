-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2021 a las 20:53:51
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `personal_budget`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `amount` decimal(14,2) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `transactions`
--

INSERT INTO `transactions` (`id`, `name`, `amount`, `type`, `date`) VALUES
(5, 'Prueba 155', '11999.34', 1, '1989-12-01'),
(8, 'Fabian', '-999.99', -1, '2021-07-25'),
(10, 'Prueba 10', '234.34', 1, '2021-07-23'),
(13, 'Test 1', '-12345.00', -1, '1986-12-12'),
(14, 'Probando', '876.00', 1, '2021-07-29'),
(15, 'Prueba 28', '987654.00', 1, '2021-07-20'),
(16, 'Mi nueva transaccion', '4565676.00', 1, '2021-07-29'),
(21, 'eeee', '-1.00', -1, '1234-07-29'),
(22, 'rtrter', '2232.00', 1, '2021-07-29'),
(23, 'probandoo', '-1234.00', -1, '2021-07-29'),
(25, 'Test', '133.00', 1, '1986-12-11'),
(26, 'New transaction', '234.00', 1, '2021-07-30'),
(27, 'New transaction negative', '-34556.35', -1, '2021-07-30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
