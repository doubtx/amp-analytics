
## AMP Analytics Installation guide

### Prerequisites:
* AWS CLI installed and logged in with admin access project permissions
* NodeJS + NPM installed

### Deploying tracking and reporting service stack
Clone repo and install dependencies for Lambda functions
```shell
git clone https://github.com/doubtx/amp-analytics.git
cd amp-analytics

cd lambda/amp-reporting-api
npm install

cd ../amp-tracking-pixel
npm install

cd ../..
```

Export some variables to be used during AWS CloudFormation stack deployment, values bellow are just examples, you can use any, but please define some AWS unique bucket name:
```shell
export LambdaCodeBucket=amp-analytics-lambda-code
export AWSStackName=amp-analytics-debug-stack
```

Create AWS S3 bucket to be used for Lambda code uploads and deploy Cloud formation stack:
```shell
aws s3api create-bucket --bucket $LambdaCodeBucket
aws cloudformation package --template-file ./cloudformation/template.yaml --s3-bucket $LambdaCodeBucket --output-template-file ./cloudformation/packaged-template.yaml
aws cloudformation deploy --template-file ./cloudformation/packaged-template.yaml --stack-name $AWSStackName --capabilities CAPABILITY_IAM
```
> :warning: **Stack deployment takes about 30 min**: There is CloudFormation distribution to be created which is time consuming process

### Retrieving AWS CloudFormation stack parameters
After successful deployment of AWS CloudFormation stack you need to retrieve a number of parameters to be used in the next steps, first describe the newly created stack:
```shell
aws cloudformation describe-stacks --stack-name $AWSStackName
```

That will return JSON with stack details with output variables, we need the following env variables to be set based on stack outputs:
```shell
export CFFrontBucket=[CloufFrontBucket]
export CfFrontHost=[CloudFrontDomainName]
export CognitoUserPoolId=[CognitoUserPoolID]
export CognitoUserPoolClientId=[CognitoUserPoolClientID]
export GlueCrawlerName=[GlueCrawlerName]
```

### Running Glue crawler first time manually (Optional)
While tracking Pixel endpoint is already running, the database for reporting is not yet created, it will be created on the first run of Glue Crawler, which will scan S3 bucket, find all the data files and add them to data catalog, that crawl is configured to be executed automatically every day at 12, but you can first run crawler manually to create all the tables:
```shell
aws glue start-crawler --name $GlueCrawlerName
```
> :warning: **Before table is created, reporting API will return error**


### Deploying SPA
Reporting SPA is based on VueJS + Quasar framework, to build it, you need Quasar CLI to be installed globally:
```shell
npm install -g @quasar/cli
```

After installation of Quasar, run the following commands to build and deploy SPA application:
```shell
cd frontend
npm install
quasar build
aws s3 cp ./dist/spa/ s3://$CFFrontBucket/ --recursive --acl public-read
```

### Creating user to access reporting SPA
Run the following commands to create reporting user which can access SPA, please specify username and password you want to use:
```shell
aws cognito-idp admin-create-user --user-pool-id $CognitoUserPoolId --username [USERNAME]
aws cognito-idp admin-set-user-password --user-pool-id CognitoUserPoolId --username [USERNAME] --password [PASSWORD] --permanent
```

### Setting tracking pixel
Install the following pixel on the website:
```html
<amp-pixel src="https://d1ek6qfr9pi4xc.cloudfront.net/track?vw=VIEWPORT_WIDTH&vh=VIEWPORT_HEIGHT&sw=SCREEN_WIDTH&ua=USER_AGENT&sh=SCREEN_HEIGHT&title=TITLE&referrer=DOCUMENT_REFERRER&domain=SOURCE_HOSTNAME&page=CANONICAL_PATH&ext_ref=EXTERNAL_REFERRER" layout=nodisplay>
```


### Accessing SPA
Login to SPA using following URL:
https://CloudFrontDomainName/login
