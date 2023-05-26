# Diseño y desarrollo de un servicio de gestión IoT
El equipo de Smart University de la Universidad de Alicante está desarrollando una sistema de sensorización inteligente basado en IoT y redes LORA. Este sistema se gestiona y configura desde una base de datos que actualmente se edita a través de PHPMyAdmin. El proyecto plantea crear una aplicación web propia que facilite la gestión de la información referente al sistema de sensorización.

## Datos que gestionar
Actualmente la base de datos consta de 3 tablas:
sensor_devices: tabla que contiene los tipos de sensores que pueden ser utilizados por el sistema.
devices: tabla que contiene al lista de dispositivos IoT que forman parte de la red de sensorización
devices_sensor: tabla que contiene la lista de sensores del tipo sensor_devices que contiene cada device

## Requerimientos
La aplicación residirá en un alojamiento propio y solo tendrá acceso el personal autorizado por lo que no es necesario que tenga autenticación (usuario y contraseña) por lo que no se necesita gestión de usuarios ni login. (NOTA: esto es para el inicio del proyecto)
Cada devices puede activarse o desactivarse.
Cada sensor en un device puede activarse o desactivarse
