package com.conectauni;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ConectauniApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConectauniApplication.class, args);
    }
}
