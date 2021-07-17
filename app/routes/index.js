const wreck = require('@hapi/wreck')
const { chApi, chApiId, chApiKey } = require('../config')

const proxyCall = () => {
  return {
    mapUri: (req) => {
      const query = req.url.search ? req.url.search : ''
      return {
        uri: `${chApi}${req.path}${query}`,
        headers: {
          'api-id': chApiId,
          'api-key': chApiKey,
          userType: 'external'
        }
      }
    },
    onResponse: async (err, res, req, h) => {
      const payload = await wreck.read(res, { json: true })
      const response = h.response(payload)
      response.headers = res.headers
      return response
    },
    passThrough: true
  }
}

module.exports = [{
  method: 'GET',
  path: '/{path*}',
  options: {
    description: 'Get calls on Crown Hosting endpoints',
    notes: 'Returns data from Crown Hosting endpoint',
    tags: ['api']
  },
  handler: {
    proxy: proxyCall()
  }
},
{
  method: 'POST',
  path: '/{path*}',
  options: {
    description: 'Post calls on Crown Hosting endpoints',
    notes: 'Returns data from Crown Hosting endpoint',
    tags: ['api'],
    payload: { parse: false }
  },
  handler: {
    proxy: proxyCall()
  }
}]