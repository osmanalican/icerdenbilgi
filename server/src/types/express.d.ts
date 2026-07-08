export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string | null;
        name: string | null;
        picture: string | null;
      };
    }
  }
}
