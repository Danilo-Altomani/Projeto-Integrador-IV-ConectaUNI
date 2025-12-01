package com.conectauni.service;

import com.conectauni.dto.AuthRequest;
import com.conectauni.dto.AuthResponse;
import com.conectauni.model.User;
import com.conectauni.repository.UserRepository;
import com.conectauni.util.HashUtil;
import com.conectauni.util.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(AuthRequest req) {
        if (userRepo.existsByEmail(req.email)) {
            throw new RuntimeException("Email já cadastrado");
        }
        String salt = HashUtil.generateSalt();
        String hash = HashUtil.hashPassword(salt, req.password);
        User user = new User();
        user.setEmail(req.email);
        user.setFullName(req.fullName);
        user.setPasswordHash(hash);
        user.setSalt(salt);
        user.setRole(Enum.valueOf(com.conectauni.model.Role.class, req.role));
        userRepo.save(user);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        AuthResponse res = new AuthResponse();
        res.token = token; res.email = user.getEmail(); res.role = user.getRole().name();
        return res;
    }

    public AuthResponse login(AuthRequest req) {
        Optional<User> op = userRepo.findByEmail(req.email);
        if (op.isEmpty()) throw new RuntimeException("Credenciais inválidas");
        User u = op.get();
        String hashed = HashUtil.hashPassword(u.getSalt(), req.password);
        if (!hashed.equals(u.getPasswordHash())) throw new RuntimeException("Credenciais inválidas");
        String token = jwtUtil.generateToken(u.getEmail(), u.getRole().name());
        AuthResponse res = new AuthResponse();
        res.token = token; res.email = u.getEmail(); res.role = u.getRole().name();
        return res;
    }
}
