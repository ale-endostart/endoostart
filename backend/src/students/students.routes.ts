import { Request, Response } from "express";

type AuthRequest = Request & {
  user?: any;
};