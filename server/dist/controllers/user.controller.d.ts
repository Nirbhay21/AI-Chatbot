import type { Request, Response } from 'express';
declare const _default: {
    registerUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getPublishedImages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=user.controller.d.ts.map