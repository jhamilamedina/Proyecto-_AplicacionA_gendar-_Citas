const jwt = require('jsonwebtoken');

// Definir la clave secreta directamente ya que no estás utilizando variables de entorno
const JWT_SECRET = 'S3cr3tK3y$L0ng&Comp!ex';

// Middleware para verificar el token JWT
function authMiddleware(req, res, next) {
    // Extraer el token del encabezado Authorization
    const token = req.header('Authorization')?.split(' ')[1];

    // Si no hay token, denegar el acceso
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Adjuntar el usuario decodificado al request
        req.user = decoded;
        next(); // Continuar con la siguiente función en la ruta
    } catch (error) {
        // Si el token no es válido, denegar el acceso
        res.status(403).json({ error: 'Token no válido' });
    }
}

// Middleware para verificar si el usuario es administrador
function adminMiddleware(req, res, next) {
    // Verificar si el usuario tiene el rol de 'admin'
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Requiere rol de administrador.' });
    }
    next(); // Continuar si el rol es 'admin'
}

module.exports = { authMiddleware, adminMiddleware };
