curl --location --request POST '52.40.170.79:5000/auth/login' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "username":"test",
        "password":"12345678"
}'
curl --location --request POST '52.40.170.79:5000/create_track' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "address":"test"
    }'
    curl --location --request POST '52.40.170.79:5000/create_track' \
	    --header 'Content-Type: application/json' \
	    --data-raw '{
        "address":"test"
}'

