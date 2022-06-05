const fetch = require('node-fetch');
const querystring = require('querystring');
const { response } = require('express');
const async = require('hbs/lib/async');

const API_KEY = process.env.APIKEY;
const API_BASE_URL = 'https://api.harvardartmuseums.org'

const ENDPOINTS = {
    exhibitions: 'exhibition',
    images: 'image', 
    objects: 'object',
    people: 'person',
    galleries: 'gallery',
    annotations: 'annotation',
};

function _makeSearchUrl(endpoint, parameters, aggregations) {
  let qs = {
    apikey: API_KEY
  };

  if (parameters) {
    qs = {...qs, ...parameters};
  };

  if (aggregations) {
   qs.aggregation = JSON.stringify(aggregations);
  }

  return `${API_BASE_URL}/${endpoint}?${querystring.encode(qs)}`; 
}

function _makeGetUrl(endpoint, id) {
    let qs = {
        apikey: API_KEY
    };    

    return `${API_BASE_URL}/${endpoint}/${id}?${querystring.encode(qs)}`; 
}

function _fetch(url) {
    return fetch(url)
                .then(response => response.json())
                .then(response => response);
}

let Images = {
    get: (id) => { 
        return _fetch(_makeGetUrl(ENDPOINTS.images, id)); 
    },     
    search: (parameters, aggregations) => { 
        return _fetch(_makeSearchUrl(ENDPOINTS.images, parameters, aggregations)); 
    }
}

let Objects = {
    get: (id) => {
        return _fetch(_makeGetUrl(ENDPOINTS.objects, id));
    },     
    searchAll: async (parameters, aggregations) => {
        let data = await _fetch(_makeSearchUrl(ENDPOINTS.objects, parameters, aggregations));
        let records = data.records;
        let nextPage = data.info.next;
        while (nextPage) {
            let set = await _fetch(nextPage);
            records = records.concat(set.records);
            nextPage = set.info.next;
        } 
        return records;
    },    
    search: (parameters, aggregations) => {
        return _fetch(_makeSearchUrl(ENDPOINTS.objects, parameters, aggregations));
    }
}

let Exhibitions = {
    get: (id) => {
        return _fetch(_makeGetUrl(ENDPOINTS.exhibitions, id));
    },     
    search: (parameters, aggregations) => {
        return _fetch(_makeSearchUrl(ENDPOINTS.exhibitions, parameters, aggregations));
    }
}

let People = {
    get: (id) => {
        return _fetch(_makeGetUrl(ENDPOINTS.people, id));
    },     
    search: (parameters, aggregations) => {
        return _fetch(_makeSearchUrl(ENDPOINTS.people, parameters, aggregations));
    }
}

let Galleries = {
    get: (id) => {
        return _fetch(_makeGetUrl(ENDPOINTS.galleries, id));
    },     
    search: (parameters, aggregations) => {
        return _fetch(_makeSearchUrl(ENDPOINTS.galleries, parameters, aggregations));
    }
}

let Annotations = {
    get: (id) => {
        return _fetch(_makeGetUrl(ENDPOINTS.annotations, id));
    }, 
    searchAll: async (parameters, aggregations) => {
        let data = await _fetch(_makeSearchUrl(ENDPOINTS.annotations, parameters, aggregations));
        let records = data.records;
        let nextPage = data.info.next;
        while (nextPage) {
            let set = await _fetch(nextPage);
            records = records.concat(set.records);
            nextPage = set.info.next;
        } 
        return records;
    },
    search: (parameters, aggregations) => {
        return _fetch(_makeSearchUrl(ENDPOINTS.annotations, parameters, aggregations));
    }
}

module.exports = {
    Exhibitions: Exhibitions,
    Images: Images,
    Objects: Objects,
    People: People,
    Galleries: Galleries,
    Annotations: Annotations,
};