import React, { useState } from "react";

export function CadastroTarefa(): JSX.Element {
  const [descricao, setDescricao] = useState<string>("");
  const [setor, setSetor] = useState<string>("");
  const [prioridade, setPrioridade] = useState<string>("BAIXA");
  const [usuarioEmail, setUsuarioEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const novaTarefa = {
      descricao,
      setor,
      prioridade,
      usuarioEmail,
    };
    console.log("Tarefa cadastrada:", novaTarefa);
    // Adicione aqui a lógica para enviar os dados ao backend ou processá-los



    // Limpa os campos do formulário e fecha o modal
    setDescricao("");
    setSetor("");
    setPrioridade("BAIXA");
    setUsuarioEmail("");
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Cadastrar Tarefa</button>

      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Cadastro de Tarefa</h2>
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label htmlFor="descricao">Descrição:</label>
                <input
                  id="descricao"
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>
              <div style={formGroupStyle}>
                <label htmlFor="setor">Setor:</label>
                <input
                  id="setor"
                  type="text"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  required
                />
              </div>
              <div style={formGroupStyle}>
                <label htmlFor="prioridade">Prioridade:</label>
                <select
                  id="prioridade"
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value)}
                  required
                >
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                </select>
              </div>
              <div style={formGroupStyle}>
                <label htmlFor="usuarioEmail">Usuário (Email):</label>
                <input
                  id="usuarioEmail"
                  type="email"
                  value={usuarioEmail}
                  onChange={(e) => setUsuarioEmail(e.target.value)}
                  required
                />
              </div>
              <div style={buttonGroupStyle}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Estilos básicos para o modal e formulário
const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#000",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: "15px",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};
