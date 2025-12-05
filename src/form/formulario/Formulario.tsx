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
      </div>
    </div>
  );
}

export default Formulario;
