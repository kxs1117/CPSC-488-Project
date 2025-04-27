package com.pharm_management.fraud;

import java.util.ArrayList;
import java.util.List;

public class FraudDetectionService {
    private final List<FraudRule> rules = List.of(
        new TooFrequentRefillRule(),
        new OverMaxDosageRule()
        
    );

    public FraudResult evaluate(DispenseContext context) {
        int totalScore = 0;
        List<String> reasons = new ArrayList<>();
        

        for (FraudRule rule : rules) {
            RuleEvaluationResult result = rule.evaluate(context);
            if (result.isViolated()) {
                totalScore += result.getWeight();
                reasons.add(result.getReason());
            }
        }

        return new FraudResult(totalScore, reasons);
    }
}
