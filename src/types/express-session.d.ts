import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: { [key: string]: any }; // Define la estructura que necesitas
  }
}
