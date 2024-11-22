package com.senai.saep2024.entities.enums;

public enum StatusEnum {
    A_FAZER("a_fazer"),
    FAZENDO("fazendo"),
    PRONTO("pronto");

    private String status;

    StatusEnum(String status){
        this.status = status;
    }
}
