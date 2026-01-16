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

// 2. Работа с модулем OS - ИСПРАВЛЕНО
const os = require('os'); // Используем встроенный модуль Node.js

console.log('2. Информация об операционной системе:');
console.log(`Платформа: ${os.platform()}`);
console.log(`Архитектура: ${os.arch()}`);
console.log(`Версия: ${os.release()}`);
console.log(`Процессор: ${os.cpus()[0].model}`);
console.log(`Количество ядер: ${os.cpus().length}`);
console.log(`Общая память: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`Свободная память: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);

console.log('\n3. Проверка свободной памяти:');
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
if (freeMemoryGB > 4) {
  console.log('✓ Свободной памяти больше 4GB');
} else {
  console.log('✗ Свободной памяти меньше 4GB');
}

console.log('\n4. Проверка доступа к функциям ОС:');
console.log(`Имя хоста: ${os.hostname()}`);
console.log(`Время работы системы: ${(os.uptime() / 3600).toFixed(2)} часов`);
console.log(`Домашняя директория: ${os.homedir()}`);
console.log(`Временная директория: ${os.tmpdir()}`);

// 3. Демонстрация bcrypt
console.log('\n5. Шифрование паролей с помощью bcrypt:');
try {
  const bcryptDemo = require('./bcryptDemo.js');
  bcryptDemo.encryptPasswords();
} catch (error) {
  console.log(`✗ Ошибка загрузки bcryptDemo: ${error.message}`);
  console.log('Создайте файл bcryptDemo.js или удалите этот блок кода');
}

// 4. Проверка текущего режима
console.log('\n6. Текущий режим работы приложения:');
console.log(`Режим: ${process.env.MODE || 'development'}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

console.log('\n=== ВСЕ ЗАДАНИЯ ВЫПОЛНЕНЫ ===');
console.log('Для запуска разных режимов используйте:');
console.log('  npm run start    - development режим');
console.log('  npm run build    - production режим');
console.log('  npm run deploy   - domain режим');
console.log('  npm run dev      - development с nodemon\n');