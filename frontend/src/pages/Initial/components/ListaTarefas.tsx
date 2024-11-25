import React, { useState, useEffect } from "react";
import { CadastroTarefa } from "./CadastroTarefa";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface Tarefa {
  id: number;
  descricao: string;
  setor: string;
  prioridade: string;
  status: "A_FAZER" | "FAZENDO" | "PRONTO";
  usuario: Usuario;
}

export function ListaTarefas(): JSX.Element {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(null); // Para exclusão
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null); // Para edição
  const [descricao, setDescricao] = useState<string>("");
  const [setor, setSetor] = useState<string>("");
  const [prioridade, setPrioridade] = useState<string>("BAIXA");
  const [status, setStatus] = useState<"A_FAZER" | "FAZENDO" | "PRONTO">("A_FAZER");

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>(""); 
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await fetch("http://localhost:8081/tarefa");
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

    const atualizarListaDeTarefas = (novaTarefa: Tarefa) => {
        setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
      };
    

  const handleDelete = async () => {
    if (tarefaParaExcluir) {
      try {
        const response = await fetch(`http://localhost:8081/tarefa/${tarefaParaExcluir.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Tarefa excluída com sucesso!");
          setTarefas(tarefas.filter((tarefa) => tarefa.id !== tarefaParaExcluir.id));
        } else {
          console.error("Erro ao excluir tarefa:", response.statusText);
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setTarefaParaExcluir(null); 
      }
    }
  };

  const handleEdit = (tarefa: Tarefa) => {
    setIsModalOpen(true)

    setTarefaEditando(tarefa);

    setDescricao(tarefa.descricao);
    setSetor(tarefa.setor);
    setPrioridade(tarefa.prioridade);
    setStatus(tarefa.status);
    setUsuarioSelecionado(tarefa.usuario.email)
  };

  const handleSaveEdit = async () => {
    if (tarefaEditando) {
      const usuarioSelecionadoObj = usuarios.find(usuario => usuario.email === usuarioSelecionado);
  
      if (usuarioSelecionadoObj) {
        const tarefaAtualizada = {
          ...tarefaEditando,
          descricao,
          setor,
          prioridade,
          status,
          usuarioEmail: usuarioSelecionadoObj.email 
        };
        
        try {
          const response = await fetch(`http://localhost:8081/tarefa/${tarefaEditando.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefaAtualizada),
          });
  
          if (response.ok) {
            console.log("Tarefa atualizada com sucesso!");
            console.log(response.statusText)
            setTarefas((prevTarefas) =>
                prevTarefas.map((tarefa) =>
                  tarefa.id === tarefaEditando.id ? { ...tarefa, ...tarefaAtualizada, usuario: usuarioSelecionadoObj } : tarefa
                )
              );
            setTarefaEditando(null);
          } else {
            console.error("Erro ao atualizar tarefa:", response.statusText);
          }
        } catch (error) {
          console.error("Erro de conexão:", error);
        }
      } else {
        console.error("Usuário não encontrado!");
      }
    }
  };
  

  const renderColuna = (status: "A_FAZER" | "FAZENDO" | "PRONTO") => (
    <div style={colunaStyle}>
      <h3>{status.replace("_", " ")}</h3>
      {tarefas
        .filter((tarefa) => tarefa.status === status)
        .map((tarefa) => (
          <div key={tarefa.id} style={tarefaStyle}>
            <p><strong>Descrição:</strong> {tarefa.descricao}</p>
            <p><strong>Setor:</strong> {tarefa.setor}</p>
            <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
            <p><strong>Usuário:</strong> {tarefa.usuario.nome} ({tarefa.usuario.email})</p>
            <div style={iconeContainerStyle}>
              <button onClick={() => handleEdit(tarefa)}>✏️</button>
              <button onClick={() => setTarefaParaExcluir(tarefa)}>🗑️</button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <>
    <CadastroTarefa atualizarListaDeTarefas={atualizarListaDeTarefas} />

      <div style={containerStyle}>
        {renderColuna("A_FAZER")}
        {renderColuna("FAZENDO")}
        {renderColuna("PRONTO")}
      </div>

      {tarefaEditando && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Editar Tarefa</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();

              }}
            >
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
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "A_FAZER" | "FAZENDO" | "PRONTO")}
                  required
                >
                  <option value="A_FAZER">A Fazer</option>
                  <option value="FAZENDO">Fazendo</option>
                  <option value="PRONTO">Pronto</option>
                </select>
              </div>
              <div style={buttonGroupStyle}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setTarefaEditando(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {tarefaParaExcluir && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Confirmação</h2>
            <p>Tem certeza que deseja excluir a tarefa: <strong>{tarefaParaExcluir.descricao}</strong>?</p>
            <div style={buttonGroupStyle}>
              <button onClick={handleDelete}>Sim</button>
              <button onClick={() => setTarefaParaExcluir(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
};

const colunaStyle: React.CSSProperties = {
  flex: 1,
  margin: "0 10px",
  padding: "10px",
  backgroundColor: "#000",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const tarefaStyle: React.CSSProperties = {
  padding: "10px",
  marginBottom: "10px",
  backgroundColor: "#393939",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const iconeContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

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
  textAlign: "center",
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: "15px",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};
