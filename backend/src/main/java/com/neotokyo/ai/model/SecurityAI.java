// SecurityAI.java
package com.neotokyo.ai.model;

public final class SecurityAI extends OfficialAI {
    public SecurityAI() {
        super();
    }

    public SecurityAI(String name) {
        super(name);
    }

    @Override
    public String performNetworkAction() {
        return getOfficialStatus() + name + " → Patrulhando firewalls...";
    }
}
