package com.conectauni.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "invites", indexes = {@Index(columnList = "token", name = "idx_invite_token")})
public class Invite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Event event;

    private String inviteeEmail;

    @Column(unique = true)
    private String token;

    private String qrCodePath;

    @Enumerated(EnumType.STRING)
    private RSVPStatus rsvpStatus = RSVPStatus.PENDING;

    private Instant createdAt = Instant.now();

    public Invite() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }
    public String getInviteeEmail() { return inviteeEmail; }
    public void setInviteeEmail(String inviteeEmail) { this.inviteeEmail = inviteeEmail; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getQrCodePath() { return qrCodePath; }
    public void setQrCodePath(String qrCodePath) { this.qrCodePath = qrCodePath; }
    public RSVPStatus getRsvpStatus() { return rsvpStatus; }
    public void setRsvpStatus(RSVPStatus rsvpStatus) { this.rsvpStatus = rsvpStatus; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
