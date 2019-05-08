# React with server-side rendering and django api on docker

## Features

* Building using [razzle][razzle]
* Server hot module reloading
* Server-side rendering
* Code splitting using [@loadable/component][@loadable/component]
* Babel 7 with fragments
* React 16.8.6 with hooks
* Registration and authentication using JWT and django-rest-framework

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

Go to [https://localhost][https://localhost].

To remove https warnings add `certs/cert.pem` to authorities in your browser.

To make your own certs:

```bash
cd certs
rm cert*
bash scert.sh cert
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

Go to [http0://localhost][http://localhost].

## Ideas behind the example

* [react-universally][react-universally]
* [razzle][razzle]
* [Setting up JWT Authentication][JWT A]

  [react-universally]: <https://github.com/ctrlplusb/react-universally>
  [razzle]: <https://github.com/jaredpalmer/razzle>
  [JWT A]: <https://thinkster.io/tutorials/django-json-api/authentication>
  [@loadable/component]: <https://github.com/smooth-code/loadable-components#readme>

