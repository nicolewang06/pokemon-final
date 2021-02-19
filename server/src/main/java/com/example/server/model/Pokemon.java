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
    private Integer pokemonNum;

    @Column
    private String nickname;

    @Column
    private String imageUrl;

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
    public Integer getPokemonNum() {
        return pokemonNum;
    }
    public void getPokemonNum(Integer pokemonNum) {
        this.pokemonNum = pokemonNum;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPokemonNum(Integer pokemonNum) {
        this.pokemonNum = pokemonNum;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
