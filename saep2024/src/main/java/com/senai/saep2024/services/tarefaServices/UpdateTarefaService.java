package com.senai.saep2024.services.tarefaServices;

import com.senai.saep2024.dtos.tarefaDtos.TarefaUpdateDTO;
import com.senai.saep2024.entities.Tarefa;

public interface UpdateTarefaService {
    Tarefa update(Long id, TarefaUpdateDTO data);
}
