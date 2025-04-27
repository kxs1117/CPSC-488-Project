package com.pharm_management.fraud;

import java.time.temporal.ChronoUnit;

public class TooFrequentRefillRule implements FraudRule {
    private static final int WEIGHT = 3;

    @Override
    public RuleEvaluationResult evaluate(DispenseContext context) {
        if (context.lastDispenseDate != null &&
            ChronoUnit.DAYS.between(context.lastDispenseDate, context.dispenseDate) < 7) {
            return new RuleEvaluationResult(true, WEIGHT, "Refilled too soon (<7 days)");
        }
        return new RuleEvaluationResult(false, 0, null);
    }
}
