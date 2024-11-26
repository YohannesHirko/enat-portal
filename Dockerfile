# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.13.1
ARG PRODUCTION_URL

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .
ENV REACT_APP_PRODUCTION_URL=$PRODUCTION_URL
# Run the build script to generate the production build.
RUN npm run build

################################################################################
# Create a new stage to run the application with Nginx
FROM nginx:alpine as final

# Copy the build output from the build stage to Nginx's default html directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom Nginx configuration if you want to override the default settings
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Expose port 80 to be able to access the application
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

