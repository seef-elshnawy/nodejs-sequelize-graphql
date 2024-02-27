import express, { NextFunction, Request, Response } from "express";

export const app = express();
app.use(express.json());
