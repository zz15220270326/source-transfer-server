import { Router } from 'express';

import * as controller from '../controllers/Index';

const router = Router();

router.get('/', controller.getIndexPage);
router.get('/transfer-video', controller.getVideoTransferPage);

export default router;
