declare global {
  namespace Express {
    interface Request {
      metadata?: {
        requestId?: string;
        account?: {
          userId: string;
        }
      };
    }
  }
}

export {};
