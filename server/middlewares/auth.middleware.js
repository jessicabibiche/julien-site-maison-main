import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Retourner une réponse 401 Unauthorized si aucun token n'est fourni
    return res.status(401).json({ message: "Pas de token fourni !" });
  }

  const token = authHeader.split(" ")[1]; // Récupération du token

  try {
    // Vérification et décodage du token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Récupération de l'userId à partir du token décodé
    req.user = { userId: decodedToken.userId }; // Correction ici : utilisation de decodedToken

    next(); // Poursuivre si l'utilisateur est authentifié
  } catch (error) {
    // Retourner une réponse 403 Forbidden si la vérification du token échoue
    return res.status(403).json({ message: "Accès non autorisé !" });
  }
};

export default authenticateUser;
