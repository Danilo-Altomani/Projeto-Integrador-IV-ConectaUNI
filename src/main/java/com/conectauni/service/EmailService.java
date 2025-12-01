package com.conectauni.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInviteEmail(String to, String eventTitle, String link, String qrPath) throws Exception {
        // In dev profile mailSender will be a no-op or logging; keep same signature.
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("Convite: " + eventTitle);
            String body = String.format("Você foi convidado para %s\nLink: %s", eventTitle, link);
            helper.setText(body);
            FileSystemResource qr = new FileSystemResource(new File(qrPath));
            if (qr.exists()) {
                helper.addAttachment("qrcode.png", qr);
            }
            mailSender.send(msg);
        } catch (Exception ex) {
            // If mail fails in dev, log to STDOUT (Spring Boot will show)
            System.out.println("[EmailService] (dev) - não foi possível enviar email: " + ex.getMessage());
        }
    }

    public void sendReminder(String to, String subject, String body) {
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            m.setTo(to);
            m.setSubject(subject);
            m.setText(body);
            mailSender.send(m);
        } catch (Exception e) {
            System.out.println("[EmailService] (dev) - sendReminder falhou: " + e.getMessage());
        }
    }
}
