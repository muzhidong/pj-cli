const {
  db
} = require('./initDB');

const openDB = Object.create(null);

openDB.add = function(record) {
  return new Promise((resolve, reject) => {
    db.insert(record, function(err, newDoc) {
      if (err) {
        resolve({
          state: 'fail',
          err,
        });
      } else {
        resolve({
          state: 'success',
          data: newDoc,
        })
      }
    })
  })
}

openDB.remove = function(data) {
  return new Promise((resolve, reject) => {
    db.remove(data, function(err, numRemoved) {
      if (err) {
        resolve({
          state: 'fail',
          err,
        });
      } else {
        resolve({
          state: 'success',
          data: {
            numRemoved
          },
        })
      }
    })
  })
}

openDB.update = function(oldData, newData) {
  return new Promise((resolve, reject) => {
    db.update(oldData, newData, {}, function(err, numAffected, affectedDocuments, upsert) {
      if (err) {
        resolve({
          state: 'fail',
          err,
        });
      } else {
        resolve({
          state: 'success',
          data: {
            numAffected,
            affectedDocuments,
            upsert
          },
        })
      }
    })
  })
}

openDB.query = function(searchData = {}, sort = {
  name: 1
}) {
  return new Promise((resolve, reject) => {
    db.find(searchData).sort(sort).exec(function(err, newDoc) {
      if (err) {
        resolve({
          state: 'fail',
          err,
        });
      } else {
        resolve({
          state: 'success',
          data: newDoc,
        })
      }
    })
  })
}

module.exports = openDB;
