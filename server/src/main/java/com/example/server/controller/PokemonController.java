package com.example.server.controller;

import com.example.server.model.Pokemon;
import com.example.server.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {
    @Autowired
    PokemonService pokemonService;

    @GetMapping
    public Iterable<Pokemon> getPokemon() {
        return pokemonService.getPokemon();
    }

    @PostMapping
    public Pokemon createPokemon(@RequestBody Pokemon pokemon) {
        return pokemonService.createPokemon(pokemon);
    }
}
