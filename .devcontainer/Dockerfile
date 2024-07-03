FROM node:lts-bookworm

RUN apt update && apt install -y git

WORKDIR /workspaces/bmi-calculator

COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "./"]
RUN corepack enable pnpm \
    && corepack install \
    && pnpm install

EXPOSE 5173