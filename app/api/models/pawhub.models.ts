import { prop, getModelForClass, modelOptions, Severity, Ref } from "@typegoose/typegoose";

// ── Pet Profile ──────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_pets", timestamps: true } })
export class PetClass {
  @prop({ required: true }) ownerId!: string;
  @prop({ required: true }) name!: string;
  @prop({ required: true }) species!: string; // Dog, Cat, Bird, etc.
  @prop() breed?: string;
  @prop() age?: number;
  @prop() weight?: number;
  @prop() gender?: string;
  @prop() photoUrl?: string;
  @prop({ type: () => [String], default: [] }) medicalNotes!: string[];
  @prop({ type: () => [String], default: [] }) vaccinations!: string[];
}
export const PetModel = getModelForClass(PetClass);

// ── Product ───────────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_products", timestamps: true } })
export class ProductClass {
  @prop({ required: true }) name!: string;
  @prop() description?: string;
  @prop({ required: true }) price!: number;
  @prop({ default: 0 }) stock!: number;
  @prop() category?: string;
  @prop() brand?: string;
  @prop({ type: () => [String], default: [] }) petTypes!: string[];
  @prop() imageUrl?: string;
  @prop({ type: () => [String], default: [] }) images!: string[];
  @prop({ default: true }) isActive!: boolean;
}
export const ProductModel = getModelForClass(ProductClass);

// ── Order ─────────────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_orders", timestamps: true } })
export class OrderItemClass {
  @prop({ required: true }) productId!: string;
  @prop({ required: true }) name!: string;
  @prop({ required: true }) price!: number;
  @prop({ required: true }) quantity!: number;
  @prop() imageUrl?: string;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_orders", timestamps: true } })
export class OrderClass {
  @prop({ required: true }) userId!: string;
  @prop({ type: () => [OrderItemClass], default: [] }) items!: OrderItemClass[];
  @prop({ required: true }) total!: number;
  @prop({ default: "pending" }) status!: string; // pending, paid, shipped, delivered, cancelled
  @prop() shippingAddress?: string;
  @prop() notes?: string;
}
export const OrderModel = getModelForClass(OrderClass);

// ── Vet Service ───────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_vet_services", timestamps: true } })
export class VetServiceClass {
  @prop({ required: true }) name!: string;
  @prop() description?: string;
  @prop({ required: true }) price!: number;
  @prop() durationMinutes?: number;
  @prop() vetName?: string;
  @prop() vetPhotoUrl?: string;
  @prop({ type: () => [String], default: [] }) availableDays!: string[];
  @prop() startTime?: string; // "08:00"
  @prop() endTime?: string;   // "17:00"
  @prop({ default: true }) isActive!: boolean;
}
export const VetServiceModel = getModelForClass(VetServiceClass);

// ── Vet Appointment ───────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_vet_appointments", timestamps: true } })
export class VetAppointmentClass {
  @prop({ required: true }) userId!: string;
  @prop({ required: true }) petId!: string;
  @prop({ required: true }) serviceId!: string;
  @prop({ required: true }) date!: string; // ISO date string
  @prop({ required: true }) time!: string; // "HH:MM"
  @prop({ default: "pending" }) status!: string; // pending, confirmed, completed, cancelled
  @prop() notes?: string;
  @prop() petName?: string;
  @prop() serviceName?: string;
  @prop() vetName?: string;
}
export const VetAppointmentModel = getModelForClass(VetAppointmentClass);

// ── Hotel Room ────────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_hotel_rooms", timestamps: true } })
export class HotelRoomClass {
  @prop({ required: true }) name!: string;
  @prop() description?: string;
  @prop({ required: true }) pricePerNight!: number;
  @prop({ default: "Standard" }) type!: string; // Standard, Deluxe, Suite
  @prop({ type: () => [String], default: [] }) petTypes!: string[];
  @prop({ default: true }) isAvailable!: boolean;
  @prop() imageUrl?: string;
  @prop({ type: () => [String], default: [] }) amenities!: string[];
  @prop({ default: 1 }) capacity!: number;
}
export const HotelRoomModel = getModelForClass(HotelRoomClass);

// ── Hotel Reservation ─────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_hotel_reservations", timestamps: true } })
export class HotelReservationClass {
  @prop({ required: true }) userId!: string;
  @prop({ required: true }) petId!: string;
  @prop({ required: true }) roomId!: string;
  @prop({ required: true }) checkIn!: string;
  @prop({ required: true }) checkOut!: string;
  @prop({ required: true }) totalPrice!: number;
  @prop({ default: "pending" }) status!: string;
  @prop() notes?: string;
  @prop() petName?: string;
  @prop() roomName?: string;
}
export const HotelReservationModel = getModelForClass(HotelReservationClass);

// ── Chat Message ──────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_chat_sessions", timestamps: true } })
export class ChatMessageClass {
  @prop({ required: true }) role!: string; // user | assistant
  @prop({ required: true }) content!: string;
  @prop({ default: () => new Date().toISOString() }) timestamp!: string;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_chat_sessions", timestamps: true } })
export class ChatSessionClass {
  @prop({ required: true }) userId!: string;
  @prop({ type: () => [ChatMessageClass], default: [] }) messages!: ChatMessageClass[];
  @prop({ default: true }) isActive!: boolean;
}
export const ChatSessionModel = getModelForClass(ChatSessionClass);
