export class dbError extends Error {
	constructor() {
		super("There was an error while connecting to the database. Maybe try again later?");
	}
}