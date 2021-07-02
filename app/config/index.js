
module.exports = {
  port: process.env.PORT || 3005,
  env: process.env.NODE_ENV || 'development',
  serviceName: 'SFI Api Gateway for connecting to Crown Hosting',
  chApi: process.env.CH_API,
  chApiId: process.env.CH_API_ID,
  chApiKey: process.env.CH_API_KEY
}
