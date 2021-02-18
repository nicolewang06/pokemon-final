package com.example.server.service;

import com.example.server.model.Pokemon;
import org.springframework.http.HttpStatus;

public interface PokemonService {
    Iterable <Pokemon> getPokemon();
    Pokemon getPokemonById(Long id);

    Pokemon createPokemon (Pokemon pokemon);
    Pokemon updatePokemon(Pokemon pokemon);
    HttpStatus deletePokemon(Long id);
}
