const fs = require('fs');

const deviceFolder = process.env.DEVICE_FOLDER || '/sys/bus/w1/devices';

function getSensorPath(filename) {
  return `${deviceFolder}/${filename}/w1_slave`;
}

function parseTemperature(text) {
  try {
    const temp = text.split('\n')[1].split('=')[1];
    return Number(temp) / 1000;
  } catch (ex) {
    return undefined;
  }
}

function readFileContents(sensor) {
  try {
    return fs.readFileSync(getSensorPath(sensor), 'utf8');
  } catch (ex) {
    return undefined;
  }
}

function readTemperature(sensor) {
  const temperature = parseTemperature(readFileContents(sensor));
  return { name: sensor, temperature };
}

function getSensorNames() {
  return fs.readdirSync(deviceFolder).filter(f => f.startsWith('28'));
}

function readTemperatures() {
  return getSensorNames().map(readTemperature);
}

module.exports = readTemperatures;
