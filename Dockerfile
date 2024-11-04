FROM node:18
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
COPY package*.json prisma/schema.prisma ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]