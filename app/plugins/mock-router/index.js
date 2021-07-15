const joi = require('joi')
const authenticationAttemptOk = require('./data/authentication-attempt/ok.json')
const personSummary = require('./data/person-summary/5841190.json')
const orgPersonSummary = require('./data/org-person-summary/5841190.json')
const org = require('./data/org/5841191.json')
const orgSearchSbi = require('./data/org-search-sbi/200593579.json')
const lmsParcels = require('./data/lms-parcels/5634600.json')
const lmsLandCovers = require('./data/lms-land-covers/5376393.json')
const lmsLandCoversWithGeo = require('./data/lms-land-covers-with-geo/5376393__SP8985__8277.json')
const lmsCoversSummary = require('./data/lms-covers-summary/5634600.json')
const saAuth = require('./data/sa-authorisation/5841191.json')
const saOrg = require('./data/sa-org/5841191.json')

const routes = [
  {
    method: 'post',
    path: '/users/{customerReference}/authentication-attempt',
    handler: () => {
      return authenticationAttemptOk
    },
    options: {
      validate: {
        payload: joi.object().keys({
          password: joi.string().allow('').required()
        }).required()
      }
    }
  },
  {
    method: 'get',
    path: '/person/{personId}/summary',
    handler: () => {
      return personSummary
    }
  },
  {
    method: 'get',
    path: '/organisation/person/{personId}/summary',
    handler: () => {
      return orgPersonSummary
    }
  },
  {
    method: 'get',
    path: '/organisation/{organisationId}',
    handler: () => {
      return org
    }
  },
  {
    method: 'get',
    path: '/organisation/search/sbi',
    handler: () => {
      return orgSearchSbi
    }
  },
  {
    method: 'get',
    path: '/lms/organisation/{organisationId}/parcels',
    handler: () => {
      return lmsParcels
    }
  },
  {
    method: 'get',
    path: '/lms/organisation/{organisationId}/land-covers',
    handler: () => {
      return lmsLandCovers
    }
  },
  {
    method: 'get',
    path: '/lms/organisation/{organisationId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/land-covers',
    handler: () => {
      return lmsLandCoversWithGeo
    },
    options: {
      validate: {
        query: joi.object().keys({
          includeGeometries: joi.bool().allow(true).required()
        }).required()
      }
    }
  },
  {
    method: 'get',
    path: '/lms/organisation/{organisationId}/covers-summary',
    handler: () => {
      return lmsCoversSummary
    }
  },
  {
    method: 'get',
    path: '/SitiAgriApi/authorisation/organisation/{organisationId}/authorisation',
    handler: () => {
      return saAuth
    }
  },
  {
    method: 'get',
    path: '/SitiAgriApi/authorisation/organisation/{organisationId}/byFunction',
    handler: () => {
      return saOrg
    },
    options: {
      validate: {
        query: joi.object().keys({
          functions: joi.string().allow('viewBusinessDetails').required()
        }).required()
      }
    }
  }
]

module.exports = {
  plugin: {
    name: 'mock-router',
    register: (server, options) => {
      server.route([].concat(
        routes,
        require('../../routes/healthy'),
        require('../../routes/healthz')
      ))
    }
  }
}
