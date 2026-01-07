/**
 * Демонстрация работы с модулем bcrypt
 * Шифрование 13 паролей и замер времени
 */

const bcrypt = require('bcrypt');

const BcryptDemo = {
  /**
   * Шифрует 13 паролей и измеряет время
   */
  encryptPasswords: async function() {
    console.log('Начинаем шифрование 13 паролей...\n');
    
    const passwords = [
      'password123',
      'qwerty123',
      'admin123',
      'user123',
      'test123',
      'hello123',
      'world123',
      'nodejs123',
      'javascript123',
      'typescript123',
      'react123',
      'angular123',
      'vue123'
    ];
    
    const saltRounds = 10;
    const results = [];
    
    for (let i = 0; i < passwords.length; i++) {
      const password = passwords[i];
      const startTime = Date.now();
      
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        results.push({
          password: password.substring(0, 10) + '...', // Сокращаем для вывода
          duration: duration,
          hash: hash.substring(0, 30) + '...' // Сокращаем хэш для вывода
        });
        
        console.log(`Пароль ${i + 1}/${passwords.length}:`);
        console.log(`  Время шифрования: ${duration}ms`);
        console.log(`  Хэш: ${hash.substring(0, 30)}...`);
      } catch (error) {
        console.error(`Ошибка при шифровании пароля ${i + 1}:`, error.message);
      }
    }
    
    // Анализ результатов
    console.log('\n=== АНАЛИЗ РЕЗУЛЬТАТОВ ===');
    
    const totalTime = results.reduce((sum, r) => sum + r.duration, 0);
    const avgTime = totalTime / results.length;
    const minTime = Math.min(...results.map(r => r.duration));
    const maxTime = Math.max(...results.map(r => r.duration));
    
    console.log(`Общее время шифрования: ${totalTime}ms`);
    console.log(`Среднее время на пароль: ${avgTime.toFixed(2)}ms`);
    console.log(`Минимальное время: ${minTime}ms`);
    console.log(`Максимальное время: ${maxTime}ms`);
    
    // Вывод о причинах разного времени
    console.log('\n=== ВЫВОД О ВРЕМЕНИ ШИФРОВАНИЯ ===');
    console.log('1. Время шифрования может различаться из-за:');
    console.log('   - Разной длины паролей');
    console.log('   - Разной сложности паролей');
    console.log('   - Нагрузки на систему в момент шифрования');
    console.log('   - Особенностей реализации bcrypt (использование соли)');
    console.log('2. Bcrypt использует адаптивный алгоритм:');
    console.log('   - Можно увеличивать saltRounds для большей безопасности');
    console.log('   - Больше saltRounds = больше времени шифрования');
    console.log('3. Разброс в пределах 5-20ms нормален для bcrypt');
  }
};

module.exports = BcryptDemo;