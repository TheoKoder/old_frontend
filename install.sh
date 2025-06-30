DOCKER_BUILDKIT=1 docker build --file Dockerfile --output out .
sudo cp -r out/browser/* /var/www/dat/
