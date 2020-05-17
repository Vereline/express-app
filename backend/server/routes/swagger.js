import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

var router = express.Router();
 
router.use('/api-docs', serve);
router.get('/api-docs', setup(swaggerDocument));

module.exports = router;