
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

Export some variables to be during with AWS CloudFormation stack deployment, values bellow are just examples, you can use any, but please define some AWS unique bucket name:
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


### Deploying frontend reporting SPA
After successful deployment of AWS CloudFormation stack, your tracking and reporting APIs should be up and running

You need to get some automatically generated stack parameters to be used in the next steps, to do that, you need to get details on just deployed stack:
```shell
aws cloudformation describe-stacks --stack-name $AWSStackName
```
