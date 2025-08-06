//import { UserRepository } from "../repositories/UserRepository";
//import { AuthService } from "../services/AuthService";

import { NotificationService } from "../services/NotificationSercice";
import { NotificationRepository } from "../repositories";

export interface IContainer {
  getNotificationRepository(): NotificationRepository;
  getNotificationService(): NotificationService;
}

export class Container implements IContainer {
  private static instance: Container;
  private notificationRepository: NotificationRepository | null = null;
  private notificationService: NotificationService | null = null;

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getNotificationRepository(): NotificationRepository {
    if (!this.notificationRepository) {
      this.notificationRepository = new NotificationRepository();
    }
    return this.notificationRepository;
  }

  public getNotificationService(): NotificationService {
    if (!this.notificationService) {
      this.notificationService = new NotificationService(
        this.getNotificationRepository()
      );
    }
    return this.notificationService;
  }
}

export default Container.getInstance();
