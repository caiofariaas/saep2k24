package com.senai.saep2024.services.usuarioServices;


import com.senai.saep2024.dtos.usuarioDtos.UsuarioCreateDTO;
import com.senai.saep2024.entities.Usuario;

public interface CreateUserService {
    Usuario save (UsuarioCreateDTO data);
}
