/**
 * Демонстрационный скрипт для показа всех возможностей
 */

const fs = require('./modules/fileSystem');

console.log('=== ДЕМОНСТРАЦИЯ РАБОТЫ С ФАЙЛАМИ ===\n');

// Демонстрация синхронных операций
console.log('1. СИНХРОННЫЕ ОПЕРАЦИИ:');
console.log('========================\n');

// Создание тестового файла
fs.writeFileSync('./files/demo.txt', 'Hello World 123! TEST FILE.');

// Чтение файла
const content = fs.readFileSync('./files/demo.txt');
console.log('Содержимое файла:', content);

// Очистка от шума
console.log('\nОчистка файла от шума...');
const cleaned = fs.removeNoiseSync('./files/demo.txt');
console.log('Очищенное содержимое:', cleaned);

// Копирование файла
fs.copyFileSync('./files/demo.txt', './files/demo_copy.txt');

// Создание и удаление папки
fs.createDirSync('./temp_folder');
fs.deleteDirSync('./temp_folder');

// Демонстрация асинхронных операций
console.log('\n\n2. АСИНХРОННЫЕ ОПЕРАЦИИ:');
console.log('=========================\n');

async function demoAsync() {
  console.log('Асинхронное создание папки...');
  await fs.createDirAsync('./async_folder');
  
  console.log('Асинхронная запись файла...');
  await fs.writeFileAsync('./async_folder/test.txt', 'Async test content');
  
  console.log('Асинхронное чтение файла...');
  const asyncContent = await fs.readFileAsync('./async_folder/test.txt');
  console.log('Прочитано:', asyncContent);
  
  console.log('Асинхронное удаление папки...');
  await fs.deleteDirAsync('./async_folder');
}

demoAsync().then(() => {
  console.log('\n=== ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА ===');
});