package com.example.server.service;

import com.example.server.model.Pokemon;
import com.example.server.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class PokemonServiceImpl implements PokemonService{
    @Autowired
    PokemonRepository pokemonRepository;

    @Override
    public Iterable<Pokemon> getPokemon() {
        return pokemonRepository.findAll();
    }

    @Override
    public Pokemon createPokemon(Pokemon pokemon) {
        return pokemonRepository.save(pokemon);
    }

    @Override
    public Pokemon getPokemonById(Long id) {
        return pokemonRepository.findById(id).get();
    }

    @Override
    public Pokemon updatePokemon(Pokemon pokemon) {
        return pokemonRepository.save(pokemon);
    }

    @Override
    public HttpStatus deletePokemon(Long id) {
        pokemonRepository.deleteById(id);
        return HttpStatus.OK;
    }
}
