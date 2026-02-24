import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body)
      req.body = validated
      next()
    } catch (error: any) {
      const formattedErrors = error.errors?.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })) || []

      res.status(400).json({
        error: 'Validation error',
        details: formattedErrors,
      })
    }
  }
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.query)
      req.query = validated as any
      next()
    } catch (error: any) {
      const formattedErrors = error.errors?.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })) || []

      res.status(400).json({
        error: 'Validation error',
        details: formattedErrors,
      })
    }
  }
}
