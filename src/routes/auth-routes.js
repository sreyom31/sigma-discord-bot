const { Router } = require('express');
const { handleGetAccessToken, handleGetUserInfo } = require("../api/auth/auth-controller")

const router = Router()

router.get('/token', handleGetAccessToken)
router.get('/get-user', handleGetUserInfo)

module.exports = router