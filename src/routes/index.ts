import { Router } from "express";

const router = Router();
const cmsRouter = Router();

// Placeholder for future CMS routes. Downstream tasks will populate this router.
router.use("/cms", cmsRouter);

export { router as apiRouter, cmsRouter };
