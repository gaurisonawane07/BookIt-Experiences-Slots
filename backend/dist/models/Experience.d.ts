import mongoose, { Document } from "mongoose";
export interface ISlot {
    date: string;
    time: string;
    isBooked: boolean;
}
export interface IExperience extends Document {
    title: string;
    location: string;
    description: string;
    imageUrl: string;
    price: number;
    slots: ISlot[];
}
declare const _default: mongoose.Model<IExperience, {}, {}, {}, mongoose.Document<unknown, {}, IExperience, {}, {}> & IExperience & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Experience.d.ts.map