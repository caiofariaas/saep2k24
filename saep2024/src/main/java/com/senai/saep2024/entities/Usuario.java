package com.senai.saep2024.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.senai.saep2024.dtos.usuarioDtos.UsuarioCreateDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Tarefa> tarefaSet = new HashSet<>();

    public Usuario(UsuarioCreateDTO data) {
        this.nome = data.nome();
        this.email = data.email();
    }
}
