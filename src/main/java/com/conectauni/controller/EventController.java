package com.conectauni.controller;

import com.conectauni.dto.EventDTO;
import com.conectauni.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService srv;
    public EventController(EventService srv){ this.srv = srv; }

    @PostMapping
    public ResponseEntity<EventDTO> create(@RequestBody EventDTO dto, Authentication auth) {
        String email = (String) auth.getPrincipal();
        return ResponseEntity.ok(srv.create(dto, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> update(@PathVariable Long id, @RequestBody EventDTO dto, Authentication auth) {
        String email = (String) auth.getPrincipal();
        return ResponseEntity.ok(srv.update(id, dto, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        String email = (String) auth.getPrincipal();
        srv.delete(id, email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> list() {
        return ResponseEntity.ok(srv.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(srv.getById(id));
    }

    @GetMapping("/{id}/cost-per-person")
    public ResponseEntity<Double> costPerPerson(@PathVariable Long id) {
        return ResponseEntity.ok(srv.calcCostPerPerson(id));
    }
}
