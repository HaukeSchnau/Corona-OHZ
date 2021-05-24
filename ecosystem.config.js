module.exports = {
  apps: [
    {
      name: "Corona-OHZ",
      script: 'npm',
      args: 'start',
      instances: "2",
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "hauke",
      host: "haukeschnau.de",
      ref: "origin/master",
      repo: "git@github.com:HaukeSchnau/Corona-OHZ.git",
      path: "/home/hauke/corona_ohz",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
