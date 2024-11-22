package com.senai.saep2024.dtos.tarefaDtos;

import com.senai.saep2024.entities.enums.PrioridadeEnum;
import com.senai.saep2024.entities.enums.StatusEnum;
import jakarta.validation.constraints.Email;

public record TarefaUpdateDTO(
        String descricao,
        String setor,

        PrioridadeEnum prioridade,
        StatusEnum status,

        @Email
        String usuarioEmail
) {
}
