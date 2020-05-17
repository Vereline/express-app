#!/bin/bash

docker build -t express_app_container .

docker run --name express_app_mongodb -p 27017:27017 -p 1234:1234 -i -t express_app_container 
