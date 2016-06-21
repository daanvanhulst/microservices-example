FROM    ubuntu:14.04

ENV     DEBIAN_FRONTEND noninteractive

RUN     apt-get update && apt-get install -y git npm nodejs openjdk-7-jre && ln -s /usr/bin/nodejs /usr/local/bin/node

ADD     . /build

WORKDIR /build

RUN     npm install -g bower && bower install --allow-root && npm install

CMD     ./node_modules/gulp/bin/gulp.js serve