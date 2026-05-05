import { Router } from "express";

import { healthCheck } from "../controllers/healthcheck.controller.js";

const router = Router();

router.route("/").get(healthCheck);

// router.route("/instagram").get(healthcheck);
export default router;
