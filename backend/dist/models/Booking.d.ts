import mongoose, { Document } from "mongoose";
export interface IBooking extends Document {
    experienceId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    slotDate: string;
    slotTime: string;
    totalPrice: number;
    status: "confirmed" | "failed";
}
declare const _default: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map