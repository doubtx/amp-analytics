'use strict';
const querystring = require('querystring')
const uaparser = require('ua-parser-js')
const url = require('url');
const Kinesis = require('aws-sdk/clients/kinesis')

// Adjust Kinesis region here to be used as the main region for stack
const KINESIS_REGION = 'us-east-1'

const kinesis = new Kinesis({
  region: KINESIS_REGION
})

exports.handler = async (event, context) => {
    let records = []
    for (let i = 0; i < event['Records'].length; i++) {
      console.log(JSON.stringify(event['Records'][i]))

      let payload = querystring.parse(event['Records'][i]['cf']['request']['querystring'])
      payload.ip = event['Records'][i]['cf']['request']['clientIp']

      //Prepare referrer
      if (payload.referrer) {
        let url_parsed = url.parse(payload.referrer)
        payload.ref_domain = url_parsed.hostname
        payload.ref_path = url_parsed.pathname
        payload.ref_query = url_parsed.search
      }

      // Parsing browser details
      let ua = uaparser(payload['ua'])
      payload.browser = {
        name: ua.browser.name,
        major: ua.browser.major
      }

      payload.os = {
        name: ua.os.name,
        version: ua.os.version
      }

      payload.country = event['Records'][i]['cf']['request']['headers']['cloudfront-viewer-country'][0][['value']]

      let kinesis_payload = {
        Data: JSON.stringify(payload) + '\n',
        PartitionKey: 'AMP_Pageview',
        StreamName: 'amp-tracking-stream'
      }

      let err, data = await kinesis.putRecord(kinesis_payload).promise()
      if (err) {
        console.log(err, err.stack)
      }

      records.push(payload)
    }

    console.log(JSON.stringify(records))

    const response = {
        status: '200',
        body: JSON.stringify({
          status: 200,
          message: 'tracked',
          records: records
        }),
    };

    return response;
};
