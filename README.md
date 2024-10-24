docker build -t backendtask .

docker run --env-file ./.env backendtask
