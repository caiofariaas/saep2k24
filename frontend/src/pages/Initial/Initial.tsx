import { } from "react";
import { CadastroUsuario } from "./components/CadastroUsuario";
import { ListaTarefas } from "./components/ListaTarefas";

export function Initial() {

  return (
    <>
        <div className="cadastros">
            <CadastroUsuario />
            <ListaTarefas/>
        </div>
    </>
  );
}