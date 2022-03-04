# ng build --configuration=stag2a-thermomix-sg 

cd dist/doxa-retail


#Clean s3
aws s3 rm s3://omed-customer-ui --recursive

#use cp for more reliable behavior
aws s3 cp . s3://omed-customer-ui/ --recursive

#invalidate CF
aws cloudfront create-invalidation --distribution-id E2NBX43NNX2VQZ --paths "/*"