import React, { useState } from "react";

export function CadastroUsuario(): JSX.Element {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Nome:", nome);
    console.log("Email:", email);
    // Adicione aqui a lógica para enviar os dados ao backend ou processá-los
    
    

    setNome("");
    setEmail("");
    setIsModalOpen(false); 
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Cadastrar Usuário</button>

      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label htmlFor="nome">Nome:</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div style={formGroupStyle}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
