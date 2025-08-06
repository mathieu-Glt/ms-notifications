import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";

export interface IContainer {
  getUserRepository(): UserRepository;
  getAuthService(): AuthService;
}

export class Container implements IContainer {
  private static instance: Container;
  private userRepository: UserRepository | null = null;
  private authService: AuthService | null = null;

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository();
    }
    return this.userRepository;
  }

  public getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService(this.getUserRepository());
    }
    return this.authService;
  }
}

export default Container.getInstance();
