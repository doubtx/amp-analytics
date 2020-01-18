'use strict'

const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000
const path = require('path')
const aws = require('aws-sdk')
const AthenaExpress = require('athena-express')

const PageviewsQuery = require('./queries/pageviews')
const PagesQuery = require('./queries/pages')
const BrowsersQuery = require('./queries/browsers')
const CountriesQuery = require('./queries/countries')
const ReferrersQuery = require('./queries/referrers')
const ScreensQuery = require('./queries/screens')
const RefPagesQuery = require('./queries/refpages')

const awsCredentials = {}

aws.config.update(awsCredentials);

const athenaExpressConfig = {
	aws,
	s3: `s3://${process.env.ResultsBucket}/`,
  db: "amp-analytics"
}

const athena = new AthenaExpress(athenaExpressConfig);

app.use(cors())
app.get('/stats', cors(), async (req, res) => {
	let filters = {
		start: req.query.start,
		end: req.query.end,
		domain: req.query.domain,
		path : req.query.path,
		referrer: req.query.referrer
	}

	let datasets = [
		'pageviews',
		'browsers',
		'pages',
		'countries',
		'referrers',
		'screens',
		'refpages'
	]

	let queries = [
		PageviewsQuery,
		BrowsersQuery,
		PagesQuery,
		CountriesQuery,
		ReferrersQuery,
		ScreensQuery,
		RefPagesQuery
	]

	let promises = []
	for (let i = 0; i < queries.length; i++) {
		promises.push(athena.query({
			sql: new queries[i](filters).get_query()
		}))
	}

	let results = await Promise.all(promises)
	let response_pageviews = {
		labels: [],
		datasets: [
			{
				label: 'Pageviews',
				backgroundColor: "rgba(191, 237, 245, 0.5)",
				borderColor: "#00C5E5",
				pointHoverBorderColor: "#9AA7B4",
				pointHoverBackgroundColor: "#9AA7B4",
				data: []
			},
			{
				label: 'Unique Pageviews',
				backgroundColor: "rgba(191, 237, 245, 0.5)",
				borderColor: "#00C5E5",
				pointHoverBorderColor: "#9AA7B4",
				pointHoverBackgroundColor: "#9AA7B4",
				data: []
			}
		]
	}

	let total = 0
	for (let i = 0; i < results[0]['Items'].length; i++) {
		total = total + parseInt(results[0]['Items'][i].pageviews)
		response_pageviews.labels.push(results[0]['Items'][i].date)
		response_pageviews.datasets[0].data.push(results[0]['Items'][i].pageviews)
		response_pageviews.datasets[1].data.push(results[0]['Items'][i].unq_pageviews)
	}

	let res_results = {
		total: total,
		pageviews: response_pageviews
	}

	let rows
	for (let i = 1; i < queries.length; i++) {
		rows = []
		for (let k = 0; k < results[i]['Items'].length; k++) {
			rows.push(results[i]['Items'][k])
		}

		res_results[datasets[i]] = rows
	}

  res.send({
    status: 200,
    body: 'ok',
    results: res_results
  })

})

module.exports = app
