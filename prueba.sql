-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-01-2024 a las 15:45:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pagos`
--

CREATE TABLE `detalle_pagos` (
  `id` int(11) NOT NULL,
  `cantidaddetalle` decimal(10,2) NOT NULL,
  `idpago` int(11) NOT NULL,
  `idrubro` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pagos`
--

INSERT INTO `detalle_pagos` (`id`, `cantidaddetalle`, `idpago`, `idrubro`, `createdAt`, `updatedAt`) VALUES
(260, 5.00, 34, 14, '2024-01-09', '2024-01-09'),
(263, 5.00, 38, 15, '2024-01-09', '2024-01-09');

--
-- Disparadores `detalle_pagos`
--
DELIMITER $$
CREATE TRIGGER `after_insert_detalle_pagos` AFTER INSERT ON `detalle_pagos` FOR EACH ROW BEGIN 
UPDATE pagos p SET p.cantidadpago = (SELECT SUM(cantidaddetalle) FROM detalle_pagos WHERE idpago = NEW.idpago),
p.estadopago = '1'
WHERE p.id = NEW.idpago;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_reuniones`
--

CREATE TABLE `detalle_reuniones` (
  `id` int(11) NOT NULL,
  `asistencia` tinyint(1) NOT NULL,
  `idsocio` int(11) NOT NULL,
  `idreunion` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_reuniones`
--

INSERT INTO `detalle_reuniones` (`id`, `asistencia`, `idsocio`, `idreunion`, `createdAt`, `updatedAt`) VALUES
(523, 0, 37, 24, '2024-01-09', '2024-01-09'),
(524, 1, 38, 24, '2024-01-09', '2024-01-09'),
(525, 1, 39, 24, '2024-01-09', '2024-01-09'),
(526, 0, 40, 24, '2024-01-09', '2024-01-09'),
(527, 0, 41, 24, '2024-01-09', '2024-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `path` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documents`
--

INSERT INTO `documents` (`id`, `name`, `path`, `createdAt`, `updatedAt`) VALUES
(1, '1695243214456-infografia.pdf', 'uploads\\1695243214456-infografia.pdf', '2023-09-20', '2023-09-20'),
(3, '1695243768944-img20230811_10500245 - copia.pdf', 'uploads\\1695243768944-img20230811_10500245 - copia.pdf', '2023-09-20', '2023-09-20'),
(4, '1695243786072-img20230811_10500245.pdf', 'uploads\\1695243786072-img20230811_10500245.pdf', '2023-09-20', '2023-09-20'),
(5, '1695245446388-identidad.pdf', 'uploads\\1695245446388-identidad.pdf', '2023-09-20', '2023-09-20'),
(6, '1695251124773-img20230811_10500245 - copia.pdf', 'uploads\\1695251124773-img20230811_10500245 - copia.pdf', '2023-09-20', '2023-09-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `descripciongasto` varchar(100) NOT NULL,
  `montogasto` varchar(100) NOT NULL,
  `fechagasto` datetime NOT NULL,
  `idrubro` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id`, `descripciongasto`, `montogasto`, `fechagasto`, `idrubro`, `idusuario`, `createdAt`, `updatedAt`) VALUES
(118, 'Gasto de valor adeudados', '100.50', '2024-01-09 09:26:00', 14, 37, '2024-01-09', '2024-01-09'),
(119, 'Desfile Civico', '300', '2024-01-04 09:26:00', 14, 37, '2024-01-09', '2024-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `cantidadpago` decimal(10,2) NOT NULL,
  `fechapago` datetime NOT NULL,
  `estadopago` tinyint(1) NOT NULL,
  `idsocio` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `cantidadpago`, `fechapago`, `estadopago`, `idsocio`, `createdAt`, `updatedAt`) VALUES
(34, 5.00, '2024-01-09 09:27:00', 1, 37, '2024-01-09', '2024-01-09'),
(35, 0.00, '2024-01-09 09:27:00', 0, 39, '2024-01-09', '2024-01-09'),
(38, 5.00, '2024-01-09 09:41:00', 1, 37, '2024-01-09', '2024-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reuniones`
--

CREATE TABLE `reuniones` (
  `id` int(11) NOT NULL,
  `seccionreunion` varchar(100) NOT NULL,
  `descripcionreunion` varchar(100) NOT NULL,
  `fechareunion` datetime NOT NULL,
  `asistenciatomada` tinyint(1) NOT NULL,
  `lugarreunion` varchar(100) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reuniones`
--

INSERT INTO `reuniones` (`id`, `seccionreunion`, `descripcionreunion`, `fechareunion`, `asistenciatomada`, `lugarreunion`, `idusuario`, `createdAt`, `updatedAt`) VALUES
(24, 'Sesión 1', 'Asunto', '2024-01-15 14:24:00', 1, 'Casa Comunal de la Comunidad', 37, '2024-01-09', '2024-01-09'),
(25, 'Sesión 2', 'Asunto', '2024-02-15 14:24:00', 0, 'Casa Comunal de la Comunidad', 37, '2024-01-09', '2024-01-09'),
(26, 'Sesión 3', 'Asunto', '2024-03-15 14:25:00', 0, 'Casa Comunal de la Comunidad', 37, '2024-01-09', '2024-01-09'),
(27, 'Sesión 4', 'Asunto', '2024-04-15 14:25:00', 0, 'Casa Comunal de la Comunidad', 37, '2024-01-09', '2024-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombrerol` varchar(50) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombrerol`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', '2024-01-03', '2024-01-03'),
(3, 'Tesoreria', '2024-01-03', '2024-01-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubros`
--

CREATE TABLE `rubros` (
  `id` int(11) NOT NULL,
  `nombrerubro` varchar(100) NOT NULL,
  `totalrubro` decimal(10,2) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rubros`
--

INSERT INTO `rubros` (`id`, `nombrerubro`, `totalrubro`, `createdAt`, `updatedAt`) VALUES
(14, 'Mes de enero', 5.00, '2024-01-09', '2024-01-09'),
(15, 'Mes de febrero', 5.00, '2024-01-09', '2024-01-09'),
(16, 'Mes de marzo', 5.00, '2024-01-09', '2024-01-09'),
(17, 'Mes de abril', 5.00, '2024-01-09', '2024-01-09'),
(18, 'Mes de mayo', 5.00, '2024-01-09', '2024-01-09'),
(19, 'Mes de junio', 5.00, '2024-01-09', '2024-01-09'),
(20, 'Mes de julio', 5.00, '2024-01-09', '2024-01-09'),
(21, 'Mes de agosto', 5.00, '2024-01-09', '2024-01-09'),
(22, 'Mes de septiembre', 5.00, '2024-01-09', '2024-01-09'),
(23, 'Mes de octubre', 5.00, '2024-01-09', '2024-01-09'),
(24, 'Mes de noviembre', 5.00, '2024-01-09', '2024-01-09'),
(25, 'Mes de diciembre', 5.00, '2024-01-09', '2024-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `id` int(11) NOT NULL,
  `cedulasocio` varchar(100) NOT NULL,
  `nombresocio` varchar(100) NOT NULL,
  `apellidosocio` varchar(100) NOT NULL,
  `direccionsocio` varchar(100) NOT NULL,
  `telefonosocio` varchar(100) NOT NULL,
  `correosocio` varchar(60) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `socios`
--

INSERT INTO `socios` (`id`, `cedulasocio`, `nombresocio`, `apellidosocio`, `direccionsocio`, `telefonosocio`, `correosocio`, `idusuario`, `createdAt`, `updatedAt`) VALUES
(37, '1314872969', 'Jose Mauricio', 'Alvia Parrales', 'Bajo del Pechiche', '0980230392', 'jose@gmail.com', 37, '2024-01-09', '2024-01-09'),
(38, '1359845841', 'Jorge Luis', 'Alvia Parrales', 'Bajo del Pechiche', '0980230358', 'jorge@gmail.com', 37, '2024-01-09', '2024-01-09'),
(39, '1359845843', 'Daniela Carolina', 'Anchundia Delgado', 'Bajo del Pechiche', '0998989899', 'daniela@gmail.com', 37, '2024-01-09', '2024-01-09'),
(40, '1314598752', 'Fernando Ricardo', 'Delgado Franco', 'Bajo del Pechiche', '0985263248', 'fernando@gmail.com', 37, '2024-01-09', '2024-01-09'),
(41, '1315892456', 'Maria Cecilia', 'Espinal Franco', 'Bajo del Pechiche', '0985246398', 'maria@gmail.com', 37, '2024-01-09', '2024-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombreusuario` varchar(100) NOT NULL,
  `contraseñausuario` varchar(100) NOT NULL,
  `nombrecompletousuario` varchar(100) NOT NULL,
  `correousuario` varchar(100) NOT NULL,
  `telefonousuario` varchar(100) NOT NULL,
  `idrol` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombreusuario`, `contraseñausuario`, `nombrecompletousuario`, `correousuario`, `telefonousuario`, `idrol`, `createdAt`, `updatedAt`) VALUES
(37, 'Administrador', '$2a$10$zioR7rX9P/z4ay8b1R/fIOkctgbJ1kDjKKpUcZZLi7dCIX2Prnn3y', 'alvia', 'administrador@gmail.com', '0980230382', 1, '2024-01-03', '2024-01-03'),
(38, 'Tesorera', '$2a$10$WkFjoIVtVOElAg0W2QBdG.YbKcg7p8d9CA1zGAElMReeKEwS.QSjm', 'Tesorera', 'tesoreria@gmail.com', '098899654', 3, '2024-01-06', '2024-01-08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pagos`
--
ALTER TABLE `detalle_pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_PAGO` (`idpago`) USING BTREE,
  ADD KEY `FK_RUBRO` (`idrubro`) USING BTREE;

--
-- Indices de la tabla `detalle_reuniones`
--
ALTER TABLE `detalle_reuniones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_SOCIO` (`idsocio`),
  ADD KEY `FK_REUNION` (`idreunion`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_RUBRO` (`idrubro`) USING BTREE,
  ADD KEY `FK_USUARIO` (`idusuario`) USING BTREE;

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_SOCIO` (`idsocio`);

--
-- Indices de la tabla `reuniones`
--
ALTER TABLE `reuniones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_USUARIO` (`idusuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rubros`
--
ALTER TABLE `rubros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_USUARIO` (`idusuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ROL` (`idrol`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_pagos`
--
ALTER TABLE `detalle_pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- AUTO_INCREMENT de la tabla `detalle_reuniones`
--
ALTER TABLE `detalle_reuniones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=528;

--
-- AUTO_INCREMENT de la tabla `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `reuniones`
--
ALTER TABLE `reuniones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rubros`
--
ALTER TABLE `rubros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pagos`
--
ALTER TABLE `detalle_pagos`
  ADD CONSTRAINT `detalle_pagos_ibfk_3` FOREIGN KEY (`idrubro`) REFERENCES `rubros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_pagos_ibfk_4` FOREIGN KEY (`idpago`) REFERENCES `pagos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_reuniones`
--
ALTER TABLE `detalle_reuniones`
  ADD CONSTRAINT `detalle_reuniones_ibfk_1` FOREIGN KEY (`idreunion`) REFERENCES `reuniones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_reuniones_ibfk_2` FOREIGN KEY (`idsocio`) REFERENCES `socios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `gastos_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gastos_ibfk_2` FOREIGN KEY (`idrubro`) REFERENCES `rubros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idsocio`) REFERENCES `socios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reuniones`
--
ALTER TABLE `reuniones`
  ADD CONSTRAINT `reuniones_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `socios`
--
ALTER TABLE `socios`
  ADD CONSTRAINT `socios_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idrol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
