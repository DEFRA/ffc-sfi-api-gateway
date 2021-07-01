const wreck = require('@hapi/wreck')
const joi = require('joi')
const { chApiId, chApiKey } = require('../config')

module.exports = {
  method: 'GET',
  path: '/organisation/search/sbi/{sbi}',
  options: {
    description: 'Get get organisation by Single Business Identifier (SBI)',
    notes: 'Returns organisation details by the SBI passed in the path',
    tags: ['api'],
    validate: {
      params: joi.object({
        sbi: joi.number()
          .required()
          .description('the id for the todo item')
      })
    }
  },
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
