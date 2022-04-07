namespace NodeJS {
  interface ProcessEnv {
    JWT_ACCESS_KEY: string;
    PORT: string;
    DATABASE: any;
  }
}

declare namespace Express {
  export interface Request {
    user: any;
  }
}
