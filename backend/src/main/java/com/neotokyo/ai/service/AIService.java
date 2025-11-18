package com.neotokyo.ai.service;

import com.neotokyo.ai.dto.AIRequest;
import com.neotokyo.ai.dto.AIResponse;
import com.neotokyo.ai.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIService {
    
    public AIResponse processAISimulation(AIRequest request) {
        List<String[]> aiInput = request.parseInput();
        List<ArtificialIntelligence> ais = new ArrayList<>();
        List<String> actions = new ArrayList<>();
        
        int counter = 1;
        for (String[] data : aiInput) {
            String type = data[1].toLowerCase();
            String name = "AI_" + counter++;
            ArtificialIntelligence ai = createAI(type, name);
            
            if (ai != null) {
                ais.add(ai);
                actions.add(ai.performNetworkAction());
            }
        }
        
        String finalOutput = String.join("\n", actions);
        
        return new AIResponse(actions, finalOutput, ais.size());
    }
    
    private ArtificialIntelligence createAI(String type, String name) {
        return switch (type) {
            case "security" -> new SecurityAI(name);
            case "administrative" -> new AdministrativeAI(name);
            case "musical" -> new MusicalAI(name);
            case "hacked" -> new HackedAI(name);
            default -> null;
        };
    }
}