/**
 * Основной файл приложения
 * Лабораторная работа 8: Основы Node.js
 */

// Загружаем переменные окружения
const envPath = process.env.dotenv_config_path || '.env';
require('dotenv').config({ path: envPath });

if (!process.env.NODE_ENV) {
  if (envPath.includes('production')) process.env.NODE_ENV = 'production';
  else if (envPath.includes('domain')) process.env.NODE_ENV = 'domain';
  else process.env.NODE_ENV = 'development';
}

console.log('=== ЛАБОРАТОРНАЯ РАБОТА 8 ===');
console.log('Основы Node.js и работа с модулями\n');

// 1. Вывод информации из .env
console.log('1. Информация из .env файла:');
console.log(`Имя: ${process.env.FIRST_NAME}`);
console.log(`Фамилия: ${process.env.LAST_NAME}`);
console.log(`Номер группы: ${process.env.GROUP_NUMBER}`);
console.log(`Номер по списку: ${process.env.LIST_NUMBER}`);
console.log(`Режим доступа: ${process.env.MODE}`);
console.log(`Текущий NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

// 2. Работа с модулем OS
const osModule = require('./os/index.js');

console.log('2. Информация об операционной системе:');
osModule.showOSInfo();

console.log('\n3. Проверка свободной памяти:');
if (osModule.checkFreeMemory()) {
  console.log('✓ Свободной памяти больше 4GB');
} else {
  console.log('✗ Свободной памяти меньше 4GB');
}

console.log('\n4. Проверка доступа к функциям ОС:');
osModule.checkAccessAndShowInfo();

// 3. Демонстрация bcrypt
console.log('\n5. Шифрование паролей с помощью bcrypt:');
const bcryptDemo = require('./bcryptDemo.js');
bcryptDemo.encryptPasswords();

// 4. Проверка текущего режима
console.log('\n6. Текущий режим работы приложения:');
console.log(`Режим: ${process.env.MODE}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

console.log('\n=== ВСЕ ЗАДАНИЯ ВЫПОЛНЕНЫ ===');
console.log('Для запуска разных режимов используйте:');
console.log('  npm run start    - development режим');
console.log('  npm run build    - production режим');
console.log('  npm run deploy   - domain режим');
console.log('  npm run dev      - development с nodemon\n');