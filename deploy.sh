# ng build --configuration=stag2a-thermomix-sg 

cd dist/doxa-retail

#Clean s3
aws s3 rm s3://codix-ui --recursive

#use cp for more reliable behavior
aws s3 cp . s3://codix-ui/ --recursive

#invalidate CF
aws cloudfront create-invalidation --distribution-id EGMPIWX12W0JW --paths "/*"