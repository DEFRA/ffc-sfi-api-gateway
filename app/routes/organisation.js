const wreck = require('@hapi/wreck')
const joi = require('joi')
const { chApi, chApiId, chApiKey } = require('../config')

module.exports = {
  method: 'GET',
  path: '/organisation/search/{sbi}',
  options: {
    description: 'Get organisation details',
    notes: 'Returns organisation details by the sbi passed in the path',
    tags: ['api'],
    validate: {
      params: joi.object({
        sbi: joi.string().length(9)
      })
    }
  },
  handler: (request, h) => {
    return h.proxy({
      mapUri: (req) => {
        const sbi = request.params.sbi ? request.params.sbi : ''
        return {
          uri: `${chApi}organisation/search/sbi/?sbi=${sbi}`,
          headers: {
            'api-id': chApiId,
            'api-key': chApiKey
          },
          passThrough: true,
          xforward: true
        }
      },
      onResponse: async (err, res) => {
        console.log(err)
        const payload = await wreck.read(res, { json: true })
        const response = h.response(payload)
        response.headers = res.headers
        return response
      }
    })
  }
}
