package com.example.server.service;

import com.example.server.model.Pokemon;

public interface PokemonService {
    Iterable <Pokemon> getPokemon();

    Pokemon createPokemon (Pokemon pokemon);
}
