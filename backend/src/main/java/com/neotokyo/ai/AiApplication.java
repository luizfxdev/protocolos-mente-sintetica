package com.neotokyo.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AiApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(AiApplication.class, args);
        System.out.println("\n╔════════════════════════════════════════════╗");
        System.out.println("║   NEO-TOKYO AI PROTOCOLS SYSTEM ONLINE    ║");
        System.out.println("║   Backend running on: http://localhost:8080 ║");
        System.out.println("╚════════════════════════════════════════════╝\n");
    }
}