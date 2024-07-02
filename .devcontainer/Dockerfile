FROM node:lts-bookworm

RUN apt update && apt install -y git
RUN corepack enable

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install