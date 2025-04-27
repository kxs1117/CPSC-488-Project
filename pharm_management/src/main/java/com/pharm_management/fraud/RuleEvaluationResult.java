package com.pharm_management.fraud;

public class RuleEvaluationResult {
    private final boolean violated;
    private final int weight;
    private final String reason;

    public RuleEvaluationResult(boolean violated, int weight, String reason) {
        this.violated = violated;
        this.weight = weight;
        this.reason = reason;
    }

    public boolean isViolated() { return violated; }
    public int getWeight() { return weight; }
    public String getReason() { return reason; }
}
