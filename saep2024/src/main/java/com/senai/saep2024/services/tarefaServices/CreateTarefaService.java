package com.senai.saep2024.services.tarefaServices;

import com.senai.saep2024.dtos.tarefaDtos.TarefaCreateDTO;
import com.senai.saep2024.entities.Tarefa;

public interface CreateTarefaService {
    Tarefa save (TarefaCreateDTO data);
}
