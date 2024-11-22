package com.senai.saep2024.entities.enums;

public enum PrioridadeEnum {
    BAIXA("baixa"),
    MEDIA("media"),
    ALTA("alta");

    private String prioridade;

    PrioridadeEnum(String prioridade){
        this.prioridade = prioridade;
    }
}
