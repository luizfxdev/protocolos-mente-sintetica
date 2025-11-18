package com.neotokyo.ai.controller;

import com.neotokyo.ai.dto.AIRequest;
import com.neotokyo.ai.dto.AIResponse;
import com.neotokyo.ai.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {
    
    private final AIService aiService;
    
    public AIController(AIService aiService) {
        this.aiService = aiService;
    }
    
    @PostMapping("/simulate")
    public ResponseEntity<AIResponse> simulateAI(@RequestBody AIRequest request) {
        try {
            AIResponse response = aiService.processAISimulation(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Neo-Tokyo AI System Online");
    }
}