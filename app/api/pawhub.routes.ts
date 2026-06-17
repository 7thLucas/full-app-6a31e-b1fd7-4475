import { Router } from "express";
import {
  ProductModel,
  PetModel,
  OrderModel,
  VetServiceModel,
  VetAppointmentModel,
  HotelRoomModel,
  HotelReservationModel,
  ChatSessionModel,
} from "./models/pawhub.models";
import { requireAuth, requireAdmin } from "~/modules/authentication/authentication.middleware";

const router = Router();

// ── Products ──────────────────────────────────────────────────────────────────
router.get("/pawhub/products", async (req, res) => {
  try {
    const { category, petType, brand, search, page = "1", limit = "12" } = req.query as Record<string, string>;
    const filter: Record<string, unknown> = { isActive: true };
    if (category) filter.category = category;
    if (petType) filter.petTypes = petType;
    if (brand) filter.brand = brand;
    if (search) filter.name = { $regex: search, $options: "i" };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [products, total] = await Promise.all([
      ProductModel.find(filter).skip(skip).limit(parseInt(limit)).lean(),
      ProductModel.countDocuments(filter),
    ]);
    res.json({ products, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (e) { res.status(500).json({ error: "Failed to fetch products" }); }
});

router.get("/pawhub/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ product });
  } catch (e) { res.status(500).json({ error: "Failed to fetch product" }); }
});

router.post("/pawhub/products", requireAdmin, async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({ product });
  } catch (e) { res.status(500).json({ error: "Failed to create product" }); }
});

router.put("/pawhub/products/:id", requireAdmin, async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ product });
  } catch (e) { res.status(500).json({ error: "Failed to update product" }); }
});

router.delete("/pawhub/products/:id", requireAdmin, async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Failed to delete product" }); }
});

// ── Pets ──────────────────────────────────────────────────────────────────────
router.get("/pawhub/pets", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const isAdmin = (req as any).user?.role === "admin";
    const filter = isAdmin ? {} : { ownerId: userId };
    const pets = await PetModel.find(filter).lean();
    res.json({ pets });
  } catch (e) { res.status(500).json({ error: "Failed to fetch pets" }); }
});

router.post("/pawhub/pets", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const pet = await PetModel.create({ ...req.body, ownerId: userId });
    res.status(201).json({ pet });
  } catch (e) { res.status(500).json({ error: "Failed to create pet" }); }
});

router.put("/pawhub/pets/:id", requireAuth, async (req, res) => {
  try {
    const pet = await PetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.json({ pet });
  } catch (e) { res.status(500).json({ error: "Failed to update pet" }); }
});

router.delete("/pawhub/pets/:id", requireAuth, async (req, res) => {
  try {
    await PetModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Failed to delete pet" }); }
});

// ── Orders ────────────────────────────────────────────────────────────────────
router.get("/pawhub/orders", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const isAdmin = (req as any).user?.role === "admin";
    const filter = isAdmin ? {} : { userId };
    const orders = await OrderModel.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ orders });
  } catch (e) { res.status(500).json({ error: "Failed to fetch orders" }); }
});

router.post("/pawhub/orders", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const order = await OrderModel.create({ ...req.body, userId });
    res.status(201).json({ order });
  } catch (e) { res.status(500).json({ error: "Failed to create order" }); }
});

router.put("/pawhub/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (e) { res.status(500).json({ error: "Failed to update order" }); }
});

// ── Vet Services ──────────────────────────────────────────────────────────────
router.get("/pawhub/vet-services", async (req, res) => {
  try {
    const services = await VetServiceModel.find({ isActive: true }).lean();
    res.json({ services });
  } catch (e) { res.status(500).json({ error: "Failed to fetch vet services" }); }
});

router.post("/pawhub/vet-services", requireAdmin, async (req, res) => {
  try {
    const service = await VetServiceModel.create(req.body);
    res.status(201).json({ service });
  } catch (e) { res.status(500).json({ error: "Failed to create vet service" }); }
});

router.put("/pawhub/vet-services/:id", requireAdmin, async (req, res) => {
  try {
    const service = await VetServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json({ service });
  } catch (e) { res.status(500).json({ error: "Failed to update vet service" }); }
});

router.delete("/pawhub/vet-services/:id", requireAdmin, async (req, res) => {
  try {
    await VetServiceModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Failed to delete vet service" }); }
});

// ── Vet Appointments ──────────────────────────────────────────────────────────
router.get("/pawhub/vet-appointments", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const isAdmin = (req as any).user?.role === "admin";
    const filter = isAdmin ? {} : { userId };
    const appointments = await VetAppointmentModel.find(filter).sort({ date: -1 }).lean();
    res.json({ appointments });
  } catch (e) { res.status(500).json({ error: "Failed to fetch appointments" }); }
});

router.post("/pawhub/vet-appointments", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const appt = await VetAppointmentModel.create({ ...req.body, userId });
    res.status(201).json({ appointment: appt });
  } catch (e) { res.status(500).json({ error: "Failed to create appointment" }); }
});

router.put("/pawhub/vet-appointments/:id", requireAuth, async (req, res) => {
  try {
    const appt = await VetAppointmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appt) return res.status(404).json({ error: "Appointment not found" });
    res.json({ appointment: appt });
  } catch (e) { res.status(500).json({ error: "Failed to update appointment" }); }
});

// ── Hotel Rooms ───────────────────────────────────────────────────────────────
router.get("/pawhub/hotel-rooms", async (req, res) => {
  try {
    const { petType } = req.query as Record<string, string>;
    const filter: Record<string, unknown> = {};
    if (petType) filter.petTypes = petType;
    const rooms = await HotelRoomModel.find(filter).lean();
    res.json({ rooms });
  } catch (e) { res.status(500).json({ error: "Failed to fetch hotel rooms" }); }
});

router.post("/pawhub/hotel-rooms", requireAdmin, async (req, res) => {
  try {
    const room = await HotelRoomModel.create(req.body);
    res.status(201).json({ room });
  } catch (e) { res.status(500).json({ error: "Failed to create hotel room" }); }
});

router.put("/pawhub/hotel-rooms/:id", requireAdmin, async (req, res) => {
  try {
    const room = await HotelRoomModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ room });
  } catch (e) { res.status(500).json({ error: "Failed to update hotel room" }); }
});

router.delete("/pawhub/hotel-rooms/:id", requireAdmin, async (req, res) => {
  try {
    await HotelRoomModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Failed to delete hotel room" }); }
});

// ── Hotel Reservations ────────────────────────────────────────────────────────
router.get("/pawhub/hotel-reservations", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const isAdmin = (req as any).user?.role === "admin";
    const filter = isAdmin ? {} : { userId };
    const reservations = await HotelReservationModel.find(filter).sort({ checkIn: -1 }).lean();
    res.json({ reservations });
  } catch (e) { res.status(500).json({ error: "Failed to fetch reservations" }); }
});

router.post("/pawhub/hotel-reservations", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const reservation = await HotelReservationModel.create({ ...req.body, userId });
    res.status(201).json({ reservation });
  } catch (e) { res.status(500).json({ error: "Failed to create reservation" }); }
});

router.put("/pawhub/hotel-reservations/:id", requireAuth, async (req, res) => {
  try {
    const reservation = await HotelReservationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ error: "Reservation not found" });
    res.json({ reservation });
  } catch (e) { res.status(500).json({ error: "Failed to update reservation" }); }
});

// ── Chat Sessions ─────────────────────────────────────────────────────────────
router.get("/pawhub/chat", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    let session = await ChatSessionModel.findOne({ userId, isActive: true }).lean();
    if (!session) {
      const created = await ChatSessionModel.create({ userId, messages: [], isActive: true });
      session = created.toObject();
    }
    res.json({ session });
  } catch (e) { res.status(500).json({ error: "Failed to fetch chat session" }); }
});

router.post("/pawhub/chat/message", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const { content } = req.body;
    let session = await ChatSessionModel.findOne({ userId, isActive: true });
    if (!session) {
      session = await ChatSessionModel.create({ userId, messages: [], isActive: true });
    }
    session.messages.push({ role: "user", content, timestamp: new Date().toISOString() } as any);
    await session.save();
    res.json({ success: true, messageAdded: true });
  } catch (e) { res.status(500).json({ error: "Failed to add message" }); }
});

router.post("/pawhub/chat/ai-response", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    const { content } = req.body;
    let session = await ChatSessionModel.findOne({ userId, isActive: true });
    if (!session) {
      session = await ChatSessionModel.create({ userId, messages: [], isActive: true });
    }
    session.messages.push({ role: "assistant", content, timestamp: new Date().toISOString() } as any);
    await session.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Failed to save AI response" }); }
});

router.delete("/pawhub/chat", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.sub;
    await ChatSessionModel.deleteMany({ userId });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Failed to clear chat" }); }
});

// ── Admin: Chat sessions list ──────────────────────────────────────────────────
router.get("/pawhub/admin/chat-sessions", requireAdmin, async (req, res) => {
  try {
    const sessions = await ChatSessionModel.find().sort({ updatedAt: -1 }).lean();
    res.json({ sessions });
  } catch (e) { res.status(500).json({ error: "Failed to fetch chat sessions" }); }
});

// ── Admin Dashboard Stats ─────────────────────────────────────────────────────
router.get("/pawhub/admin/stats", requireAdmin, async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalAppointments,
      totalReservations,
      pendingOrders,
      revenue,
    ] = await Promise.all([
      ProductModel.countDocuments({ isActive: true }),
      OrderModel.countDocuments(),
      VetAppointmentModel.countDocuments(),
      HotelReservationModel.countDocuments(),
      OrderModel.countDocuments({ status: "pending" }),
      OrderModel.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
    ]);
    res.json({
      totalProducts,
      totalOrders,
      totalAppointments,
      totalReservations,
      pendingOrders,
      totalRevenue: revenue[0]?.total ?? 0,
    });
  } catch (e) { res.status(500).json({ error: "Failed to fetch stats" }); }
});

// ── Seed: add this route file to auto-discovery ───────────────────────────────
export default router;
