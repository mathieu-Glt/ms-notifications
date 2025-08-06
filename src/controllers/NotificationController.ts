import { Request, Response } from "express";
import container from "../config/container";
import { NotificationService } from "../services/NotificationSercice";

export class NotificationController {
  private static notificationService: NotificationService =
    container.getNotificationService();

  public static async createNotification(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const notification = req.body;
      const result = await this.notificationService.createNotification(
        notification
      );

      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          notification: result.notification,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message,
          error: result.error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create notification",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async getNotificationsByUserOid(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid } = req.params;
      const result = await this.notificationService.getNotificationsByUserOid(
        userOid
      );

      if (result.success) {
        res.status(200).json({
          success: true,
          notifications: result.notifications,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
          notifications: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get notifications by userOid",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.notificationService.markAsRead(id);

      if (result.success) {
        res.status(200).json({
          success: true,
          notification: result.notification,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to mark notification as read",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async markAllAsRead(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid } = req.params;
      const result = await this.notificationService.markAllAsRead(userOid);

      if (result.success) {
        res.status(200).json({
          success: true,
          count: result.count,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
          count: 0,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to mark all notifications as read",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async getUnreadCount(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid } = req.params;
      const result = await this.notificationService.getUnreadCount(userOid);

      if (result.success) {
        res.status(200).json({
          success: true,
          count: result.count,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
          count: 0,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get unread count",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // === MÉTHODES SPÉCIALISÉES POUR LES ÉVÉNEMENTS MÉTIER ===

  public static async notifyLoginSuccess(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid, displayName } = req.body;
      const result = await this.notificationService.notifyLoginSuccess(
        userOid,
        displayName
      );

      if (result.success) {
        res.status(201).json({
          success: true,
          notification: result.notification,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to notify login success",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async notifyLoginFailed(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid, reason } = req.body;
      const result = await this.notificationService.notifyLoginFailed(
        userOid,
        reason
      );

      if (result.success) {
        res.status(201).json({
          success: true,
          notification: result.notification,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to notify login failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async notifyPaymentSuccess(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid, amount, description } = req.body;
      const result = await this.notificationService.notifyPaymentSuccess(
        userOid,
        amount,
        description
      );

      if (result.success) {
        res.status(201).json({
          success: true,
          notification: result.notification,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to notify payment success",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public static async notifyPaymentFailed(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userOid, reason } = req.body;
      const result = await this.notificationService.notifyPaymentFailed(
        userOid,
        reason
      );

      if (result.success) {
        res.status(201).json({
          success: true,
          notification: result.notification,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to notify payment failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
