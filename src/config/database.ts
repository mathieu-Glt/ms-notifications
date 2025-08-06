import mongoose from "mongoose";

export class Database {
  private static instance: Database;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log("🔗 [AUTH] Already connected to database");
      return;
    }

    try {
      const mongoUri =
        process.env["MONGODB_URI"] ||
        "mongodb+srv://new-mat-e2shop:IJq6I9TyZMo0OEPq@cluster0.kz7jamo.mongodb.net/notification_db";

      await mongoose.connect(mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      this.isConnected = true;
      console.log("🔗 [AUTH] Connected to MongoDB");
      console.log("📊 [AUTH] Database URI:", mongoUri);
    } catch (error) {
      console.error("❌ [AUTH] Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log("🔗 [AUTH] Already disconnected from database");
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("🔗 [AUTH] Disconnected from MongoDB");
    } catch (error) {
      console.error("❌ [AUTH] Failed to disconnect from MongoDB:", error);
      throw error;
    }
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  public getConnectionState(): string {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    return (
      states[mongoose.connection.readyState as keyof typeof states] || "unknown"
    );
  }
}

export default Database.getInstance();

import mongoose from "mongoose";

export class Database {
  private static instance: Database;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log("🔗 [AUTH] Already connected to database");
      return;
    }

    try {
      const mongoUri =
        process.env["MONGODB_URI"] ||
        "mongodb+srv://new-mat-e2shop:IJq6I9TyZMo0OEPq@cluster0.kz7jamo.mongodb.net/auth_db";

      await mongoose.connect(mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      this.isConnected = true;
      console.log("🔗 [AUTH] Connected to MongoDB");
      console.log("📊 [AUTH] Database URI:", mongoUri);
    } catch (error) {
      console.error("❌ [AUTH] Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log("🔗 [AUTH] Already disconnected from database");
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("🔗 [AUTH] Disconnected from MongoDB");
    } catch (error) {
      console.error("❌ [AUTH] Failed to disconnect from MongoDB:", error);
      throw error;
    }
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  public getConnectionState(): string {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    return (
      states[mongoose.connection.readyState as keyof typeof states] || "unknown"
    );
  }
}

export default Database.getInstance();
