export class DeploymentError extends Error {
	constructor() {
		super(`There was an error while configuring a command. Was your database setup correctly?`);
	}
}