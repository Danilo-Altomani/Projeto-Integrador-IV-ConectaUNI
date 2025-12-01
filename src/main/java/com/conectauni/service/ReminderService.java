package com.conectauni.service;

import com.conectauni.model.Invite;
import com.conectauni.repository.InviteRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
public class ReminderService {
    private final InviteRepository inviteRepo;
    private final EmailService emailService;

    public ReminderService(InviteRepository inviteRepo, EmailService emailService) {
        this.inviteRepo = inviteRepo;
        this.emailService = emailService;
    }

    @Scheduled(fixedRate = 60000)
    public void checkReminders() {
        List<Invite> invites = inviteRepo.findAll();
        for (Invite inv : invites) {
            if (inv.getEvent() == null) continue;
            Instant now = Instant.now();
            Instant start = inv.getEvent().getStartAt();
            if (start == null) continue;
            long minutesBefore = Duration.between(now, start).toMinutes();
            sendIfMatch(minutesBefore, 43200, inv);
            sendIfMatch(minutesBefore, 10080, inv);
            sendIfMatch(minutesBefore, 1440, inv);
            sendIfMatch(minutesBefore, 60, inv);
            sendIfMatch(minutesBefore, 10, inv);
            sendIfMatch(minutesBefore, 5, inv);
        }
    }

    private void sendIfMatch(long minutesBefore, long target, Invite inv) {
        if (minutesBefore == target && (inv.getRsvpStatus() == com.conectauni.model.RSVPStatus.SIM)) {
            String to = inv.getInviteeEmail();
            String subject = "Lembrete de evento: " + inv.getEvent().getTitle();
            String body = "O evento " + inv.getEvent().getTitle() + " começará em " + inv.getEvent().getStartAt();
            try {
                emailService.sendReminder(to, subject, body);
            } catch (Exception e) {
                System.out.println("[ReminderService] falha: " + e.getMessage());
            }
        }
    }
}
