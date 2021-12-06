class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.status = status,
        this.message = msg
    }

    static AlreadyExist(message){
        return new CustomErrorHandler(409,message);
    }
}

export default CustomErrorHandler;