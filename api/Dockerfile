FROM node:16-alpine3.16

WORKDIR /api
COPY . /api
COPY .env .

# ENV NODE_ENV dev


# RUN npm install
# RUN npm ci --only=procduction 
RUN npm i 
# RUN npm run inst

# RUN npm run build

# ENTRYPOINT ["./start.sh"] 
# CMD ["&&", "npm", "run", "start"] 
CMD ["npm", "run", "watch"]


EXPOSE 3030/tcp