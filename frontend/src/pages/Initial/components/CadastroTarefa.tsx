import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Tarefa, Usuario } from "./ListaTarefas";


interface CadastroTarefaProps {
  atualizarListaDeTarefas: (novaTarefa: Tarefa) => void;
}

export function CadastroTarefa({ atualizarListaDeTarefas }: CadastroTarefaProps): JSX.Element {
  const [descricao, setDescricao] = useState<string>("");
  const [setor, setSetor] = useState<string>("");
  const [prioridade, setPrioridade] = useState<string>("BAIXA");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>(""); 
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
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

  useEffect(() => {
    if (isModalOpen) {
      fetchUsuarios();
    }
  }, [isModalOpen]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8081/usuario");
      const data = await response.json();

      setUsuarios(data); 

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const novaTarefa = {
      descricao,
      setor,
      prioridade,
      usuarioEmail: usuarioSelecionado,
    };
    console.log("Tarefa cadastrada:", novaTarefa);

    try {
      const response = await fetch("http://localhost:8081/tarefa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTarefa),
      });
  
      if (response.ok) {

        const tarefaCadastrada = await response.json();

        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Tarefa cadastrada com sucesso!',
          showConfirmButton: false,
          timer: 2000,
          width: getModalWidth(),
          customClass: {
              popup: 'custom-swal-popup', 
          },
          background: '#000',
          color: '#fff',
      });

      atualizarListaDeTarefas(tarefaCadastrada);

    } 
    else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao cadastrar a tarefa.',
        showConfirmButton: false,
        timer: 2000,
        width: getModalWidth(),
        customClass: {
            popup: 'custom-swal-popup', 
        },
        background: '#000',
        color: '#fff',
    });      }
    } 
    catch (error) {
      console.error("Erro de conexão:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao cadastrar a tarefa.',
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


    // Limpa os campos do formulário e fecha o modal
    setDescricao("");
    setSetor("");
    setPrioridade("BAIXA");
    setUsuarioSelecionado("");
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
                <label htmlFor="usuario">Usuário:</label>
                <select
                  id="usuario"
                  value={usuarioSelecionado}
                  onChange={(e) => setUsuarioSelecionado(e.target.value)}
                  required
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.email}>
                      {usuario.nome} ({usuario.email})
                    </option>
                  ))}
                </select>
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
