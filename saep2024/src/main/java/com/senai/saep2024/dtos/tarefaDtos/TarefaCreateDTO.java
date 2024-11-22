package com.senai.saep2024.dtos.tarefaDtos;

import com.senai.saep2024.entities.enums.PrioridadeEnum;
import jakarta.validation.constraints.Email;

public record TarefaCreateDTO(
        String descricao,
        String setor,
        PrioridadeEnum prioridade,

        @Email
        String usuarioEmail
) {
}
