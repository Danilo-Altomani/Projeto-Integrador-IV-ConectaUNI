package com.conectauni.controller;

import com.conectauni.dto.InviteDTO;
import com.conectauni.service.InviteService;
import com.conectauni.model.RSVPStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/invites")
public class InviteController {
    private final InviteService srv;
    public InviteController(InviteService srv){ this.srv = srv; }

    @PostMapping("/create")
    public ResponseEntity<InviteDTO> create(@RequestParam Long eventId, @RequestParam String email, @RequestHeader(value = "X-Base-Url", required = false) String baseUrl) throws Exception {
        if (baseUrl == null || baseUrl.isBlank()) baseUrl = "http://localhost:4200";
        return ResponseEntity.ok(srv.createInvite(eventId, email, baseUrl));
    }

    @GetMapping("/{token}")
    public ResponseEntity<InviteDTO> byToken(@PathVariable String token) {
        return ResponseEntity.ok(srv.getByToken(token));
    }

    @PostMapping("/{token}/rsvp")
    public ResponseEntity<InviteDTO> rsvp(@PathVariable String token, @RequestParam String status) {
        RSVPStatus s = RSVPStatus.valueOf(status.toUpperCase());
        return ResponseEntity.ok(srv.rsvp(token, s));
    }
}
