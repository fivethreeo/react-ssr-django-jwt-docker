#! /bin/bash

mkdir /tmp/scert 2>/dev/null
rm -r /tmp/scert/* 2>/dev/null

if [ $# -ne 1 ];
then
        echo "Usage: scert <name>"
        exit
fi

pass=12345

echo "[req]" > /tmp/scert/tmp.cnf
echo "default_bits = 2048" >> /tmp/scert/tmp.cnf
echo "prompt = no" >> /tmp/scert/tmp.cnf
echo "default_md = sha256" >> /tmp/scert/tmp.cnf
echo "distinguished_name = dn" >> /tmp/scert/tmp.cnf
echo "" >> /tmp/scert/tmp.cnf
echo "[dn]" >> /tmp/scert/tmp.cnf
echo "C=NO" >> /tmp/scert/tmp.cnf
echo "ST=Trøndelag" >> /tmp/scert/tmp.cnf
echo "L=Levanger" >> /tmp/scert/tmp.cnf
echo "O=Private" >> /tmp/scert/tmp.cnf
echo "OU=Private" >> /tmp/scert/tmp.cnf
echo "emailAddress=oyvind.saltvik@gmail.com" >> /tmp/scert/tmp.cnf
echo "CN = localhost" >> /tmp/scert/tmp.cnf

echo "authorityKeyIdentifier=keyid,issuer" > /tmp/scert/tmp.ext
echo "basicConstraints=CA:FALSE" >> /tmp/scert/tmp.ext
echo "keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment" >> /tmp/scert/tmp.ext
echo "subjectAltName = @alt_names" >> /tmp/scert/tmp.ext
echo "" >> /tmp/scert/tmp.ext
echo "[alt_names]" >> /tmp/scert/tmp.ext
echo "DNS.1 = localhost" >> /tmp/scert/tmp.ext

openssl genrsa -des3 -passout pass:$pass -out /tmp/scert/tmp.pass.key 2048
openssl rsa -passin pass:$pass  -in "/tmp/scert/tmp.pass.key" -out "/tmp/scert/tmp.key"

openssl req -x509 -new -nodes -key /tmp/scert/tmp.key  -subj "/C=NO/ST=Trøndelag/L=Levanger/O=Private/OU=Private/CN=localhost" -sha256 -days 1024 -out /tmp/scert/$1.pem

openssl req -new -sha256 -nodes -out /tmp/scert/tmp.csr -newkey rsa:2048 -keyout /tmp/scert/$1.key -config <( cat /tmp/scert/tmp.cnf )

openssl x509 -req -in /tmp/scert/tmp.csr -CA /tmp/scert/$1.pem -CAkey /tmp/scert/tmp.key -CAcreateserial -out /tmp/scert/$1.crt -days 500 -sha256 -extfile /tmp/scert/tmp.ext

if [ -e "/tmp/scert/$1.key" ];
then
        cp /tmp/scert/$1.key .
        chmod 640 $1.key
else
        echo "ERROR: /tmp/scert/$1.key not found"
fi

if [ -e "/tmp/scert/$1.crt" ];
then
        cp /tmp/scert/$1.crt .
        chmod 755 $1.crt
else
        echo "ERROR: /tmp/scert/$1.crt not found"
fi

if [ -e "/tmp/scert/$1.pem" ];
then
        cp /tmp/scert/$1.pem .
        chmod 755 $1.pem
else
        echo "ERROR: /tmp/scert/$1.pem not found"
fi

rm -r /tmp/scert/* 2>/dev/null