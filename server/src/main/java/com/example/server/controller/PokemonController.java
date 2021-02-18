package com.example.server.controller;

import com.example.server.model.Pokemon;
import com.example.server.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
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

    @PatchMapping
    public Pokemon updatePokemon(@RequestBody Pokemon pokemon) {
        return pokemonService.updatePokemon(pokemon);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deletePokemon(@PathVariable Long id) {
        return pokemonService.deletePokemon(id);
    }
}
