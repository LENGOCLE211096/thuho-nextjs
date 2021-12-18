:: docker build -t thuho . 

:: docker run -d -p 3000:3000 thuho

aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 695660539618.dkr.ecr.ap-southeast-1.amazonaws.com > NUL

docker tag thuho:latest 695660539618.dkr.ecr.ap-southeast-1.amazonaws.com/thuho2021-dev:latest > NUL

docker push 695660539618.dkr.ecr.ap-southeast-1.amazonaws.com/thuho2021-dev:latest > NUL

aws ecs update-service --service ThuHoService --desired-count 0 --cluster ThuHo > NUL

timeout 30 > NUL

aws ecs update-service --service ThuHoService --desired-count 2 --cluster ThuHo > NUL


:: ecs-cli logs --task-id 2289db4760a441b19ad0e4fd3cb3f747 --cluster ThuHo > log_thuho_node_1.txt

:: ecs-cli logs --task-id b1de2841e6cf42c0bdea040461a919f4 --cluster ThuHo > log_thuho_node_2.txt

:: aws ecs describe-services --service ThuHoService --cluster ThuHo  
