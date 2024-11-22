package com.senai.saep2024.implementations.tarefaImpl;


import com.senai.saep2024.Exceptions.GenericsNotFoundException;
import com.senai.saep2024.entities.Tarefa;
import com.senai.saep2024.repositories.TarefaRepository;
import com.senai.saep2024.services.tarefaServices.DeleteTarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeleteTarefaServiceImpl implements DeleteTarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Override
    public void delete(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new GenericsNotFoundException("Tarefa Não Encontrada!"));

        tarefaRepository.delete(tarefa);
    }
}
