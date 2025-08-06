import mongoose, { Document, Schema } from "mongoose";

// Interface pour le document Mongoose (compatible avec INotification)
export interface INotificationDocument extends Document {
  userOid: string;
  title: string;
  message: string;
  read: boolean;
  source: string;
  timestamp: Date;
}

// Schéma de notification
const notificationSchema = new Schema<INotificationDocument>({
  userOid: {
    type: String,
    ref: "User",
    unique: true,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  source: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// Méthode statique pour trouver une notification par userOid
notificationSchema.statics["findByUserOid"] = function (userOid: string) {
  return this.find({ userOid });
};

// Méthode statique pour trouver une notification par source
notificationSchema.statics["findBySource"] = function (source: string) {
  return this.find({ source });
};

// Méthode d'instance pour marquer une notification comme lue
notificationSchema.methods["markAsRead"] = function () {
  this.read = true;
  return this.save();
};

export const Notification = mongoose.model<INotificationDocument>(
  "Notification",
  notificationSchema
);
