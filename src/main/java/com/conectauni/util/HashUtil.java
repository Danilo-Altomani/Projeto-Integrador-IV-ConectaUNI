package com.conectauni.util;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HexFormat;

public class HashUtil {
    private static final SecureRandom RAND = new SecureRandom();
    public static String generateSalt() {
        byte[] salt = new byte[16];
        RAND.nextBytes(salt);
        return HexFormat.of().formatHex(salt);
    }

    public static String sha256(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] h = md.digest(input.getBytes("UTF-8"));
            return HexFormat.of().formatHex(h);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String hashPassword(String saltHex, String password) {
        return sha256(saltHex + password);
    }
}
