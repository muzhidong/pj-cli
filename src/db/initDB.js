const DataBase = require('../libs/nedb');

const {
  scene,
  data,
} = require('./data.default.js');
const {
  handleException
} = require('../helper');

const db = new DataBase({
  // 不带文件名默认为内存数据库
  filename: `${__dirname}/data.db`,
});

function initDB() {

  return new Promise((resolve, reject) => {
    db.loadDatabase(function(err) {

      db.find({
        config: 'init',
      }, function(err, newDoc) {

        if (newDoc.length > 0 && newDoc[0].value) {
          resolve();
          return;
        }

        let initData = [].concat(scene, data, [{
          config: 'init',
          value: 1,
        }]);

        db.insert(initData, function(err, newDoc) {
          // console.log(newDoc)
          if (err) {
            handleException(err);
          } else {
            resolve();
          }
        });
      })

    });
  })

}

module.exports = {
  initDB,
  db,
}
