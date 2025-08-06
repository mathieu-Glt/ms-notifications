import { Notification, INotificationDocument } from "../models";
import { INotification, NotificationType } from "../interfaces";

export interface INotificationRepository {
  create(notification: INotification): Promise<INotification>;
  findByUserOid(userOid: string): Promise<INotification[]>;
  findBySource(source: string): Promise<INotification[]>;
  markAsRead(notificationId: string): Promise<INotification>;
  delete(notificationId: string): Promise<INotification>;
}

export class NotificationRepository implements INotificationRepository {
  // Fonction utilitaire pour convertir INotificationDocument en INotification
  private convertToINotification(
    notificationDoc: INotificationDocument
  ): INotification {
    return {
      userOid: notificationDoc.userOid,
      title: notificationDoc.title,
      message: notificationDoc.message,
      read: notificationDoc.read,
      source: notificationDoc.source,
      timestamp: notificationDoc.timestamp,
    };
  }

  async create(notification: INotification): Promise<INotification> {
    const newNotification = new Notification(notification);
    const savedNotification = await newNotification.save();
    return this.convertToINotification(savedNotification);
  }

  async findBySource(source: string): Promise<INotification[]> {
    const notifications = await Notification.find({ source });
    return notifications.map((doc) => this.convertToINotification(doc));
  }

  async markAsRead(notificationId: string): Promise<INotification> {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true }, // Corrigé: 'read' au lieu de 'isRead'
      { new: true }
    );

    if (!updatedNotification) {
      throw new Error("Notification not found");
    }

    return this.convertToINotification(updatedNotification);
  }

  async findByUserOid(userOid: string): Promise<INotification[]> {
    const notifications = await Notification.find({ userOid });
    return notifications.map((doc) => this.convertToINotification(doc));
  }

  async delete(notificationId: string): Promise<INotification> {
    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      throw new Error("Notification not found");
    }

    return this.convertToINotification(deletedNotification);
  }
}
