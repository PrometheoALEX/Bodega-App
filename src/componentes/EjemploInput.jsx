import { useState } from "react";

function EjemploInput() {
  const [texto, setTexto] = useState("");

  return (
    <div>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <p>Escribiste: {texto}</p>
    </div>
  );
}

export default EjemploInput;
