package com.neotokyo.ai.dto;

import java.util.List;

public class AIRequest {
    private String input;
    
    public AIRequest() {}
    
    public AIRequest(String input) {
        this.input = input;
    }
    
    public String getInput() {
        return input;
    }
    
    public void setInput(String input) {
        this.input = input;
    }
    
    public List<String[]> parseInput() {
        if (input == null || input.trim().isEmpty()) {
            return List.of();
        }
        
        String[] entries = input.split(",");
        return java.util.Arrays.stream(entries)
            .map(String::trim)
            .filter(s -> !s.isEmpty())
            .map(type -> new String[]{type, type})
            .toList();
    }
}