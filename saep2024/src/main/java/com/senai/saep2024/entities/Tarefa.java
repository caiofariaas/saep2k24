package com.senai.saep2024.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.senai.saep2024.dtos.tarefaDtos.TarefaCreateDTO;
import com.senai.saep2024.entities.enums.PrioridadeEnum;
import com.senai.saep2024.entities.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "tarefa")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private String setor;

    @Enumerated(EnumType.STRING)
    private PrioridadeEnum prioridade;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @ManyToOne
    @JoinColumn(name = "usuario", referencedColumnName = "id")
    @JsonBackReference
    private Usuario usuario;

    public Tarefa(TarefaCreateDTO data){
        this.descricao = data.descricao();
        this.setor = data.setor();
        this.prioridade = data.prioridade();
        this.status = StatusEnum.A_FAZER;
    }
}
