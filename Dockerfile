FROM node:8
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
CMD ["yarn", "run", "server:prod","&&","yarn","run","serve:build"]

