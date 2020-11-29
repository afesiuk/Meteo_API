let ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
    const db_meteo = db.collection('meteoData');

    /* GET -> Status data */
    app.get('/sensors', (req, res) => {
        let date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let sec = date.getSeconds();
        let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let tz_off = date.getTimezoneOffset();
        res.json({
            status: 'Online',
            message: 'Welcome to our Test Api server',
            project: 'ESP32_Meteo_API',
            server_date: day + '-' + month + '-' + year,
            server_time: hours + ':' + minutes + ':' + sec,
            timezone: tz,
            timezone_off_UTC: tz_off,
            co2_type: 'ppm',
            temp_type: 'Celsius',
            press_bme : 'hPa',
            hum_type: '%'
        });
    });

    /* GET -> Get 50 last objects in db */
    app.get('/sensors/history', (req, res) => {
        db_meteo.find().limit(50).sort({$natural : -1}).toArray(function(err, item) {
            if(err) return res.send({'error' : 'An error has occured'});
            res.send(item);
        });
    });

    /* GET -> last object from db */
    app.get('/sensors/last', (req, res) => {
        const details = {$natural : -1};
        db_meteo.find().limit(1).sort(details).toArray(function(err, item) {
            if(err) {
                res.send({'error' : 'An error has occured'});
                return console.log(err);
            }
            res.send(item);
        });
    });

    /* GET by id */
    app.get('/sensors/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        db_meteo.findOne(details, (err, item) => {
            if(err) {
                res.send({'error' : 'An error has occured'});
                return console.log(err);
            }
            res.send(item);
        })
    });

    /* POST object -> db */
    app.post('/sensors', (req, res) => {
        if(!req.body) return res.sendStatus(400);
        const sensor = {
            co2_mhz : req.body.co2_mhz, 
            temp_mhz : req.body.temp_mhz, 
            temp_bme : req.body.temp_bme, 
            hum_bme : req.body.hum_bme, 
            press_bme : req.body.press_bme,
            date_time : req.body.date_time
        };
        db_meteo.insertOne(sensor, (err, rslt) => {
            if(err) {
                res.send({'error' : 'An error has ocurred'});
                return console.log(err);
            }
            res.send(rslt.ops[0]);
        });
    });

    /* UPDATE object by id -> db */
    app.put('/sensors/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id) };
        const sensor = {
            co2_mhz : req.body.co2_mhz, 
            temp_mhz : req.body.temp_mhz, 
            temp_bme : req.body.temp_bme, 
            hum_bme : req.body.hum_bme, 
            press_bme : req.body.press_bme,
            date_time : req.body.date_time
        };
        db_meteo.updateOne(details, {$set : sensor}, {upsert : true}, (err, rslt) => {
             if(err) {
                 res.send({'error': 'An error has occured!'});
                 return console.log(err);
             } 
             res.send(sensor);
        }); 
    });

    /* DELETE object by id -> db */
    app.delete('/sensors/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        db_meteo.removeOne(details, (err, item) => {
            if(err) {
                res.send({'error' : 'An error has occured'});
                return console.log(err);
            }
            res.send('Item ' + id + ' has been deleted.');
        })
    });
}