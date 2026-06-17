import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";

// ── Pet Profile ──────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_pets", timestamps: true } })
export class PetClass {
  @prop({ required: true, type: () => String }) ownerId!: string;
  @prop({ required: true, type: () => String }) name!: string;
  @prop({ required: true, type: () => String }) species!: string;
  @prop({ type: () => String }) breed?: string;
  @prop({ type: () => Number }) age?: number;
  @prop({ type: () => Number }) weight?: number;
  @prop({ type: () => String }) gender?: string;
  @prop({ type: () => String }) photoUrl?: string;
  @prop({ type: () => [String], default: [] }) medicalNotes!: string[];
  @prop({ type: () => [String], default: [] }) vaccinations!: string[];
}
export const PetModel = getModelForClass(PetClass);

// ── Product ───────────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_products", timestamps: true } })
export class ProductClass {
  @prop({ required: true, type: () => String }) name!: string;
  @prop({ type: () => String }) description?: string;
  @prop({ required: true, type: () => Number }) price!: number;
  @prop({ default: 0, type: () => Number }) stock!: number;
  @prop({ type: () => String }) category?: string;
  @prop({ type: () => String }) brand?: string;
  @prop({ type: () => [String], default: [] }) petTypes!: string[];
  @prop({ type: () => String }) imageUrl?: string;
  @prop({ type: () => [String], default: [] }) images!: string[];
  @prop({ default: true, type: () => Boolean }) isActive!: boolean;
}
export const ProductModel = getModelForClass(ProductClass);

// ── Order ─────────────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_order_items", timestamps: false } })
export class OrderItemClass {
  @prop({ required: true, type: () => String }) productId!: string;
  @prop({ required: true, type: () => String }) name!: string;
  @prop({ required: true, type: () => Number }) price!: number;
  @prop({ required: true, type: () => Number }) quantity!: number;
  @prop({ type: () => String }) imageUrl?: string;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_orders", timestamps: true } })
export class OrderClass {
  @prop({ required: true, type: () => String }) userId!: string;
  @prop({ type: () => [OrderItemClass], default: [] }) items!: OrderItemClass[];
  @prop({ required: true, type: () => Number }) total!: number;
  @prop({ default: "pending", type: () => String }) status!: string;
  @prop({ type: () => String }) shippingAddress?: string;
  @prop({ type: () => String }) notes?: string;
}
export const OrderModel = getModelForClass(OrderClass);

// ── Vet Service ───────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_vet_services", timestamps: true } })
export class VetServiceClass {
  @prop({ required: true, type: () => String }) name!: string;
  @prop({ type: () => String }) description?: string;
  @prop({ required: true, type: () => Number }) price!: number;
  @prop({ type: () => Number }) durationMinutes?: number;
  @prop({ type: () => String }) vetName?: string;
  @prop({ type: () => String }) vetPhotoUrl?: string;
  @prop({ type: () => [String], default: [] }) availableDays!: string[];
  @prop({ type: () => String }) startTime?: string;
  @prop({ type: () => String }) endTime?: string;
  @prop({ default: true, type: () => Boolean }) isActive!: boolean;
}
export const VetServiceModel = getModelForClass(VetServiceClass);

// ── Vet Appointment ───────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_vet_appointments", timestamps: true } })
export class VetAppointmentClass {
  @prop({ required: true, type: () => String }) userId!: string;
  @prop({ required: true, type: () => String }) petId!: string;
  @prop({ required: true, type: () => String }) serviceId!: string;
  @prop({ required: true, type: () => String }) date!: string;
  @prop({ required: true, type: () => String }) time!: string;
  @prop({ default: "pending", type: () => String }) status!: string;
  @prop({ type: () => String }) notes?: string;
  @prop({ type: () => String }) petName?: string;
  @prop({ type: () => String }) serviceName?: string;
  @prop({ type: () => String }) vetName?: string;
}
export const VetAppointmentModel = getModelForClass(VetAppointmentClass);

// ── Hotel Room ────────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_hotel_rooms", timestamps: true } })
export class HotelRoomClass {
  @prop({ required: true, type: () => String }) name!: string;
  @prop({ type: () => String }) description?: string;
  @prop({ required: true, type: () => Number }) pricePerNight!: number;
  @prop({ default: "Standard", type: () => String }) type!: string;
  @prop({ type: () => [String], default: [] }) petTypes!: string[];
  @prop({ default: true, type: () => Boolean }) isAvailable!: boolean;
  @prop({ type: () => String }) imageUrl?: string;
  @prop({ type: () => [String], default: [] }) amenities!: string[];
  @prop({ default: 1, type: () => Number }) capacity!: number;
}
export const HotelRoomModel = getModelForClass(HotelRoomClass);

// ── Hotel Reservation ─────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_hotel_reservations", timestamps: true } })
export class HotelReservationClass {
  @prop({ required: true, type: () => String }) userId!: string;
  @prop({ required: true, type: () => String }) petId!: string;
  @prop({ required: true, type: () => String }) roomId!: string;
  @prop({ required: true, type: () => String }) checkIn!: string;
  @prop({ required: true, type: () => String }) checkOut!: string;
  @prop({ required: true, type: () => Number }) totalPrice!: number;
  @prop({ default: "pending", type: () => String }) status!: string;
  @prop({ type: () => String }) notes?: string;
  @prop({ type: () => String }) petName?: string;
  @prop({ type: () => String }) roomName?: string;
}
export const HotelReservationModel = getModelForClass(HotelReservationClass);

// ── Chat Message ──────────────────────────────────────────────────────────────
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_chat_messages", timestamps: false } })
export class ChatMessageClass {
  @prop({ required: true, type: () => String }) role!: string;
  @prop({ required: true, type: () => String }) content!: string;
  @prop({ default: () => new Date().toISOString(), type: () => String }) timestamp!: string;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { collection: "tbl_chat_sessions", timestamps: true } })
export class ChatSessionClass {
  @prop({ required: true, type: () => String }) userId!: string;
  @prop({ type: () => [ChatMessageClass], default: [] }) messages!: ChatMessageClass[];
  @prop({ default: true, type: () => Boolean }) isActive!: boolean;
}
export const ChatSessionModel = getModelForClass(ChatSessionClass);
