package com.senai.saep2024.implementations.usuarioImpl;

import com.senai.saep2024.dtos.usuarioDtos.UsuarioCreateDTO;
import com.senai.saep2024.entities.Usuario;
import com.senai.saep2024.repositories.UsuarioRepository;
import com.senai.saep2024.services.usuarioServices.CreateUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateUserServiceImpl implements CreateUserService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario save(UsuarioCreateDTO data) {
        return usuarioRepository.save(new Usuario(data));
    }
}
