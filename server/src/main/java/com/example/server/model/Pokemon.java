package com.example.server.model;

import javax.persistence.*;

@Entity
@Table(name = "pokemon")
public class Pokemon {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pokemonName;

    @Column
    private Boolean captured;

    @Column
    private String nickname;

    public Pokemon() {}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getPokemonName() {
        return pokemonName;
    }
    public void setPokemonName(String pokemonName) {
        this.pokemonName = pokemonName;
    }
    public Boolean getCaptured() {
        return captured;
    }
    public void setCaptured(Boolean captured) {
        this.captured = captured;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickName) {
        this.nickname = nickname;
    }
}
