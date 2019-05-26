FROM thecodingmachine/nodejs:10

COPY --chown=docker . .

RUN npm install

CMD ["npm", "run", "dev"]
