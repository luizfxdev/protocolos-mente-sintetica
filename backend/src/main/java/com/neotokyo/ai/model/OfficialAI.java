// OfficialAI.java
package com.neotokyo.ai.model;

public abstract sealed class OfficialAI extends ArtificialIntelligence permits SecurityAI, AdministrativeAI {
    public OfficialAI() {
        super();
    }

    public OfficialAI(String name) {
        super(name);
    }

    protected String getOfficialStatus() {
        return "[OFICIAL] ";
    }
}
