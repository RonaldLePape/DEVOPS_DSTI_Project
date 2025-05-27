const { expect } = require('chai');
const configure = require('../src/configure');

describe('Configure', () => {
  it('load default json configuration file', () => {
    const config = configure();
    expect(config.postgres).to.eql({
      host: "localhost",
      port: 5432,
      user: "myuser",
      password: "MySecretPassword123",
      database: "myproject_db"
    });
  });

  it('load custom configuration', () => {
    const config_custom = { custom: "value" };
    const config = configure(config_custom);
    expect(config).to.eql({
      postgres: {
        host: "localhost",
        port: 5432,
        user: "myuser",
        password: "MySecretPassword123",
        database: "myproject_db"
      },
      custom: "value"
    });
  });
});
