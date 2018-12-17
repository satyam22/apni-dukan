const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.SERVE_PORT || 5001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, ()=> console.log(`API server is running at port ${PORT}`));

