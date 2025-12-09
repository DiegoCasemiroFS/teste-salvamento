import { useFormik } from 'formik';
import { useState } from 'react';

interface InformaCPFProps {
  onCPFChange?: (cpf: string) => void;
}

export function InformaCPF({ onCPFChange }: InformaCPFProps) {
  const [mostrarCPF, setMostrarCPF] = useState(false);

  const formik = useFormik({
    initialValues: {
      cpf: ''
    },
    onSubmit: () => {}
  });

  const handleCPFChange = (novoCpf: string) => {
    formik.setFieldValue('cpf', novoCpf);
    if (onCPFChange) {
      onCPFChange(mostrarCPF ? novoCpf : "");
    }
  };

  const handleToggle = () => {
    const novoEstado = !mostrarCPF;
    setMostrarCPF(novoEstado);
    if (onCPFChange) {
      onCPFChange(novoEstado ? formik.values.cpf : "");
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
            value={formik.values.cpf}
            onChange={(e) => handleCPFChange(e.target.value)}
            placeholder="000.000.000-00"
          />
        </label>
      )}
    </>
  );
}