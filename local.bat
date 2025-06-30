-- DOCKER_BUILDKIT=1 docker build --file Dockerfile --output out .
cp -r dist/web/browser/* /d/packages/nginx-1.27.1/html/www/
