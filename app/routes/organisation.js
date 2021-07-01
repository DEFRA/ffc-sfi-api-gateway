const wreck = require('@hapi/wreck')
const { chApiId, chApiKey } = require('../config')

module.exports = {
  method: 'GET',
  path: '/organisation/search/sbi/{sbi}',
  handler: (request, h) => {
    return h.proxy({
      mapUri: (req) => {
        const sbi = request.params.sbi ? request.params.sbi : ''
        return {
          uri: `https://azureapi-chs-horizon.ruraldev.org.uk/extapi/organisation/search/sbi/?sbi=${sbi}`,
          // uri: 'https://gorest.co.in/public-api/users/32' + query,
          headers: {
            'api-id': chApiId,
            'api-key': chApiKey
          },
          passThrough: true,
          xforward: true
        }
      },
      onResponse: async (err, res, r, h, settings, ttl) => {
        console.log(err)
        const payload = await wreck.read(res, { json: true })
        const response = h.response(payload)
        response.headers = res.headers
        return response
      }
    })
  }
}
