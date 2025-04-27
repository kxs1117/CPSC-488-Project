package com.pharm_management.fraud;

public interface FraudRule {
    RuleEvaluationResult evaluate(DispenseContext context);
}
