[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## LocalStack + AWS Commands: 
``` 
aws configure --profile localstack
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue
aws --endpoint-url=http://localhost:4566 sqs send-message --queue-url http://localhost:4566/000000000000/my-queue --message-body "Hello, world!"
aws --profile localstack --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/my-queue
aws --endpoint-url=http://localhost:4566 sns create-topic --name my-topic
aws --endpoint-url=http://localhost:4566 sns list-topics
aws --endpoint-url=http://localhost:4566 sqs list-queues
aws --endpoint-url=http://localhost:4566 sqs get-queue-attributes --queue-url http://localhost:4566/000000000000/my-queue --attribute-names QueueArn
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

[KaaVii licensed](LICENSE).
