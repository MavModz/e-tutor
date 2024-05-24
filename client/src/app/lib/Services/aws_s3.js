import AWS from 'aws-sdk';
require("dotenv").config();

const aws_s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS,
    region: process.env.NEXT_PUBLIC_AWS_REGION 
});

export default aws_s3