
zip -r amp-analytics-stats.zip index.js app.js node_modules queries
aws lambda update-function-code --function-name amp-analytics-stats --zip-file fileb://amp-analytics-stats.zip
