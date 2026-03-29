const router = require('express').Router();
// Cart is managed on frontend (localStorage) for simplicity
router.get('/', (req, res) => res.json({ message: 'Cart is client-side' }));
module.exports = router;