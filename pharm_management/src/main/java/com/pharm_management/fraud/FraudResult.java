package com.pharm_management.fraud;

import java.util.List;

public class FraudResult {
    private final int totalScore;
    private final List<String> reasons;

    public FraudResult(int totalScore, List<String> reasons) {
        this.totalScore = totalScore;
        this.reasons = reasons;
    }

    public int getTotalScore() { return totalScore; }
    public List<String> getReasons() { return reasons; }
}
