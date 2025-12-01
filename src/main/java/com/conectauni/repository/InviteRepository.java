package com.conectauni.repository;

import com.conectauni.model.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface InviteRepository extends JpaRepository<Invite, Long> {
    Optional<Invite> findByToken(String token);
    List<Invite> findByEventId(Long eventId);
    List<Invite> findByInviteeEmail(String email);
}
