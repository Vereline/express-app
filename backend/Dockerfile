############################################################
# Dockerfile to build MongoDB container images
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
LABEL maintainer="Viktoryia Stanko <vikroryia.stanko@gmail.com>"

ENV TZ=Europe/Minsk
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Update the repository sources list and install gnupg2
RUN apt-get update && apt-get install -y gnupg2

################## BEGIN INSTALLATION ######################
# Install MongoDB Following the Instructions at MongoDB Docs
# Ref: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

# Add the package verification key
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 68818C72E52529D4

# Add MongoDB to the repository sources list
RUN echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list

# Update the repository sources list once more
RUN apt-get update

# Install MongoDB package (.deb)
# RUN apt-get install -y mongodb-org git nodejs npm
RUN apt-get install -y mongodb-org

# RUN nodejs --version
# RUN npm --version
# RUN git --version
# RUN mongodb --version

# Create the default data directory
RUN mkdir -p /data/db

# Install mongo admin
# RUN git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo
# RUN npm install 
# RUN npm start 

##################### INSTALLATION END #####################

# Expose the default port
EXPOSE 27017 1234

# Default port to execute the entrypoint (MongoDB)
# CMD ["--port 27017"]
CMD ["--port 27017"]

# Set default container command
ENTRYPOINT usr/bin/mongod