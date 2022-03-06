curl --location --request POST '52.40.170.79:5000/auth/login' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "username":"non-exist",
        "password":"12345678"
}'

