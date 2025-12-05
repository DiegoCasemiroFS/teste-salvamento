import { useState } from "react";
import { InformaCPF } from "../informaCpf/InformaCPF";
import "./Formulario.style.css";

export function Formulario() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [dados, setDados] = useState<
    {
      nome: string;
      idade: string;
      cpf?: string;
    }[]
  >([]);

  const limparFormulario = () => {
    setNome("");
    setIdade("");
    setCpf("");
  };

  const downloadDados = () => {
    const todosDados = [...dados];
    if (nome.trim() && idade.trim()) {
      const dadoAtual = {
        nome,
        idade,
        ...(cpf.trim() && { cpf })
      };
      todosDados.push(dadoAtual);
    }

    const conteudo = todosDados
      .map(
        (d) =>
          `Nome: ${d.nome} | Idade: ${d.idade}${d.cpf ? ` | CPF: ${d.cpf}` : ""
          }`
      )
      .join("\n");

    const blob = new Blob([conteudo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dados.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !idade.trim()) return;

    const novoDado = {
      nome,
      idade,
      ...(cpf.trim() && { cpf })
    };
    setDados([...dados, novoDado]);
    limparFormulario();
  };

  return (
    <div className="formulario">
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit}>
        <div className="infos">
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
          <InformaCPF onCPFChange={setCpf} />
          <button type="submit">
            Salvar
          </button>
        </div>
      </form>
      <div>
        <h3>Dados Salvos:</h3>
        <ul>
          {dados.map((item, idx) => (
            <li key={idx}>
              Nome: {item.nome} | Idade: {item.idade}
              {item.cpf && ` | CPF: ${item.cpf}`}
            </li>
          ))}
        </ul>
        <div className="botoes-download">
          <button onClick={downloadDados}>
            Baixar dados em TXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
