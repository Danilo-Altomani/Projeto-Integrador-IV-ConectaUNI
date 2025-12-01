package com.conectauni.service;

import com.conectauni.dto.EventDTO;
import com.conectauni.model.Event;
import com.conectauni.model.User;
import com.conectauni.repository.EventRepository;
import com.conectauni.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepo;
    private final UserRepository userRepo;

    public EventService(EventRepository eventRepo, UserRepository userRepo) {
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
    }

    public EventDTO create(EventDTO dto, String creatorEmail) {
        User creator = userRepo.findByEmail(creatorEmail).orElseThrow();
        Event ev = new Event();
        ev.setTitle(dto.title);
        ev.setDescription(dto.description);
        ev.setStartAt(dto.startAt);
        ev.setEndAt(dto.endAt);
        ev.setLocation(dto.location);
        ev.setBudget(dto.budget);
        ev.setCreator(creator);
        Event saved = eventRepo.save(ev);
        dto.id = saved.getId();
        dto.creatorId = creator.getId();
        return dto;
    }

    public EventDTO update(Long id, EventDTO dto, String requesterEmail) {
        Event ev = eventRepo.findById(id).orElseThrow();
        if (!ev.getCreator().getEmail().equals(requesterEmail)) {
            throw new RuntimeException("Somente o criador pode editar");
        }
        ev.setTitle(dto.title);
        ev.setDescription(dto.description);
        ev.setStartAt(dto.startAt);
        ev.setEndAt(dto.endAt);
        ev.setLocation(dto.location);
        ev.setBudget(dto.budget);
        eventRepo.save(ev);
        dto.id = ev.getId();
        return dto;
    }

    public void delete(Long id, String requesterEmail) {
        Event ev = eventRepo.findById(id).orElseThrow();
        if (!ev.getCreator().getEmail().equals(requesterEmail)) throw new RuntimeException("Somente o criador pode excluir");
        eventRepo.delete(ev);
    }

    public List<EventDTO> listAll() {
        return eventRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public EventDTO getById(Long id) {
        return toDto(eventRepo.findById(id).orElseThrow());
    }

    private EventDTO toDto(Event e) {
        EventDTO d = new EventDTO();
        d.id = e.getId(); d.title = e.getTitle(); d.description = e.getDescription();
        d.startAt = e.getStartAt(); d.endAt = e.getEndAt(); d.location = e.getLocation();
        d.budget = e.getBudget();
        d.creatorId = e.getCreator()!=null ? e.getCreator().getId() : null;
        return d;
    }

    public double calcCostPerPerson(Long eventId) {
        Event e = eventRepo.findById(eventId).orElseThrow();
        long positive = e.getInvites() == null ? 0 : e.getInvites().stream().filter(i -> i.getRsvpStatus() == com.conectauni.model.RSVPStatus.SIM).count();
        if (positive == 0 || e.getBudget() == null) return 0.0;
        return e.getBudget() / positive;
    }
}
