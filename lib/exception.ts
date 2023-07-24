export class AuthRequiredError extends Error{
    constructor(message ='Auth is requireds'){
        super(message)
        this.name = 'AuthRequiredError'
    }
}