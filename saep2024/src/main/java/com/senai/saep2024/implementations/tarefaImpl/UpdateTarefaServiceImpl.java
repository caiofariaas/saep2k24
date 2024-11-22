package com.senai.saep2024.implementations.tarefaImpl;

import com.senai.saep2024.Exceptions.GenericsNotFoundException;
import com.senai.saep2024.dtos.tarefaDtos.TarefaUpdateDTO;
import com.senai.saep2024.entities.Tarefa;
import com.senai.saep2024.entities.Usuario;
import com.senai.saep2024.repositories.TarefaRepository;
import com.senai.saep2024.repositories.UsuarioRepository;
import com.senai.saep2024.services.tarefaServices.UpdateTarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateTarefaServiceImpl implements UpdateTarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Tarefa update(Long id, TarefaUpdateDTO data) {

        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new GenericsNotFoundException("Tarefa Não Encontrada!"));

        if(data.usuarioEmail() != null){
            Usuario usuario = usuarioRepository.findByEmail(data.usuarioEmail())
                    .orElseThrow(() -> new GenericsNotFoundException("Usuário não encontrado"));

            tarefa.getUsuario().getTarefaSet().remove(tarefa);

            tarefa.setUsuario(usuario);
            usuario.getTarefaSet().add(tarefa);
        }

        if(data.descricao() != null){
            tarefa.setDescricao(data.descricao());
        }

        if(data.setor() != null){
            tarefa.setSetor(data.setor());
        }

        if(data.prioridade() != null){
            tarefa.setPrioridade(data.prioridade());
        }

        if(data.status() != null){
            tarefa.setStatus(data.status());
        }

        return tarefa;
    }
}
