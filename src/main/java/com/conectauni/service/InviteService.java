package com.conectauni.service;

import com.conectauni.dto.InviteDTO;
import com.conectauni.model.Event;
import com.conectauni.model.Invite;
import com.conectauni.model.RSVPStatus;
import com.conectauni.repository.EventRepository;
import com.conectauni.repository.InviteRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class InviteService {
    private final InviteRepository inviteRepo;
    private final EventRepository eventRepo;
    private final QRService qrService;
    private final EmailService emailService;
    private final String qrDir;

    public InviteService(InviteRepository inviteRepo, EventRepository eventRepo, QRService qrService,
                         EmailService emailService, @Value("${conectauni.qr.dir}") String qrDir) {
        this.inviteRepo = inviteRepo;
        this.eventRepo = eventRepo;
        this.qrService = qrService;
        this.emailService = emailService;
        this.qrDir = qrDir;
    }

    public InviteDTO createInvite(Long eventId, String inviteeEmail, String baseUrl) throws Exception {
        Event ev = eventRepo.findById(eventId).orElseThrow();
        Invite inv = new Invite();
        inv.setEvent(ev);
        inv.setInviteeEmail(inviteeEmail);
        inv.setToken(UUID.randomUUID().toString());
        Files.createDirectories(Path.of(qrDir));
        String qrFilename = "qr_" + inv.getToken() + ".png";
        String qrPath = Path.of(qrDir, qrFilename).toString();
        String link = baseUrl + "/invites/" + inv.getToken();
        qrService.generateQRCodeImage(link, 300, 300, qrPath);
        inv.setQrCodePath(qrPath);
        inviteRepo.save(inv);
        emailService.sendInviteEmail(inviteeEmail, ev.getTitle(), link, qrPath);
        InviteDTO dto = toDto(inv);
        dto.qrCodeUrl = "/qrcodes/" + qrFilename;
        return dto;
    }

    public InviteDTO getByToken(String token) {
        Invite inv = inviteRepo.findByToken(token).orElseThrow();
        return toDto(inv);
    }

    public InviteDTO rsvp(String token, RSVPStatus status) {
        Invite inv = inviteRepo.findByToken(token).orElseThrow();
        inv.setRsvpStatus(status);
        inviteRepo.save(inv);
        return toDto(inv);
    }

    private InviteDTO toDto(Invite inv) {
        InviteDTO d = new InviteDTO();
        d.id = inv.getId();
        d.eventId = inv.getEvent().getId();
        d.inviteeEmail = inv.getInviteeEmail();
        d.token = inv.getToken();
        d.rsvpStatus = inv.getRsvpStatus().name();
        d.qrCodeUrl = inv.getQrCodePath();
        return d;
    }
}
