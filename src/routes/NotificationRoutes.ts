import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const router = Router();

// === ROUTES DE BASE ===
router.post("/", NotificationController.createNotification);
router.get("/user/:userOid", NotificationController.getNotificationsByUserOid);
router.put("/:id/read", NotificationController.markAsRead);
router.put("/user/:userOid/read-all", NotificationController.markAllAsRead);
router.get(
  "/user/:userOid/unread-count",
  NotificationController.getUnreadCount
);

// === ROUTES SPÉCIALISÉES POUR LES ÉVÉNEMENTS MÉTIER ===
router.post("/login-success", NotificationController.notifyLoginSuccess);
router.post("/login-failed", NotificationController.notifyLoginFailed);
router.post("/payment-success", NotificationController.notifyPaymentSuccess);
router.post("/payment-failed", NotificationController.notifyPaymentFailed);

export default router;
