import {NextFunction, Request, Response} from "express";

// interface PromiseFulfilledResult<T> {
//     status: string;
//     data: T; // promise resolved value
// }
// interface PromiseRejectedResult {
//     status: string;
//     message: string; // promise rejected value
// }
// type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

type CatchAsyncCallbackType = (req: Request, res: Response, next: NextFunction) => Promise<void>

// this closure function is a warp over controller to get rid of repeating catch section in each controller
module.exports = (fn: CatchAsyncCallbackType) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: Error) => next(error));
};