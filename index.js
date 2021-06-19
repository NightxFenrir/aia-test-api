const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const urlFormatJson = '?format=json&nojsoncallback=1';

app.use(cors());

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/', function (req, res) {
	res.send('Test live');
});

app.get('/photos-public', (req, res) => {
	const tags = req.query.tags;
	const url = encodeURI('https://api.flickr.com/services/feeds/photos_public.gne' + urlFormatJson + '&tags=' + tags);

	fetch(url)
		.then(response => response.json())
		.then(data => {
			return res.send({ success: true, result: data });
		})
		.catch(error => {
			console.log('photo error = ', error);

			return res.send({ success: false, message: error });
		});
});

var server = app.listen(
	8081,
	/*"127.0.0.1",*/ function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Example app listening at http://%s:%s', host, port);
	}
);
