package com.senai.saep2024.controllers;

import com.senai.saep2024.dtos.tarefaDtos.TarefaCreateDTO;
import com.senai.saep2024.dtos.tarefaDtos.TarefaUpdateDTO;
import com.senai.saep2024.entities.Tarefa;
import com.senai.saep2024.repositories.TarefaRepository;
import com.senai.saep2024.services.tarefaServices.CreateTarefaService;
import com.senai.saep2024.services.tarefaServices.UpdateTarefaService;
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
@RequestMapping("/tarefa")
@Tag(name = "Tarefa", description = "\"API para operações relacionadas as tarefas\"")
public class TarefaController {

    @Autowired
    CreateTarefaService createTarefaService;

    @Autowired
    UpdateTarefaService updateTarefaService;

    @Autowired
    private TarefaRepository tarefaRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<Tarefa> save (@RequestBody @Valid TarefaCreateDTO data, UriComponentsBuilder builder){
        Tarefa tarefa = createTarefaService.save(data);

        URI uri = builder.path("/tarefa/{id}").buildAndExpand(tarefa.getId()).toUri();

        return ResponseEntity.created(uri).body(tarefa);
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> getAll(){
        return ResponseEntity.ok(tarefaRepository.findAll());
    }

    @PatchMapping("/{id}")
    @Transactional
    public ResponseEntity<Tarefa> update (@PathVariable Long id, @RequestBody @Valid TarefaUpdateDTO data){
        return ResponseEntity.ok(updateTarefaService.update(id, data));
    }
}
