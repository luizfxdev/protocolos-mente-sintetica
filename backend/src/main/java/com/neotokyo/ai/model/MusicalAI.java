// MusicalAI.java
package com.neotokyo.ai.model;

public final class MusicalAI extends ArtificialIntelligence {
    public MusicalAI() {
        super();
    }

    public MusicalAI(String name) {
        super(name);
    }

    @Override
    public String performNetworkAction() {
        return "[ARTISTIC] " + name + " → Criando batidas digitais!";
    }
}
