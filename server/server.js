const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const axios = require('axios');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static('./client/dist'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// routes ======================================================================


app.get('/api/programs', (req, res) => {

    axios.get("https://public.leagueapps.io/v1/sites/6970/programs/current", {
        headers: {
            'la-api-key': 'a8d8ce1315e787a7bc16c7120c926f32',
        }
    }).then(response => {
        console.log(response.status)
        res.send(response.data);
    })

});

app.get('/api/program', (req, res) => {

    axios.get("https://public.leagueapps.io/v1/sites/6970/programs/" + '103595', {
        headers: {
            'la-api-key': 'a8d8ce1315e787a7bc16c7120c926f32',
        }
    }).then(response => {
        console.log(response.status)
        res.send(response.data);
    })

});

app.get('/api/program/schedule', (req, res) => {

    let url = "https://public.leagueapps.io/v1/sites/6970/programs/" + '103595' + '/schedule'

    axios.get(url, {
        headers: {
            'la-api-key': 'a8d8ce1315e787a7bc16c7120c926f32',
        }
    }).then(response => {
        console.log(response.data)
        let schedule = response.data;

        url = 'https://public.leagueapps.io/v1/sites/6970/programs/103595/teams'

        axios.get(url, {
            headers: {
                'la-api-key': 'a8d8ce1315e787a7bc16c7120c926f32',
            }
        }).then(response => {

            let teams = response.data;

            url = 'https://public.leagueapps.io/v1/sites/6970/programs/103595'

            axios.get(url, {
                headers: {
                    'la-api-key': 'a8d8ce1315e787a7bc16c7120c926f32',
                }
            }).then(response => {

                res.send({
                    schedule: schedule,
                    teams: teams,
                    program: response.data
                });
            })
        })
    })

});

app.listen(port, () => console.log(`Listening on port ${port}`));
