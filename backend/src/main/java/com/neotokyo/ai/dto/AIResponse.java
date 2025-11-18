package com.neotokyo.ai.dto;

import java.util.List;

public class AIResponse {
    private List<String> actions;
    private String finalOutput;
    private int totalAIs;
    
    public AIResponse() {}
    
    public AIResponse(List<String> actions, String finalOutput, int totalAIs) {
        this.actions = actions;
        this.finalOutput = finalOutput;
        this.totalAIs = totalAIs;
    }
    
    public List<String> getActions() {
        return actions;
    }
    
    public void setActions(List<String> actions) {
        this.actions = actions;
    }
    
    public String getFinalOutput() {
        return finalOutput;
    }
    
    public void setFinalOutput(String finalOutput) {
        this.finalOutput = finalOutput;
    }
    
    public int getTotalAIs() {
        return totalAIs;
    }
    
    public void setTotalAIs(int totalAIs) {
        this.totalAIs = totalAIs;
    }
}