const express = require('express');
const router = express.Router();
const cache = require('./cache');

router.post('/put', (req, res) => {
  try {
    const { key, value } = req.body;
    
    if (!key || !value) {
      return res.status(400).json({
        status: "ERROR",
        message: "Key and value are required."
      });
    }
    
    if (typeof key !== 'string' || typeof value !== 'string') {
      return res.status(400).json({
        status: "ERROR",
        message: "Key and value must be strings."
      });
    }

    cache.put(key, value);
    
    return res.status(200).json({
      status: "OK",
      message: "Key inserted/updated successfully."
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
});

router.get('/get', (req, res) => {
  try {
    const { key } = req.query;
    
    if (!key) {
      return res.status(400).json({
        status: "ERROR",
        message: "Key parameter is required."
      });
    }

    const value = cache.get(key);
    
    if (value === null) {
      return res.status(404).json({
        status: "ERROR",
        message: "Key not found."
      });
    }
    
    return res.status(200).json({
      status: "OK",
      key: key,
      value: value
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
});

module.exports = router;
