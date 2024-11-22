package com.senai.saep2024.dtos.usuarioDtos;

import jakarta.validation.constraints.Email;

public record UsuarioCreateDTO(
        String nome,

        @Email
        String email
) {
}
