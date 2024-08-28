export class NotImplementedError extends Error {
	constructor(functionName: string, nameOfFunc?: string) {
		super(`${nameOfFunc != undefined ? `[${nameOfFunc}]` : ""} ${functionName} has not been implemented. Something went wrong..`);
	}
}