**Localhost:**<br>
Everything is working.
Tests are implemented for one route with two scenarios, in a bit of unconventional way.<br>
Make sure to create `.env` file based on `.env.template`<br>
Run `yarn` to have everything installed.<br>
Create empty database on your local machine.<br>
Run `yarn prisma db push` and `yarn prisma generate` <br>
Run `yarn build` to build the app.

And then either dev or start.<br>

build: `yarn build`<br>
dev: `yarn dev`<br>
start: `yarn start`<br>

You can start by registering, logging in, and then trying the Task routes.

**Tests:**<br>
Tests can be executed with `yarn test` after the app is up and running.

**Docker:**<br>
Docker compose: `docker-compose up --build`

**API Docs**<br>
Since it's not possible to auto-generate swagger docs,
and writing comments manually is a bit unacceptable.
I'll share a postman collection together with this task.
