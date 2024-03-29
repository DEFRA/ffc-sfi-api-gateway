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
const lmsGeometries = require('./data/lms-geometries/5426800.json')
const saAuth = require('./data/sa-authorisation/5841191.json')
const saOrg = require('./data/sa-org/5841191.json')
const saEntitlements = require('./data/sa-entitlements/5841191.json')
const abacoApplications = require('./data/abaco-applications/response.json')
const abacoSfiEligibility = require('./data/abaco-sfi-eligibility/response.json')
const abacoSfiEligibilityParcels = require('./data/abaco-sfi-eligibility-parcels/response.json')
const abacoEmpoweredSbis = require('./data/abaco-empowered-sbis/response.json')

const routes = [
  {
    method: 'post',
    path: '/external-auth/users/{customerReference}/authentication-attempt',
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
    path: '/lms/organisation/{organisationId}/geometries',
    handler: () => {
      return lmsGeometries
    },
    options: {
      validate: {
        query: joi.object().keys({
          bbox: joi.any().required()
        }).required()
      }
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
    }
  },
  {
    method: 'get',
    path: '/SitiAgriApi/entitlements/grouped/{organisationId}',
    handler: () => {
      return saEntitlements
    }
  },
  {
    method: 'post',
    path: '/api/v1/sfi/applications',
    handler: () => {
      return abacoApplications
    },
    options: {
      validate: {
        payload: joi.object().keys({
          sbi: joi.string().required(),
          applicationType: joi.string().required()
        }).required()
      }
    }
  },
  {
    method: 'get',
    path: '/api/v1/sfi/eligibility/{sbi}',
    handler: () => {
      return abacoSfiEligibility
    }
  },
  {
    method: 'get',
    path: '/api/v1/sfi/eligibility/{sbi}/parcels',
    handler: () => {
      return abacoSfiEligibilityParcels
    }
  },
  {
    method: 'get',
    path: '/api/v1/sfi/empowered-sbis/{crn}',
    handler: () => {
      return abacoEmpoweredSbis
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
