import mongoose, { Document } from "mongoose";
export interface IPromo extends Document {
    code: string;
    discountType: "percentage" | "flat";
    amount: number;
}
declare const _default: mongoose.Model<IPromo, {}, {}, {}, mongoose.Document<unknown, {}, IPromo, {}, {}> & IPromo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Promo.d.ts.map