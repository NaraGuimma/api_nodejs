const express = require('express');
const router = express.Router();

const data = [
  {id: 1, name: 'Zapatos A', value: 19.3, enStock: true, createdOn: new Date()},
  {id: 2, name: 'Zapatos B', value: 206.3, enStock: false, createdOn: new Date()},
  {id: 3, name: 'Zapatos C', value: 56.0, enStock: true, createdOn: new Date()},
  {id: 4, name: 'Zapatos D', value: 63.8, enStock: true, createdOn: new Date()},
  {id: 5, name: 'Zapatos E', value: 39.4, enStock: false, createdOn: new Date()},
];

router.get('/', function (req, res) {
  res.status(200).json(data);
});

router.get('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', function (req, res) {
  let itemIds = data.map(item => item.id);


  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

  let newItem = {
    id:newId,
    name:req.body.name,
    value:req.body.value,
    enStock:false,
    createdOn:new Date()
  }

  data.push(newItem);

  res.status(201).json(newItem);
});

router.put('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {

    let updated = {
      id:found.id,
      name:req.body.name,
      value:req.body.value,
      enStock:req.body.enStock,
  }

    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204)
  } else {
      res.sendStatus(500)
  }
});

router.delete('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
  }

  res.sendStatus(204)
});

module.exports = router;