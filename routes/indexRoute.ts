import { Router } from 'express';

import * as controller from '../controllers/Index';

const router = Router();

router.get('/', controller.getIndexPage);
router.get('/transfer-video', controller.getVideoTransferPage);
router.get('/transfer-audio', controller.getAudioTransferPage);

export default router;
