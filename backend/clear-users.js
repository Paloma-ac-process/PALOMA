#!/usr/bin/env node

import mysql from 'mysql2/promise';

async function clearUsers() {
  const connection = await mysql.createConnection({
    host: 'nozomi.proxy.rlwy.net',
    port: 40599,
    user: 'root',
    password: 'ABuOvMFLRVziQeIWPAMrnEwPjqUufott',
    database: 'railway',
  });

  try {
    console.log('🔗 Connexion à la base de données établie...');
    
    // D'abord, affichons le nombre d'utilisateurs avant suppression
    const [countResult] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log(`📊 Nombre d'utilisateurs avant suppression : ${countResult[0].count}`);
    
    // Suppression de tous les utilisateurs
    const [result] = await connection.execute('DELETE FROM users');
    console.log(`✅ Toutes les lignes supprimées. Lignes affectées : ${result.affectedRows}`);
    
    // Vérification après suppression
    const [afterCountResult] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log(`📊 Nombre d'utilisateurs après suppression : ${afterCountResult[0].count}`);
    
  } catch (err) {
    console.error('❌ Erreur lors de la suppression :', err);
  } finally {
    await connection.end();
    console.log('🔌 Connexion fermée.');
  }
}

// Exécution du script
clearUsers().then(() => {
  console.log('✅ Script terminé.');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Erreur fatale :', error);
  process.exit(1);
}); 