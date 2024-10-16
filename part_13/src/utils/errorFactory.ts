import { StatusCodes } from "http-status-codes";

interface ErrorMsg{
    get msg():string
    get statusCode():number
}

class NotFoundError implements ErrorMsg{
    private _statusCode:number
    private _msg:string

    constructor(msg:string){
        this._statusCode=StatusCodes.NOT_FOUND
        this._msg=msg
    }
    get statusCode(){
        return this._statusCode
    }
    get msg(){
        return this._msg
    }
}

class ErrorFactory {
    constructor(){}
    getError(code:StatusCodes, msg:string):ErrorMsg{
        let retval:ErrorMsg
        switch(code){
            case StatusCodes.NOT_FOUND:
                retval = new NotFoundError(msg)
                break
            default:
                throw new Error(`Factory Error: Unhandled status code: ${code}`)
        }
        return retval
    }
}

const factory:ErrorFactory = new ErrorFactory()

export {
    factory,
    ErrorMsg
} 