import type { NextFunction, Request, Response } from 'express';
declare const apiKeyValidator: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default apiKeyValidator;
//# sourceMappingURL=apiKeyAuth.middleware.d.ts.map