
module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  serviceName: 'SFI Api Gateway for connecting to Crown Hosting',
  chApiId: process.env.CH_API_ID,
  chApiKey: process.env.CH_API_KEY
}
