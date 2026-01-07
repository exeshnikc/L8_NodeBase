/**
 * Модуль для работы с операционной системой
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

const OSModule = {
  /**
   * Функция выводит основную информацию об ОС
   */
  showOSInfo: function() {
    console.log(`Платформа: ${os.platform()}`);
    console.log(`Архитектура: ${os.arch()}`);
    console.log(`Версия ОС: ${os.version()}`);
    console.log(`Имя хоста: ${os.hostname()}`);
    console.log(`Тип ОС: ${os.type()}`);
    
    // Память в GB
    const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
    const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);
    
    console.log(`Общая память: ${totalMemGB} GB`);
    console.log(`Свободная память: ${freeMemGB} GB`);
    console.log(`Главная директория: ${os.homedir()}`);
    
    // Сетевые интерфейсы
    const networkInterfaces = os.networkInterfaces();
    console.log('\nСетевые интерфейсы:');
    
    Object.keys(networkInterfaces).forEach(interfaceName => {
      networkInterfaces[interfaceName].forEach(interface => {
        if (interface.family === 'IPv4' && !interface.internal) {
          console.log(`  ${interfaceName}: ${interface.address}`);
        }
      });
    });
  },

  /**
   * Проверяет, что свободной памяти больше 4GB
   * @returns {boolean} Результат проверки
   */
  checkFreeMemory: function() {
    const freeMemBytes = os.freemem();
    const freeMemGB = freeMemBytes / (1024 ** 3); // Конвертируем в GB
    return freeMemGB > 4;
  },

  /**
   * Проверяет режим доступа и вызывает showOSInfo если разрешено
   */
  checkAccessAndShowInfo: function() {
    // Читаем переменную MODE из .env
    const mode = process.env.MODE;
    
    // Проверяем доступ
    if (mode === 'admin') {
      console.log('✓ Режим доступа: admin. Вывод информации об ОС разрешен.');
      console.log('\nДополнительная информация об ОС:');
      console.log(`Время работы системы: ${(os.uptime() / 3600).toFixed(2)} часов`);
      console.log(`Количество ядер CPU: ${os.cpus().length}`);
      console.log(`Загрузка CPU: ${os.loadavg().map(val => val.toFixed(2)).join(', ')}`);
    } else if (mode === 'user') {
      console.log('✗ Режим доступа: user. Вывод информации об ОС запрещен.');
      console.log('Для доступа к полной информации требуется режим admin.');
    } else {
      console.log(`⚠ Неизвестный режим доступа: ${mode}`);
    }
  }
};

module.exports = OSModule;