import React from "react";

function Contact() {
  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-800 rounded-md">
      <h1 className="text-3xl font-bold mb-6">Contactez-nous</h1>
      <form className="space-y-4">
        <input
          className="w-full p-2 rounded"
          type="text"
          placeholder="Votre nom"
        />
        <input
          className="w-full p-2 rounded"
          type="email"
          placeholder="Votre email"
        />
        <textarea
          className="w-full p-2 rounded"
          placeholder="Votre message"
          rows="4"
        ></textarea>
        <button className="bg-yellow-500 w-full p-2 rounded hover:bg-yellow-400">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Contact;
