# Razzle With Django Example

## How to use

Download the example [or clone](https://github.com/fivethreeo/react-ssr-django-jwt-docker.git):

```bash
curl https://codeload.github.com/fivethreeo/react-ssr-django-jwt-docker/tar.gz/master | tar -xz react-ssr-django-jwt-docker-master
cd react-ssr-django-jwt-docker-master
```

### To run using docker

Build images:

```bash
docker-compose -f docker.compose.yml -f docker-compose.dev.yml build
```

Run database migrations:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml run djangoapi python manage.py migrate
```

Run all services (traefik, djangoapi, reactapp):

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### To run locally:

Install requirements:

```bash
pipenv install
yarn install
```

Run database migrations:

```bash
pipenv run python manage.py migrate
```

Start the django api and the react app:

```bash
pipenv run python runserver.py & pid=$! && sleep 5 && pid=`pgrep -P $pid` && yarn start
kill -9 $pid
```

## Ideas behind the example

* [[react-universally]][react-universally]

  [react-universally]: <https://github.com/ctrlplusb/react-universally>