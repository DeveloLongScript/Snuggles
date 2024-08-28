export class PingError extends Error {
	constructor() {
		super(`There was an issue while pinging the database. Please try again later.`);
	}
}