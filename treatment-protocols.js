// Treatment Protocols JavaScript
// Interactive treatment algorithms and dosing calculators

class TreatmentProtocols {
    constructor() {
        this.currentProtocol = 'heart-failure';
        this.init();
    }

    init() {
        this.initializeNavigation();
        this.initializeDosingCalculator();
        this.loadProtocolContent();
    }

    initializeNavigation() {
        const protocolButtons = document.querySelectorAll('.protocol-nav-btn');
        
        protocolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const protocol = button.dataset.protocol;
                this.switchProtocol(protocol);
            });
        });
    }

    switchProtocol(protocol) {
        // Update navigation
        const protocolButtons = document.querySelectorAll('.protocol-nav-btn');
        protocolButtons.forEach(btn => {
            btn.classList.remove('bg-clinical-blue', 'text-white', 'font-semibold');
            btn.classList.add('text-neutral-slate', 'hover:bg-gray-100');
        });
        
        const activeButton = document.querySelector(`[data-protocol="${protocol}"]`);
        if (activeButton) {
            activeButton.classList.add('bg-clinical-blue', 'text-white', 'font-semibold');
            activeButton.classList.remove('text-neutral-slate', 'hover:bg-gray-100');
        }
        
        // Update content
        const protocolContents = document.querySelectorAll('.protocol-content');
        protocolContents.forEach(content => {
            content.classList.add('hidden');
        });
        
        const targetContent = document.getElementById(`${protocol}-protocol`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
            
            // Animate content
            anime({
                targets: targetContent,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutCubic'
            });
        }
        
        this.currentProtocol = protocol;
    }

    loadProtocolContent() {
        // This would typically load protocol content from a database or API
        // For now, we'll use the static content in the HTML
        console.log('Loading protocol content for:', this.currentProtocol);
    }

    initializeDosingCalculator() {
        const calculateBtn = document.getElementById('calculate-dosing');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateDosing();
            });
        }
    }

    calculateDosing() {
        const age = parseInt(document.getElementById('calc-age').value);
        const weight = parseFloat(document.getElementById('calc-weight').value);
        const creatinine = parseFloat(document.getElementById('calc-creatinine').value);
        const indication = document.getElementById('calc-indication').value;
        
        if (!age || !weight || !creatinine || !indication) {
            this.showNotification('Please fill in all fields for dosing calculations', 'warning');
            return;
        }
        
        // Calculate creatinine clearance using Cockcroft-Gault equation
        const crCl = this.calculateCrCl(weight, age, creatinine);
        
        // Generate dosing recommendations based on indication
        const recommendations = this.generateDosingRecommendations(indication, age, weight, crCl);
        
        this.displayDosingRecommendations(recommendations, crCl);
    }

    calculateCrCl(weight, age, creatinine) {
        // Cockcroft-Gault equation (simplified for demonstration)
        // CrCl = ((140 - age) * weight) / (72 * creatinine) [for males]
        // For females, multiply by 0.85
        let crCl = ((140 - age) * weight) / (72 * creatinine);
        
        // Assume male for this calculation (would need gender input in real application)
        // crCl *= 0.85; // if female
        
        return Math.round(crCl);
    }

    generateDosingRecommendations(indication, age, weight, crCl) {
        const recommendations = [];
        
        switch (indication) {
            case 'hfref':
                recommendations.push({
                    category: 'ACE Inhibitor',
                    medication: 'Enalapril',
                    startingDose: '2.5mg BID',
                    targetDose: '10-20mg BID',
                    titration: 'Double dose every 2-4 weeks',
                    monitoring: 'Check K+ and creatinine 1-2 weeks after each dose change',
                    contraindications: crCl < 30 ? 'Reduce starting dose by 50%' : 'Standard dosing'
                });
                
                recommendations.push({
                    category: 'Beta-Blocker',
                    medication: 'Carvedilol',
                    startingDose: '3.125mg BID',
                    targetDose: '25mg BID (50mg BID if >85kg)',
                    titration: 'Double dose every 2 weeks if stable',
                    monitoring: 'Check HR and BP with each dose change',
                    contraindications: 'HR <50 bpm, symptomatic hypotension'
                });
                
                recommendations.push({
                    category: 'MRA',
                    medication: 'Spironolactone',
                    startingDose: '25mg daily',
                    targetDose: '25-50mg daily',
                    titration: 'Start 25mg daily, increase to 50mg after 4 weeks if K+ <5.0',
                    monitoring: 'Check K+ and creatinine at 3 days, 1 week, then monthly',
                    contraindications: crCl < 30 ? 'Use with caution, consider 25mg every other day' : 'Standard dosing'
                });
                break;
                
            case 'cad':
                recommendations.push({
                    category: 'Antiplatelet',
                    medication: 'Aspirin',
                    startingDose: '81mg daily',
                    targetDose: '81mg daily (lifelong)',
                    titration: 'Not applicable',
                    monitoring: 'Watch for bleeding, GI symptoms',
                    contraindications: 'Active bleeding, severe allergy'
                });
                
                recommendations.push({
                    category: 'Statin',
                    medication: 'Atorvastatin',
                    startingDose: '40-80mg daily',
                    targetDose: '40-80mg daily',
                    titration: 'Start 40mg, increase to 80mg if needed for LDL <70',
                    monitoring: 'Check LFTs at baseline, then as clinically indicated',
                    contraindications: 'Active liver disease, pregnancy'
                });
                
                recommendations.push({
                    category: 'Beta-Blocker',
                    medication: 'Metoprolol succinate',
                    startingDose: '25mg daily',
                    targetDose: '100-200mg daily',
                    titration: 'Double dose every 2 weeks to target HR 55-60 bpm',
                    monitoring: 'Check HR and BP with each dose change',
                    contraindications: 'Severe bradycardia, heart block'
                });
                break;
                
            case 'af':
                recommendations.push({
                    category: 'Rate Control',
                    medication: 'Metoprolol',
                    startingDose: '25mg BID',
                    targetDose: '50-100mg BID',
                    titration: 'Increase by 25mg BID every 1-2 weeks',
                    monitoring: 'Check resting HR, target <110 bpm (lenient) or <80 bpm (strict)',
                    contraindications: 'Severe bradycardia, heart block'
                });
                
                if (crCl > 50) {
                    recommendations.push({
                        category: 'Anticoagulation',
                        medication: 'Apixaban',
                        startingDose: '5mg BID',
                        targetDose: '5mg BID',
                        titration: 'Reduce to 2.5mg BID if age ≥80, weight ≤60kg, or creatinine ≥1.5',
                        monitoring: 'No routine monitoring required',
                        contraindications: 'Severe renal dysfunction (CrCl <15), active bleeding'
                    });
                } else {
                    recommendations.push({
                        category: 'Anticoagulation',
                        medication: 'Warfarin',
                        startingDose: '5mg daily',
                        targetDose: 'Variable (target INR 2.0-3.0)',
                        titration: 'Adjust based on INR monitoring',
                        monitoring: 'Check INR daily until stable, then 2-3 times weekly',
                        contraindications: 'High bleeding risk, patient non-compliance'
                    });
                }
                break;
                
            default:
                recommendations.push({
                    category: 'General',
                    medication: 'Consult guidelines',
                    startingDose: 'Individualized',
                    targetDose: 'Based on clinical response',
                    titration: 'Slow and careful titration',
                    monitoring: 'Close clinical monitoring required',
                    contraindications: 'Patient-specific assessment needed'
                });
        }
        
        return recommendations;
    }

    displayDosingRecommendations(recommendations, crCl) {
        const resultsDiv = document.getElementById('dosing-results');
        
        let html = `
            <div class="mb-6 p-4 bg-clinical-blue text-white rounded-lg">
                <h4 class="font-semibold mb-2">Calculated Parameters</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>Creatinine Clearance: <span class="font-mono">${crCl} mL/min</span></div>
                    <div>Kidney Function: <span class="font-semibold">${this.getKidneyFunction(crCl)}</span></div>
                </div>
            </div>
        `;
        
        recommendations.forEach((rec, index) => {
            html += `
                <div class="medication-tier first-line p-4 mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-semibold text-deep-navy">${rec.category}</h4>
                        <span class="text-sm bg-success-green text-white px-2 py-1 rounded">${rec.medication}</span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong class="text-neutral-slate">Starting Dose:</strong>
                            <p class="text-deep-navy">${rec.startingDose}</p>
                        </div>
                        <div>
                            <strong class="text-neutral-slate">Target Dose:</strong>
                            <p class="text-deep-navy">${rec.targetDose}</p>
                        </div>
                        <div>
                            <strong class="text-neutral-slate">Titration:</strong>
                            <p class="text-deep-navy">${rec.titration}</p>
                        </div>
                        <div>
                            <strong class="text-neutral-slate">Monitoring:</strong>
                            <p class="text-deep-navy">${rec.monitoring}</p>
                        </div>
                    </div>
                    
                    ${rec.contraindications ? `
                        <div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <strong class="text-warning-amber">Special Considerations:</strong>
                            <p class="text-sm text-neutral-slate mt-1">${rec.contraindications}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        resultsDiv.innerHTML = html;
        
        // Animate results
        anime({
            targets: '#dosing-results',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    getKidneyFunction(crCl) {
        if (crCl >= 90) return 'Normal';
        if (crCl >= 60) return 'Mild impairment';
        if (crCl >= 30) return 'Moderate impairment';
        if (crCl >= 15) return 'Severe impairment';
        return 'End-stage kidney disease';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'warning' ? 'bg-warning-amber' : 
                       type === 'error' ? 'bg-alert-coral' : 'bg-clinical-blue';
        
        notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Medication interaction checker (simplified)
    checkDrugInteractions(medications) {
        const interactions = [];
        const medicationList = medications.map(med => med.toLowerCase());
        
        // Common drug interactions
        if (medicationList.includes('warfarin') && medicationList.includes('aspirin')) {
            interactions.push({
                severity: 'high',
                description: 'Increased bleeding risk with warfarin + aspirin combination'
            });
        }
        
        if (medicationList.includes('digoxin') && medicationList.includes('furosemide')) {
            interactions.push({
                severity: 'moderate',
                description: 'Hypokalemia may increase digoxin toxicity risk'
            });
        }
        
        if (medicationList.includes('lisinopril') && medicationList.includes('spironolactone')) {
            interactions.push({
                severity: 'moderate',
                description: 'Increased risk of hyperkalemia with ACE inhibitor + MRA'
            });
        }
        
        return interactions;
    }

    // Generate monitoring schedule
    generateMonitoringSchedule(medications, crCl) {
        const schedule = [];
        
        // Standard monitoring for HF medications
        if (medications.some(med => med.category.includes('ACE Inhibitor'))) {
            schedule.push({
                parameter: 'Creatinine and Potassium',
                frequency: '1-2 weeks after each dose change, then every 6 months',
                target: 'Creatinine <2.5mg/dL, Potassium <5.5mEq/L'
            });
        }
        
        if (medications.some(med => med.category.includes('Beta-Blocker'))) {
            schedule.push({
                parameter: 'Heart Rate and Blood Pressure',
                frequency: 'With each dose change, then every 3-6 months',
                target: 'HR 55-60 bpm, BP appropriate for patient'
            });
        }
        
        if (medications.some(med => med.category.includes('MRA'))) {
            schedule.push({
                parameter: 'Potassium and Creatinine',
                frequency: '3 days, 1 week, 1 month, then every 3-6 months',
                target: 'Potassium <5.0mEq/L, Monitor for hyperkalemia'
            });
        }
        
        return schedule;
    }
}

// Initialize the treatment protocols
document.addEventListener('DOMContentLoaded', () => {
    window.treatmentProtocols = new TreatmentProtocols();
});