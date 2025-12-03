import { useState } from "react";

function App() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [dados, setDados] = useState<Array<{ nome: string; idade: string }>>(
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && idade.trim()) {
      setDados([...dados, { nome, idade }]);
      setNome("");
      setIdade("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label>
            Idade:
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </label>
          <button type="submit">Salvar</button>
        </div>
      </form>
      <div>
        <h3>Dados Salvos:</h3>
        <ul>
          {dados.map((item, idx) => (
            <li key={idx}>
              Nome: {item.nome} // Idade: {item.idade}
            </li>
          ))}
        </ul>
        {dados.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                let todosDados = [...dados];
                if (nome.trim() && idade.trim()) {
                  todosDados.push({ nome, idade });
                }

                const corpo = todosDados
                  .map((d) => `Nome: ${d.nome} | Idade: ${d.idade}`)
                  .join("\n");
                const blob = new Blob([corpo], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "dados.txt";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              Baixar dados em TXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
