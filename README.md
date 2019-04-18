# Razzle With Django Example

## How to use

Download the example [or clone the whole project](https://github.com/fivethreeo/django-razzle-secure.git):

```bash
curl https://codeload.github.com/fivethreeo/django-razzle-secure/tar.gz/master | tar -xz django-razzle-secure-master
cd django-razzle-secure-master
```

Install it and run:

```bash
pipenv install
yarn install
pipenv run python runserver.py & pid=$! && sleep 5 && pid=`pgrep -P $pid` && yarn start
kill -9 $pid
```

## Idea behind the example

This is a basic, bare-bones example of how to use razzle. It satisfies the entry points and use scss as styling language
You can import anything from node_modules or other scss files, like Bootstrap, etc.
`src/index.js` for the server, `src/client.js` for the browser, and `src/App.scss` for SCSS style.
