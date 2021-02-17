package com.example.server.repository;

import com.example.server.model.Pokemon;
import org.springframework.data.repository.CrudRepository;

public interface PokemonRepository extends CrudRepository<Pokemon, Long> {
}
