import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }) => {
  try {
    // Configuration du transporteur d'emails avec Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail", // Utiliser Gmail pour envoyer les emails (ou un autre service si tu le souhaites)
      auth: {
        user: process.env.EMAIL_USER, // L'adresse email qui envoie le message
        pass: process.env.EMAIL_PASS, // Le mot de passe ou un mot de passe d'application (pour Gmail, génère-le dans les paramètres de sécurité)
      },
    });

    // Options de l'email (destinataire, sujet, contenu)
    const mailOptions = {
      from: process.env.EMAIL_USER, // L'expéditeur (ton email)
      to, // Le destinataire (l'email de l'utilisateur)
      subject, // Le sujet de l'email
      text, // Le contenu de l'email
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès :", info.response);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
};

export default sendEmail;
