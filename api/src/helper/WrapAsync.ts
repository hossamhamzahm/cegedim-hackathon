import express from "express";
import ExpressError from "./ExpressError";


export default function <T>(fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<T>): 
    /* this is the return type of the wrapper, which is a function itself */
    (...args: any[]) => Promise<T | void> {
	return async (req, res, next) => {
		try {
			return await fn(req, res, next);
		} 
        catch (e: unknown) {
            let structured_error: {
                [key: string]: string | undefined | number | boolean
            } = {};
            
            try{
                structured_error = {
                    // @ts-ignore
                    message: e.message,
                    // @ts-ignore
                    stack: e.stack,
                };
            }
            catch(e){
                
            }
            next(structured_error);
        }
	};
}