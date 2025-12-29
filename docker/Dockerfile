FROM node:24-alpine AS build
WORKDIR /app

# Copy environment config
COPY package*.json ./
COPY tsconfig.json ./

# Copy all source code.
COPY server.ts ./server.ts
COPY src/ ./src/

# Set ownership of the application directory to the new user.
RUN chown -R node:node /app


# Install everything
RUN npm ci --omit=dev && npm cache clean --force && \
  apk add --no-cache ffmpeg

# Clean up temporary and cache files to reduce image size.
RUN rm -rf /tmp/* && \
  rm -rf /var/tmp/* && \
  rm -f **/vitest.*.js

USER node

ARG PORT=3000
ENV PORT=${PORT}

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
  CMD wget -q -O- http://127.0.0.1:${PORT}/api/v1/health || exit 1

EXPOSE ${PORT}
CMD ["npm", "start"]
