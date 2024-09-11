const bcrypt = require('bcryptjs');

// Contraseña a cifrar
const password = 'user1'; // Reemplaza con la contraseña que deseas cifrar

// Generar un hash de la contraseña
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log('Contraseña cifrada:', hash);
});
