const wreck = require('@hapi/wreck')
const joi = require('joi')
const { chApi, chApiId, chApiKey } = require('../config')

const responseModel = joi.array().items(joi.object({
  id: joi.string(),
  name: joi.string(),
  sbi: joi.number(),
  additionalSbiIds: joi.array().items(joi.number()),
  confirmed: joi.boolean(),
  lastUpdatedOn: joi.string()
})).label('Result')

module.exports ={
  method: 'GET',
  path: '/organisation/search/sbi/{sbi}',
  options: {
    description: 'Get organisation details',
    notes: 'Returns organisation details by the sbi passed in the path',
    tags: ['api'],
    validate: {
      params: joi.object({
        sbi: joi.string().length(9)
      })
    },
    response: { schema: responseModel }
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
