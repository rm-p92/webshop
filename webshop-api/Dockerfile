FROM ruby:3.4.5

WORKDIR /app

RUN apt-get update -qq \
  && apt-get install -y --no-install-recommends \
     build-essential \
     libmariadb-dev \
     libmariadb-dev-compat \
     default-mysql-client \
     curl \
     netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g yarn

ARG BUNDLER_VERSION=2.4.14
RUN gem install bundler -v ${BUNDLER_VERSION}

COPY Gemfile Gemfile.lock* ./
RUN bundle install --jobs 4 --retry 3

COPY . .

COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
