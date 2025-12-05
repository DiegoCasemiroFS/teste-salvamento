import { useState } from 'react';

interface InformaCPFProps {
  onCPFChange?: (cpf: string) => void;
}

export function InformaCPF({ onCPFChange }: InformaCPFProps) {
  const [cpf, setCpf] = useState("");
  const [mostrarCPF, setMostrarCPF] = useState(false);

  const handleCPFChange = (novoCpf: string) => {
    setCpf(novoCpf);
    if (onCPFChange) {
      onCPFChange(mostrarCPF ? novoCpf : "");
    }
  };

  const handleToggle = () => {
    const novoEstado = !mostrarCPF;
    setMostrarCPF(novoEstado);
    if (onCPFChange) {
      onCPFChange(novoEstado ? cpf : "");
    }
  };

  return (
    <>
      <div className="checkbox-cpf">
        <span>CPF:</span>
        <div
          className={`toggle-switch ${mostrarCPF ? 'active' : ''}`}
          onClick={handleToggle}
        >
          <div className="toggle-slider"></div>
        </div>
      </div>
      {mostrarCPF && (
        <label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => handleCPFChange(e.target.value)}
            placeholder="000.000.000-00"
          />
        </label>
      )}
    </>
  );
}