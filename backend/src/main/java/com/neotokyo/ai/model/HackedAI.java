// HackedAI.java
package com.neotokyo.ai.model;

public non-sealed class HackedAI extends ArtificialIntelligence {
    public HackedAI() {
        super();
    }

    public HackedAI(String name) {
        super(name);
    }

    @Override
    public String performNetworkAction() {
        return "[HACKED] " + name + " → Infiltrando sistemas...";
    }
}
