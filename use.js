/**
 * Файл для демонстрации использования кастомных модулей
 */

console.log('=== ИСПОЛЬЗОВАНИЕ КАСТОМНЫХ МОДУЛЕЙ ===\n');

// Импортируем модули
const stringSorter = require('./modules/stringSorter');
const dataLoader = require('./modules/dataLoader');
const fileSystem = require('./modules/fileSystem');

async function demonstrateModules() {
  console.log('1. Загрузка пользователей с JSONPlaceholder...');
  
  // 1. Загружаем пользователей
  const usersResult = await dataLoader.loadUsers();
  
  if (usersResult.error) {
    console.error('Ошибка при загрузке пользователей:', usersResult.error);
    return;
  }
  
  console.log(`✓ Загружено пользователей: ${usersResult.data.length}\n`);
  
  // 2. Извлекаем имена и email
  const names = usersResult.data.map(user => user.name);
  const emails = usersResult.data.map(user => user.email);
  
  console.log('2. Сортировка имен без учета пробелов...');
  
  // 3. Сортируем имена
  const sortedNames = stringSorter.sortStringsWithoutSpaces(names);
  
  console.log('Первые 5 отсортированных имен:');
  sortedNames.slice(0, 5).forEach((name, index) => {
    console.log(`  ${index + 1}. ${name}`);
  });
  
  console.log('\n3. Работа с файловой системой...');
  
  // 4. Создаем структуру папок и файлов
  const usersDir = './users';
  
  // Создаем папку users
  fileSystem.createDirSync(usersDir);
  
  // Создаем и записываем файл с именами
  const namesPath = path.join(usersDir, 'names.txt');
  const namesContent = sortedNames.join('\n');
  fileSystem.writeFileSync(namesPath, namesContent);
  
  // Создаем и записываем файл с email
  const emailsPath = path.join(usersDir, 'emails.txt');
  const emailsContent = emails.join('\n');
  fileSystem.writeFileSync(emailsPath, emailsContent);
  
  // 5. Демонстрация чтения файлов
  console.log('\n4. Проверка созданных файлов...');
  
  const readNames = fileSystem.readFileSync(namesPath);
  const readEmails = fileSystem.readFileSync(emailsPath);
  
  console.log(`✓ Файл names.txt: ${readNames ? 'создан успешно' : 'ошибка'}`);
  console.log(`✓ Файл emails.txt: ${readEmails ? 'создан успешно' : 'ошибка'}`);
  
  // 6. Демонстрация поиска всех файлов
  console.log('\n5. Поиск всех файлов в проекте...');
  const allFiles = fileSystem.findAllFilesSync('.');
  
  console.log('Найденные файлы:');
  allFiles.slice(0, 10).forEach((file, index) => {
    console.log(`  ${index + 1}. ${file}`);
  });
  
  if (allFiles.length > 10) {
    console.log(`  ... и еще ${allFiles.length - 10} файлов`);
  }
  
  console.log('\n=== ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА ===');
  console.log('Создана структура:');
  console.log('  users/');
  console.log('    ├── names.txt    (с отсортированными именами)');
  console.log('    └── emails.txt   (с email пользователей)');
}

// Запускаем демонстрацию
const path = require('path');
demonstrateModules().catch(error => {
  console.error('Ошибка при демонстрации модулей:', error);
});