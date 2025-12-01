package com.conectauni.controller;

import com.conectauni.model.Event;
import com.conectauni.repository.EventRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/calendar")
public class CalendarController {
    private final EventRepository eventRepo;
    public CalendarController(EventRepository eventRepo) { this.eventRepo = eventRepo; }

    @GetMapping("/{eventId}/ics")
    public ResponseEntity<String> ics(@PathVariable Long eventId) {
        Event e = eventRepo.findById(eventId).orElseThrow();
        String ics = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n" +
                "UID:" + eventId + "@conectauni\n" +
                "DTSTAMP:" + e.getStartAt() + "\n" +
                "DTSTART:" + e.getStartAt() + "\n" +
                "DTEND:" + e.getEndAt() + "\n" +
                "SUMMARY:" + e.getTitle() + "\n" +
                "DESCRIPTION:" + e.getDescription() + "\n" +
                "END:VEVENT\nEND:VCALENDAR";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("text","calendar", StandardCharsets.UTF_8));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=event.ics");
        return ResponseEntity.ok().headers(headers).body(ics);
    }
}
