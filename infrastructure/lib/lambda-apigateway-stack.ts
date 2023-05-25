import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { PolicyStatement, Effect} from 'aws-cdk-lib/aws-iam'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from "path";

export class LambdaApigatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    

    // create rest api
    const OrderCreateAPI = new RestApi(this, "OrderCreateAPI");
    
    // create lambda function
    const OrderFunction = new NodejsFunction(this, 'OrderFunction', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: path.join(__dirname, `/../lambda/app.ts`),
      environment: {
        NODE_ENV: 'dev'
      }
    });
    
    // set resource path and method for lambda function
     OrderCreateAPI.root
     .resourceForPath("/order")
    .addMethod("GET", new LambdaIntegration(OrderFunction));
    
  }
}
