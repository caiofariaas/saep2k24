package com.senai.saep2024.controllers;


import com.senai.saep2024.dtos.usuarioDtos.UsuarioCreateDTO;
import com.senai.saep2024.entities.Usuario;
import com.senai.saep2024.repositories.UsuarioRepository;
import com.senai.saep2024.services.usuarioServices.CreateUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuario", description = "\"API para operações relacionadas ao usuário\"")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    CreateUserService createUserService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<Usuario> save(@RequestBody @Valid UsuarioCreateDTO data, UriComponentsBuilder builder){
        Usuario usuario = createUserService.save(data);

        URI uri = builder.path("/usuario/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(uri).body(usuario);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAll(){
        return ResponseEntity.ok(usuarioRepository.findAll());
    }
}
