var express = require('express');
var router = express.Router();
var data = require('../public/data.json');
var HAM = require('../libs/ham');
var _ = require('lodash');

/* GET galleries page. */
router.get('/', async function(req, res, next) {
  let criteria = {
    size: 100,
    sort: 'gallerynumber'
  };
  const galleries = await HAM.Galleries.search(criteria);
  data.galleries = _.groupBy(galleries.records, 'floor');

  res.render('admin/building', { title: `MCP | ${data.project.title} | Harvard Art Museums`, data: data });
});

router.get('/galleries/:id', async function(req, res, next) {
  const gallery = await HAM.Galleries.get(req.params.id);
  data.gallery = gallery;

  const objects = await HAM.Objects.searchAll({gallery:req.params.id, size:100});
  data.objects = objects;

  res.render('admin/gallery', { title: `MCP | ${data.project.title} | Harvard Art Museums`, data: data });
});

router.get('/object/:id', async (req, res, next) => {
  const object = await HAM.Objects.get(req.params.id);
  const ai = await HAM.Annotations.searchAll({image: object.images[0].imageid, size:100});
  const gallery = await HAM.Galleries.get(object.gallery.galleryid);
  let ai_sorted = _.sortBy(ai, 'body');

  data.object = object;
  data.ai = {};
  data.gallery = gallery;
  
  data.ai.features = _.groupBy(ai_sorted, 'feature');
  if (data.ai.features.region) {
    data.ai.features.region.forEach(a => {
      let coords = a.selectors[0].value.replace('xywh=','');
      a.snippet = a.target.replace('/full/full', `/${coords}/full`);
      a.snippetsmall = a.target.replace('/full/full', `/${coords}/!100,100`);
    });
    data.ai.features.region = _.groupBy(data.ai.features.region, 'type');
  }
  if (data.ai.features.full) {
    data.ai.features.full = _.groupBy(data.ai.features.full, 'type');
  }  

  
  res.render('admin/object', { title: `MCP | ${data.project.title} | Harvard Art Museums`, data: data });
});

module.exports = router;
