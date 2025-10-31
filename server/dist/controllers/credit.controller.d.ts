import type { Request, Response } from 'express';
export declare const getPlans: (req: Request, res: Response) => Promise<void>;
export declare const purchasePlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const _default: {
    getPlans: (req: Request, res: Response) => Promise<void>;
    purchasePlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=credit.controller.d.ts.map