import { StatusCodes } from "http-status-codes";

interface ErrorMsg{
    get msg():string
    get statusCode():number
}
class GenericError implements ErrorMsg{
    protected _statusCode:number
    protected _msg:string

    constructor(msg:string, statusCode:number){
        this._msg=msg
        this._statusCode=statusCode
    }
    get statusCode(){
        return this._statusCode
    }
    get msg(){
        return this._msg
    }
}

class BadRequestError extends GenericError{}        //400
class UnauthorizedError extends GenericError{}      //401
class ForbiddenError extends GenericError{}         //403
class NotFoundError extends GenericError{}          //404
class InternalServerError extends GenericError{}    //500

class ErrorFactory {
    constructor(){}
    getError(code:StatusCodes, msg:string):ErrorMsg{
        let retval:ErrorMsg
        switch(code){
            case StatusCodes.NOT_FOUND:
                retval = new NotFoundError(msg, code)
                break
            case StatusCodes.UNAUTHORIZED:
                retval = new UnauthorizedError(msg, code)
                break
            case StatusCodes.INTERNAL_SERVER_ERROR:
                retval = new InternalServerError(msg, code)
                break
            case StatusCodes.FORBIDDEN:
                retval = new ForbiddenError(msg, code)
                break
            case StatusCodes.BAD_REQUEST:
                retval = new BadRequestError(msg, code)
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
    ErrorMsg,
    UnauthorizedError
} 