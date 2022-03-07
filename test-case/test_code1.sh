curl --location --request POST '52.40.170.79:5000/auth/register' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "username":"test",
        "password":"12345678"
}'
curl --location --request POST '52.40.170.79:5000/auth/login' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "username":"test",
        "password":"12345678"
}'
curl --location --request GET '52.40.170.79:5000/auth/logout' \
	--header 'Content-Type: application/json' \
	--data-raw '{}'

