
import { ValidationError } from "joi";
import CustomErrorHandler from "../service/CustomErrorHandler";
const ErrorHandler = (err, req, res, next)=>{
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        originalError: err.message,
    }

    if(err instanceof ValidationError)
    {
        statusCode = 422;
        data = {
            message:err.message,
        }
    }
    if(err instanceof CustomErrorHandler)
    {
        statusCode = err.status,
        data = {
            message:err.message,
        }
    }

    res.status(statusCode).json(data);


}
export default ErrorHandler;