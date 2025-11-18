// ArtificialIntelligence.java
package com.neotokyo.ai.model;

public abstract sealed class ArtificialIntelligence permits OfficialAI, HackedAI, MusicalAI {
    protected String name;

    public ArtificialIntelligence() {
        this.name = "Unknown AI";
    }

    public ArtificialIntelligence(String name) {
        this.name = name;
    }

    public abstract String performNetworkAction();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
