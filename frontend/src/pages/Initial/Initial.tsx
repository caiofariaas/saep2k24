import { } from "react";
import { CadastroUsuario } from "./components/CadastroUsuario";
import { CadastroTarefa } from "./components/CadastroTarefa";

export function Initial() {

  return (
    <>
        <div className="cadastros">
            <CadastroUsuario />
            <CadastroTarefa />
        </div>
    </>
  );
}