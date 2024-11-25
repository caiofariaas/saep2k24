import React, { useState } from "react";
import Swal from 'sweetalert2';

export function CadastroUsuario(): JSX.Element {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getModalWidth = () => {
    const width = window.innerWidth;

    if (width <= 540) return '95%';
    if (width <= 680) return '90%';
    if (width <= 750) return '85%';
    if (width <= 865) return '75%';
    if (width <= 1300) return '40%';
    if (width <= 1500) return '30%';
    
    return '30%'; 
};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const usuario = { nome, email };
  
  try {
    const response = await fetch("http://localhost:8081/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    
    if (response.ok) {

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Usuário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 2000,
        width: getModalWidth(),
        customClass: {
            popup: 'custom-swal-popup', 
        },
        background: '#000',
        color: '#fff',
    });

    } 
    else {
      console.error("Erro ao cadastrar o usuário:", response.statusText);

      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao cadastrar o usuário.',
        showConfirmButton: false,
        timer: 2000,
        width: getModalWidth(),
        customClass: {
            popup: 'custom-swal-popup', 
        },
        background: '#000)',
        color: '#fff',
    });

    }
  } catch (error) {
    console.error("Erro de conexão:", error);
  }

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
