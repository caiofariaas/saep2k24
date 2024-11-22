package com.senai.saep2024.implementations.tarefaImpl;

import com.senai.saep2024.Exceptions.GenericsNotFoundException;
import com.senai.saep2024.dtos.tarefaDtos.TarefaCreateDTO;
import com.senai.saep2024.entities.Tarefa;
import com.senai.saep2024.entities.Usuario;
import com.senai.saep2024.repositories.TarefaRepository;
import com.senai.saep2024.repositories.UsuarioRepository;
import com.senai.saep2024.services.tarefaServices.CreateTarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateTarefaServiceImpl implements CreateTarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Tarefa save(TarefaCreateDTO data) {

        Usuario usuario = usuarioRepository.findByEmail(data.usuarioEmail())
                .orElseThrow(() -> new GenericsNotFoundException("Usuário Não Encontrado!"));

        Tarefa tarefa = new Tarefa(data);

        tarefa.setUsuario(usuario);
        usuario.getTarefaSet().add(tarefa);

        return tarefaRepository.save(tarefa);
    }
}
