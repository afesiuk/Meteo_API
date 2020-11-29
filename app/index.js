const serverRoutes = require('./routes');
module.exports = (app,db) => {
  serverRoutes(app, db);
}