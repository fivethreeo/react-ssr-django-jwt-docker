FROM python:3.7-alpine as base
ENV PYTHONUNBUFFERED 1
# Creating working directory
RUN mkdir /tmpdb
RUN mkdir /code
WORKDIR /code

# Copying requirements
COPY requirements.txt requirements.txt

RUN pip install --upgrade pip setuptools wheel

RUN apk add --no-cache --virtual .build-deps \
    ca-certificates gcc postgresql-dev linux-headers musl-dev \
    libffi-dev jpeg-dev zlib-dev git \
    && pip install -r requirements.txt \
    && pip install uwsgi \
    && find /usr/local \
        \( -type d -a -name test -o -name tests \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' + \
    && runDeps="$( \
        scanelf --needed --nobanner --recursive /usr/local \
                | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                | sort -u \
                | xargs -r apk info --installed \
                | sort -u \
    )" \
    && apk add --virtual .rundeps $runDeps \
    && apk del .build-deps

# Uncomment after creating your docker-entrypoint.sh
# ENTRYPOINT ["/code/docker-entrypoint.sh"]

FROM base as dev

# Start uWSGI
CMD ["python", "runserver.py"]

FROM base as prod
COPY djangoapi djangoapi/
COPY manage.py manage.py

# Add any static environment variables needed by Django or your settings file here:
ENV DJANGO_SETTINGS_MODULE=djangoapi.settings

# Tell uWSGI where to find your wsgi file (change this):
ENV UWSGI_WSGI_FILE=djangoapi/wsgi.py

# Base uWSGI configuration (you shouldn't need to change these):
ENV UWSGI_HTTP=:3002 UWSGI_MASTER=1 UWSGI_HTTP_AUTO_CHUNKED=1 UWSGI_HTTP_KEEPALIVE=1 UWSGI_UID=1000 UWSGI_GID=2000 UWSGI_LAZY_APPS=1 UWSGI_WSGI_ENV_BEHAVIOR=holy

# Number of uWSGI workers and threads per worker (customize as needed):
ENV UWSGI_WORKERS=2 UWSGI_THREADS=4

# Call collectstatic (customize the following line with the minimal environment variables needed for manage.py to run):
# RUN DATABASE_URL='' python manage.py collectstatic --noinput

# Start uWSGI
CMD ["uwsgi", "--show-config"]
