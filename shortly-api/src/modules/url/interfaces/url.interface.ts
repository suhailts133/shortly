import mongoose from 'mongoose';

export interface IUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortId: string;
  createdAt: Date;
  userId: mongoose.Types.ObjectId;
}
