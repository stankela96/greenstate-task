**Localhost:**<br>
Everything is working.
Tests are not implemented, neither is react.<br>
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

**Docker:**<br>
Command bellow is working, but i didn't manage to make swagger work with it.<br>
Docker compose: `docker-compose up --build`
