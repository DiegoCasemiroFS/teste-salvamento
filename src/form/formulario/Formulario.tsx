import { useFormik } from "formik";
import { useState } from "react";
import { InformaCPF } from "../informaCpf/InformaCPF";
import "./Formulario.style.css";

export function Formulario() {
  const [dados, setDados] = useState<
    {
      nome: string;
      idade: string;
      cpf?: string;
    }[]
  >([]);

  const formik = useFormik({
    initialValues: {
      nome: "",
      idade: "",
      cpf: ""
    },
    onSubmit: (values, { resetForm }) => {
      if (!values.nome.trim() || !values.idade) return;

      const novoDado = {
        nome: values.nome,
        idade: values.idade,
        ...(values.cpf.trim() && { cpf: values.cpf })
      };
      setDados([...dados, novoDado]);
      resetForm();
    }
  });

  const handleCPFChange = (cpf: string) => {
    formik.setFieldValue('cpf', cpf);
  };

  return (
    <div className="formulario">
      <h2>Formulário</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="infos">
          <label>
            Nome:
            <input
              type="text"
              value={formik.values.nome}
              onChange={formik.handleChange}
              name="nome"
            />
          </label>
          <label>
            Idade:
            <input
              type="number"
              value={formik.values.idade}
              onChange={formik.handleChange}
              name="idade"
            />
          </label>
          <InformaCPF onCPFChange={handleCPFChange} />
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
