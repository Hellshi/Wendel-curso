echo $'\n\n[requesting]: normal request'

curl -i  -X POST --data '{"name": "hell", "age": 90}' localhost:3000

echo $'\n\n[requesting]: wrong age'

curl -i  -X POST --data '{"name": "hell", "age": 10}' localhost:3000


echo $'\n\n[requesting]: wrong name'

curl -i  -X POST --data '{"name": "hel", "age": 90}' localhost:3000

echo $'\n\n[requesting]: db error'

curl -i  -X POST --data '{"name": "hell", "age": 90, "connectionError": ""}' localhost:3000
