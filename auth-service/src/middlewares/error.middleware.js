const errorHandler = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
    code: err.code,
    path: req.path,
    method: req.method,
    body: req.body,
    headers: req.headers
  });
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).json({ error: 'Email já está em uso' });
  }
  
  res.status(500).json({ error: 'Erro interno do servidor' });
};

module.exports = errorHandler;
  