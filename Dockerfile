FROM node:18-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json prisma/schema.prisma ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWRlcXVhdGUtZWxlcGhhbnQtNTIuY2xlcmsuYWNjb3VudHMuZGV2JA
ENV CLERK_SECRET_KEY=sk_test_jRUanLzIJtQEKTG5nY4OS6PYL0hAbyI436Mbw5bdV1
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ENV TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjkyODEyOTAsImlkIjoiN2U2Zjc5OTYtNzhjNi00Zjk5LWE0Y2QtZTdkMjQ4M2Y2NjliIn0.k02vqo3Tfu3Si-gg_-UZQZ356j9tSt6S1IHLhS1AxQ2_g4OhS2vDsltLN6j-4QboLEOFovFGhUI7a7Ped0dJDw"
ENV TURSO_DATABASE_URL="libsql://mydb-awesomethan.turso.io"
EXPOSE 3000
CMD ["npm", "run", "dev"]