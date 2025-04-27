package com.pharm_management.fraud;

public class OverMaxDosageRule implements FraudRule {
    private static final int WEIGHT = 3;
    private static final int MAX_DOSE = 30;

    @Override
    public RuleEvaluationResult evaluate(DispenseContext context) {
        if (context.quantity > MAX_DOSE) {
            return new RuleEvaluationResult(true, WEIGHT, "Quantity exceeds max dosage");
        }
        return new RuleEvaluationResult(false, 0, null);
    }
}
