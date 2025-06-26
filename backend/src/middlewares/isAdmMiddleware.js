const isAdmMiddleware = (req, res, next) => {
    // Verifica se o usuário autenticado é administrador
    if (!req.user || req.user.is_adm !== true) {
      return res.status(403).json({ error: "Acesso negado: você precisa de permissão de administrador" });
    }
    next();
  };
  
  module.exports = isAdmMiddleware;
  