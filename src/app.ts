import { envs } from './core/config/env';
import { Server } from './server';

const server = new Server({
	port: envs.PORT
});

export const app = server.getApp();

(() => {
	main();
})();

function main(): void {
	void server.start();
}
