#From defines the base image where your image depends on
FROM node:16.6.2-slim
#Define a working directory in the docker container where you can find the code later on.
WORKDIR /usr/src/app
#Expose port to access server. 
ENV PORT=8080
EXPOSE 8080
#COPY all files into the image, this way all node-modules are available and you can immediately run the code
COPY . .
#This command will run when the docker image is boots. And start the server.
CMD ["npm","start"]