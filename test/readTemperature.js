const chai = require('chai');
require('dotenv').config();

const readTemperatures = require('../lib/readTemperatures');

const expect = chai.expect;

describe('Read temperatures', () => {
  const readings = readTemperatures();
  it('should return temperature in degrees c', () => {
    expect(readings[0].name).to.equal('28-A');
    expect(readings[0].temperature).to.equal(22.5);
  });

  it('should return undefiend for missing sensor file', () => {
    expect(readings[1].name).to.equal('28-B');
    expect(readings[1].temperature).to.not.exist;
  });

  it('should return undefiend for empty sensor file', () => {
    expect(readings[2].name).to.equal('28-C');
    expect(readings[2].temperature).to.not.exist;
  });
});
