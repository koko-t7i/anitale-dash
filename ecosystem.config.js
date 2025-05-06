module.exports = {
    apps: [
      {
        name: 'anitale-dash-green',
        script: 'server.js',
        cwd: '/home/koko/icode/anitale-dash-server',
        env_production: {
          NODE_ENV: 'production',
          PORT: 7122,
          HOSTNAME: '0.0.0.0'
        }
      },
      {
        name: 'anitale-dash-blue',
        script: 'server.js',
        cwd: '/home/koko/icode/anitale-dash',
        env_production: {
          NODE_ENV: 'production',
          PORT: 7123,
          HOSTNAME: '0.0.0.0'
        }
      }
    ]
  };
  