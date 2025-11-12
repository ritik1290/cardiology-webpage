// Diagnostic Tools JavaScript
// Interactive ECG simulator, risk calculators, and clinical decision support

class DiagnosticTools {
    constructor() {
        this.ecgAnimation = null;
        this.currentRhythm = 'normal-sinus';
        this.currentHeartRate = 75;
        this.currentLead = 'II';
        this.isPlaying = false;
        
        this.init();
    }

    init() {
        this.initializeNavigation();
        this.initializeECGSimulator();
        this.initializeRiskCalculators();
        this.initializeFlowcharts();
        this.initializeBiomarkerInterpreter();
    }

    initializeNavigation() {
        const navButtons = document.querySelectorAll('.tool-nav-btn');
        const sections = document.querySelectorAll('.tool-section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                
                // Update navigation
                navButtons.forEach(btn => {
                    btn.classList.remove('text-clinical-blue', 'font-semibold', 'border-b-2', 'border-clinical-blue');
                    btn.classList.add('text-neutral-slate');
                });
                button.classList.add('text-clinical-blue', 'font-semibold', 'border-b-2', 'border-clinical-blue');
                button.classList.remove('text-neutral-slate');
                
                // Show target section
                sections.forEach(section => {
                    section.classList.add('hidden');
                });
                document.getElementById(target).classList.remove('hidden');
            });
        });
    }

    initializeECGSimulator() {
        const rhythmSelector = document.getElementById('rhythm-selector');
        const heartRateSlider = document.getElementById('heart-rate-slider');
        const heartRateDisplay = document.getElementById('heart-rate-display');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const analyzeRhythmBtn = document.getElementById('analyze-rhythm-btn');
        const leadButtons = document.querySelectorAll('.lead-btn');

        if (rhythmSelector) {
            rhythmSelector.addEventListener('change', (e) => {
                this.currentRhythm = e.target.value;
                this.updateECGDisplay();
            });
        }

        if (heartRateSlider) {
            heartRateSlider.addEventListener('input', (e) => {
                this.currentHeartRate = parseInt(e.target.value);
                heartRateDisplay.textContent = this.currentHeartRate;
                this.updateECGDisplay();
            });
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.toggleECGAnimation();
            });
        }

        if (analyzeRhythmBtn) {
            analyzeRhythmBtn.addEventListener('click', () => {
                this.analyzeCurrentRhythm();
            });
        }

        leadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                leadButtons.forEach(btn => {
                    btn.classList.remove('bg-clinical-blue', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-neutral-slate');
                });
                e.target.classList.add('bg-clinical-blue', 'text-white');
                e.target.classList.remove('bg-gray-200', 'text-neutral-slate');
                
                this.currentLead = e.target.dataset.lead;
                this.updateECGDisplay();
            });
        });

        // Initialize ECG display
        this.updateECGDisplay();
    }

    generateECGWaveform(rhythm, heartRate) {
        const width = 800;
        const height = 400;
        const centerY = height / 2;
        
        let path = `M 0 ${centerY}`;
        
        // Calculate timing based on heart rate
        const rrInterval = 60 / heartRate; // seconds
        const samplesPerRR = 100;
        const totalSamples = 300;
        
        switch (rhythm) {
            case 'normal-sinus':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    if (phase < 0.1) { // P wave
                        y = centerY - 20 * Math.sin(phase * Math.PI / 0.1);
                    } else if (phase < 0.2) { // PR segment
                        y = centerY;
                    } else if (phase < 0.35) { // QRS complex
                        if (phase < 0.22) y = centerY - 15; // Q wave
                        else if (phase < 0.28) y = centerY + 80; // R wave
                        else if (phase < 0.32) y = centerY - 30; // S wave
                        else y = centerY; // Return to baseline
                    } else if (phase < 0.55) { // ST segment
                        y = centerY;
                    } else if (phase < 0.85) { // T wave
                        y = centerY - 25 * Math.sin((phase - 0.55) * Math.PI / 0.3);
                    } else { // Return to baseline
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'atrial-fibrillation':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    // Irregular baseline (fibrillation waves)
                    y += 5 * Math.sin(i * 0.1) * Math.random();
                    
                    if (phase < 0.35) { // QRS complex (irregular timing)
                        if (phase < 0.05) y = centerY - 10;
                        else if (phase < 0.15) y = centerY + 70;
                        else if (phase < 0.25) y = centerY - 20;
                        else y = centerY;
                    } else if (phase < 0.7) { // ST segment and T wave
                        if (phase < 0.5) y = centerY;
                        else y = centerY - 20 * Math.sin((phase - 0.5) * Math.PI / 0.2);
                    } else {
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'sinus-tachycardia':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % (samplesPerRR * 0.7)) / (samplesPerRR * 0.7); // Faster rate (tachycardia)
                    let y = centerY;
                    
                    if (phase < 0.08) { // P wave - smaller
                        y = centerY - 15 * Math.sin(phase * Math.PI / 0.08);
                    } else if (phase < 0.18) { // PR segment
                        y = centerY;
                    } else if (phase < 0.32) { // QRS complex
                        if (phase < 0.2) y = centerY - 12;
                        else if (phase < 0.25) y = centerY + 70;
                        else if (phase < 0.3) y = centerY - 25;
                        else y = centerY;
                    } else if (phase < 0.5) { // ST segment
                        y = centerY;
                    } else if (phase < 0.78) { // T wave - smaller
                        y = centerY - 20 * Math.sin((phase - 0.5) * Math.PI / 0.28);
                    } else {
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'sinus-bradycardia':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % (samplesPerRR * 1.5)) / (samplesPerRR * 1.5); // Slower rate (bradycardia)
                    let y = centerY;
                    
                    if (phase < 0.15) { // P wave - larger spacing
                        y = centerY - 25 * Math.sin(phase * Math.PI / 0.15);
                    } else if (phase < 0.25) { // PR segment
                        y = centerY;
                    } else if (phase < 0.4) { // QRS complex
                        if (phase < 0.28) y = centerY - 18;
                        else if (phase < 0.35) y = centerY + 85;
                        else if (phase < 0.39) y = centerY - 35;
                        else y = centerY;
                    } else if (phase < 0.6) { // ST segment
                        y = centerY;
                    } else if (phase < 0.9) { // T wave
                        y = centerY - 30 * Math.sin((phase - 0.6) * Math.PI / 0.3);
                    } else {
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'atrial-flutter':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    // Sawtooth flutter waves in atrial region
                    if (phase < 0.3) {
                        y = centerY - 30 * Math.sin(phase * Math.PI * 4);
                    } else if (phase < 0.35) { // Narrow QRS
                        y = centerY + 60;
                    } else if (phase < 0.4) {
                        y = centerY - 20;
                    } else {
                        y = centerY + 20 * Math.sin((phase - 0.4) * Math.PI / 0.6);
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'ventricular-tachycardia':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % (samplesPerRR * 0.6)) / (samplesPerRR * 0.6); // Faster rate
                    let y = centerY;
                    
                    if (phase < 0.4) { // Wide QRS complex
                        if (phase < 0.05) y = centerY - 20;
                        else if (phase < 0.2) y = centerY + 100;
                        else if (phase < 0.35) y = centerY - 40;
                        else y = centerY;
                    } else if (phase < 0.8) { // ST segment and T wave
                        if (phase < 0.6) y = centerY;
                        else y = centerY - 30 * Math.sin((phase - 0.6) * Math.PI / 0.2);
                    } else {
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'ventricular-fibrillation':
                for (let i = 0; i < totalSamples; i++) {
                    let y = centerY + (Math.random() - 0.5) * 80; // Chaotic baseline
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'first-degree-avb':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    if (phase < 0.15) { // P wave
                        y = centerY - 20 * Math.sin(phase * Math.PI / 0.15);
                    } else if (phase < 0.35) { // Prolonged PR interval
                        y = centerY;
                    } else if (phase < 0.5) { // QRS complex
                        if (phase < 0.38) y = centerY - 15;
                        else if (phase < 0.43) y = centerY + 75;
                        else if (phase < 0.48) y = centerY - 28;
                        else y = centerY;
                    } else if (phase < 0.7) { // ST segment
                        y = centerY;
                    } else if (phase < 1) { // T wave
                        y = centerY - 25 * Math.sin((phase - 0.7) * Math.PI / 0.3);
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'second-degree-avb':
                for (let i = 0; i < totalSamples; i++) {
                    const cycle = i % (samplesPerRR * 3); // Every 3rd beat dropped
                    const phase = cycle / samplesPerRR;
                    let y = centerY;
                    
                    if (cycle > samplesPerRR * 2) { // Dropped beat - flat line
                        y = centerY;
                    } else if (phase < 0.1) {
                        y = centerY - 20 * Math.sin(phase * Math.PI / 0.1);
                    } else if (phase < 0.2) {
                        y = centerY;
                    } else if (phase < 0.35) {
                        if (phase < 0.22) y = centerY - 15;
                        else if (phase < 0.28) y = centerY + 80;
                        else if (phase < 0.32) y = centerY - 30;
                        else y = centerY;
                    } else if (phase < 0.55) {
                        y = centerY;
                    } else if (phase < 0.85) {
                        y = centerY - 25 * Math.sin((phase - 0.55) * Math.PI / 0.3);
                    } else {
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'third-degree-avb':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    if (phase < 0.2) { // P wave independent
                        y = centerY - 15 * Math.sin(phase * Math.PI / 0.2);
                    } else if (phase < 0.4) { // Independent P waves
                        y = centerY;
                    } else if (phase < 0.6) { // Escape rhythm QRS
                        if (phase < 0.45) y = centerY + 50;
                        else if (phase < 0.55) y = centerY - 25;
                        else y = centerY;
                    } else {
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'premature-ventricular':
                for (let i = 0; i < totalSamples; i++) {
                    const position = i / totalSamples;
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    if (position < 0.5) { // Normal beats
                        if (phase < 0.1) y = centerY - 20 * Math.sin(phase * Math.PI / 0.1);
                        else if (phase < 0.35) {
                            if (phase < 0.22) y = centerY - 15;
                            else if (phase < 0.28) y = centerY + 80;
                            else if (phase < 0.32) y = centerY - 30;
                            else y = centerY;
                        } else if (phase < 0.85) {
                            y = centerY - 25 * Math.sin((phase - 0.55) * Math.PI / 0.3);
                        }
                    } else { // PVC - wide, abnormal
                        if (phase < 0.3) y = centerY + 100;
                        else if (phase < 0.5) y = centerY - 50;
                        else y = centerY - 20 * Math.sin((phase - 0.5) * Math.PI / 0.5);
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            case 'supraventricular-tachycardia':
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % (samplesPerRR * 0.5)) / (samplesPerRR * 0.5); // Very fast rate
                    let y = centerY;
                    
                    if (phase < 0.3) { // Short PR interval
                        if (phase < 0.05) y = centerY - 10 * Math.sin(phase * Math.PI / 0.05);
                        else y = centerY;
                    } else if (phase < 0.45) { // Narrow QRS
                        if (phase < 0.35) y = centerY + 65;
                        else if (phase < 0.42) y = centerY - 25;
                        else y = centerY;
                    } else { // Rapid repeat
                        y = centerY - 15 * Math.sin((phase - 0.45) * Math.PI / 0.55);
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
                
            default:
                // Generate normal sinus rhythm as default
                for (let i = 0; i < totalSamples; i++) {
                    const phase = (i % samplesPerRR) / samplesPerRR;
                    let y = centerY;
                    
                    if (phase < 0.1) { // P wave
                        y = centerY - 20 * Math.sin(phase * Math.PI / 0.1);
                    } else if (phase < 0.2) { // PR segment
                        y = centerY;
                    } else if (phase < 0.35) { // QRS complex
                        if (phase < 0.22) y = centerY - 15; // Q wave
                        else if (phase < 0.28) y = centerY + 80; // R wave
                        else if (phase < 0.32) y = centerY - 30; // S wave
                        else y = centerY; // Return to baseline
                    } else if (phase < 0.55) { // ST segment
                        y = centerY;
                    } else if (phase < 0.85) { // T wave
                        y = centerY - 25 * Math.sin((phase - 0.55) * Math.PI / 0.3);
                    } else { // Return to baseline
                        y = centerY;
                    }
                    
                    path += ` L ${(i / totalSamples) * width} ${y}`;
                }
                break;
        }
        
        return path;
    }

    updateECGDisplay() {
        const ecgPath = document.getElementById('ecg-path');
        if (ecgPath) {
            const waveform = this.generateECGWaveform(this.currentRhythm, this.currentHeartRate);
            ecgPath.setAttribute('d', waveform);
            
            // If animation is playing, restart it with the new waveform
            if (this.isPlaying) {
                // Stop current animation
                if (this.ecgAnimation) {
                    this.ecgAnimation.pause();
                }
                
                // Restart animation with new path
                this.restartECGAnimation();
            }
        }
    }

    toggleECGAnimation() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const ecgPath = document.getElementById('ecg-path');
        const ecgSvg = document.getElementById('ecg-svg');
        
        if (this.isPlaying) {
            // Stop animation
            if (this.ecgAnimation) {
                this.ecgAnimation.pause();
            }
            playPauseBtn.innerHTML = '▶ Play ECG';
            playPauseBtn.classList.remove('bg-alert-coral');
            playPauseBtn.classList.add('bg-success-green');
            this.isPlaying = false;
        } else {
            // Start animation
            // Calculate the path length for stroke-dasharray
            const pathLength = ecgPath.getTotalLength();
            
            // Set up the stroke-dasharray for animation
            ecgPath.setAttribute('stroke-dasharray', pathLength);
            ecgPath.setAttribute('stroke-dashoffset', pathLength);
            
            this.ecgAnimation = anime({
                targets: ecgPath,
                strokeDashoffset: [pathLength, 0],
                duration: 4000,
                easing: 'linear',
                loop: true,
                complete: () => {
                    // Reset for next loop
                    if (this.isPlaying) {
                        anime({
                            targets: ecgPath,
                            strokeDashoffset: [pathLength, 0],
                            duration: 4000,
                            easing: 'linear',
                            loop: true
                        });
                    }
                }
            });
            
            playPauseBtn.innerHTML = '⏸ Pause ECG';
            playPauseBtn.classList.remove('bg-success-green');
            playPauseBtn.classList.add('bg-alert-coral');
            this.isPlaying = true;
        }
    }

    restartECGAnimation() {
        const ecgPath = document.getElementById('ecg-path');
        
        // Force browser reflow to ensure path data is updated
        void ecgPath.offsetWidth;
        
        const pathLength = ecgPath.getTotalLength();
        
        // Reset stroke-dasharray and strokeDashoffset
        ecgPath.setAttribute('stroke-dasharray', pathLength);
        ecgPath.setAttribute('stroke-dashoffset', pathLength);
        
        // Create new animation with updated path length
        this.ecgAnimation = anime({
            targets: ecgPath,
            strokeDashoffset: [pathLength, 0],
            duration: 4000,
            easing: 'linear',
            loop: true
        });
    }

    analyzeCurrentRhythm() {
        const analysisDiv = document.getElementById('rhythm-analysis');
        const contentDiv = document.getElementById('analysis-content');
        
        const rhythmAnalysis = {
            'normal-sinus': {
                name: 'Normal Sinus Rhythm',
                rate: this.currentHeartRate,
                characteristics: [
                    'Regular P waves preceding each QRS complex',
                    'Normal PR interval (0.12-0.20 seconds)',
                    'Normal QRS duration (&lt;0.12 seconds)',
                    'Consistent P wave morphology',
                    'Heart rate 60-100 bpm'
                ],
                clinical: 'Normal cardiac rhythm requiring no intervention.'
            },
            'sinus-tachycardia': {
                name: 'Sinus Tachycardia',
                rate: this.currentHeartRate,
                characteristics: [
                    'Regular P waves preceding each QRS complex',
                    'Normal PR interval',
                    'Normal QRS duration',
                    'Heart rate &gt;100 bpm',
                    'Gradual onset and termination'
                ],
                clinical: 'Often physiologic response to stress, exercise, or illness. Consider underlying causes.'
            },
            'atrial-fibrillation': {
                name: 'Atrial Fibrillation',
                rate: this.currentHeartRate,
                characteristics: [
                    'Irregularly irregular rhythm',
                    'No distinct P waves',
                    'Fibrillatory baseline',
                    'Variable QRS morphology',
                    'Chaotic atrial activity'
                ],
                clinical: 'Requires anticoagulation assessment and rate/rhythm control consideration.'
            },
            'ventricular-tachycardia': {
                name: 'Ventricular Tachycardia',
                rate: this.currentHeartRate,
                characteristics: [
                    'Wide QRS complexes (&gt;0.12 seconds)',
                    'Heart rate typically 100-250 bpm',
                    'AV dissociation may be present',
                    'Capture beats possible',
                    'Fusion beats may occur'
                ],
                clinical: 'Medical emergency requiring immediate intervention and possible cardioversion.'
            }
        };
        
        const analysis = rhythmAnalysis[this.currentRhythm] || rhythmAnalysis['normal-sinus'];
        
        contentDiv.innerHTML = `
            <div class="mb-4">
                <h5 class="font-semibold text-deep-navy mb-2">${analysis.name}</h5>
                <p class="text-sm text-neutral-slate mb-2">Heart Rate: ${analysis.rate} bpm</p>
            </div>
            
            <div class="mb-4">
                <h6 class="font-medium text-deep-navy mb-2">ECG Characteristics:</h6>
                <ul class="text-sm text-neutral-slate space-y-1">
                    ${analysis.characteristics.map(char => `<li>• ${char}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h6 class="font-medium text-deep-navy mb-2">Clinical Significance:</h6>
                <p class="text-sm text-neutral-slate">${analysis.clinical}</p>
            </div>
        `;
        
        analysisDiv.classList.remove('hidden');
        
        // Animate the analysis panel
        anime({
            targets: analysisDiv,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    initializeRiskCalculators() {
        // ASCVD Risk Calculator
        const calculateAscvdBtn = document.getElementById('calculate-ascvd');
        if (calculateAscvdBtn) {
            calculateAscvdBtn.addEventListener('click', () => {
                this.calculateASCVD();
            });
        }

        // CHADS2-VASc Calculator
        const calculateChadsBtn = document.getElementById('calculate-chads');
        if (calculateChadsBtn) {
            calculateChadsBtn.addEventListener('click', () => {
                this.calculateCHADS2VASc();
            });
        }

        // BNP Interpreter
        const interpretBnpBtn = document.getElementById('interpret-bnp');
        if (interpretBnpBtn) {
            interpretBnpBtn.addEventListener('click', () => {
                this.interpretBNP();
            });
        }
    }

    calculateASCVD() {
        const age = parseInt(document.getElementById('ascvd-age').value);
        const gender = document.getElementById('ascvd-gender').value;
        const totalCholesterol = parseInt(document.getElementById('ascvd-tc').value);
        const hdlCholesterol = parseInt(document.getElementById('ascvd-hdl').value);
        const systolicBP = parseInt(document.getElementById('ascvd-sbp').value);
        const diabetes = document.getElementById('ascvd-diabetes').value === 'yes';
        const smoking = document.getElementById('ascvd-smoking').value === 'yes';
        const bpTreatment = document.getElementById('ascvd-bp-tx').value === 'yes';

        // Validate inputs
        if (!age || !gender || !totalCholesterol || !hdlCholesterol || !systolicBP) {
            alert('Please fill in all required fields');
            return;
        }

        // Simplified ASCVD risk calculation (for demonstration)
        // In practice, this would use the full Pooled Cohort Equations
        let riskPoints = 0;
        
        // Age points
        if (gender === 'male') {
            if (age >= 40 && age <= 44) riskPoints += 0;
            else if (age >= 45 && age <= 49) riskPoints += 3;
            else if (age >= 50 && age <= 54) riskPoints += 6;
            else if (age >= 55 && age <= 59) riskPoints += 8;
            else if (age >= 60 && age <= 64) riskPoints += 10;
            else if (age >= 65 && age <= 69) riskPoints += 11;
            else if (age >= 70 && age <= 74) riskPoints += 12;
            else if (age >= 75) riskPoints += 13;
        } else {
            if (age >= 40 && age <= 44) riskPoints += 0;
            else if (age >= 45 && age <= 49) riskPoints += 3;
            else if (age >= 50 && age <= 54) riskPoints += 6;
            else if (age >= 55 && age <= 59) riskPoints += 8;
            else if (age >= 60 && age <= 64) riskPoints += 10;
            else if (age >= 65 && age <= 69) riskPoints += 12;
            else if (age >= 70 && age <= 74) riskPoints += 14;
            else if (age >= 75) riskPoints += 16;
        }

        // Additional risk factors
        if (totalCholesterol > 240) riskPoints += 3;
        else if (totalCholesterol > 200) riskPoints += 1;
        
        if (hdlCholesterol < 40) riskPoints += 2;
        else if (hdlCholesterol < 50) riskPoints += 1;
        
        if (systolicBP > 140) riskPoints += 2;
        else if (systolicBP > 130) riskPoints += 1;
        
        if (diabetes) riskPoints += 4;
        if (smoking) riskPoints += 3;
        if (bpTreatment) riskPoints += 1;

        // Calculate estimated risk percentage
        let riskPercentage = 0;
        if (riskPoints <= 0) riskPercentage = 0.5;
        else if (riskPoints <= 4) riskPercentage = 1.0;
        else if (riskPoints <= 6) riskPercentage = 2.0;
        else if (riskPoints <= 8) riskPercentage = 4.0;
        else if (riskPoints <= 10) riskPercentage = 7.0;
        else if (riskPoints <= 12) riskPercentage = 12.0;
        else if (riskPoints <= 14) riskPercentage = 20.0;
        else riskPercentage = 30.0;

        // Display results
        document.getElementById('ascvd-risk-percent').textContent = `${riskPercentage}%`;
        
        let riskCategory = '';
        if (riskPercentage < 5) riskCategory = 'Low Risk';
        else if (riskPercentage < 7.5) riskCategory = 'Borderline Risk';
        else if (riskPercentage < 20) riskCategory = 'Intermediate Risk';
        else riskCategory = 'High Risk';
        
        document.getElementById('ascvd-risk-category').textContent = riskCategory;
        document.getElementById('ascvd-risk-category').className = `text-sm font-semibold ${
            riskPercentage < 5 ? 'text-success-green' : 
            riskPercentage < 7.5 ? 'text-warning-amber' : 
            riskPercentage < 20 ? 'text-imaging-orange' : 'text-alert-coral'
        }`;
        
        document.getElementById('ascvd-result').classList.remove('hidden');
        
        // Animate result
        anime({
            targets: '#ascvd-result',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    calculateCHADS2VASc() {
        let score = 0;
        
        const age = parseInt(document.getElementById('chads-age').value);
        const gender = document.getElementById('chads-gender').value;
        
        // Age scoring
        if (age >= 75) score += 2;
        else if (age >= 65) score += 1;
        
        // Clinical risk factors
        if (document.getElementById('chads-chf').checked) score += 1;
        if (document.getElementById('chads-hypertension').checked) score += 1;
        if (document.getElementById('chads-diabetes').checked) score += 1;
        if (document.getElementById('chads-stroke-tia').checked) score += 2;
        if (document.getElementById('chads-vascular-disease').checked) score += 1;
        
        // Female gender adds 1 point if age ≥65 or other risk factors present
        if (gender === 'female' && (age >= 65 || score > 0)) score += 1;

        // Display results
        document.getElementById('chads-score').textContent = score;
        
        let recommendation = '';
        if (score === 0) {
            recommendation = 'Low risk. Antithrombotic therapy not recommended.';
        } else if (score === 1) {
            recommendation = 'Moderate risk. Consider anticoagulation or aspirin.';
        } else {
            recommendation = 'High risk. Anticoagulation recommended unless contraindicated.';
        }
        
        document.getElementById('chads-recommendation').textContent = recommendation;
        document.getElementById('chads-recommendation').className = `text-sm ${
            score === 0 ? 'text-success-green' : 
            score === 1 ? 'text-warning-amber' : 'text-alert-coral'
        }`;
        
        document.getElementById('chads-result').classList.remove('hidden');
        
        // Animate result
        anime({
            targets: '#chads-result',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    interpretBNP() {
        const bnpLevel = parseFloat(document.getElementById('bnp-level').value);
        const ntProbnpLevel = parseFloat(document.getElementById('nt-probnp-level').value);
        const ageGroup = document.getElementById('bnp-age-group').value;
        
        let interpretation = '';
        
        if (bnpLevel) {
            if (bnpLevel < 100) {
                interpretation += 'BNP: Normal (&lt;100 pg/mL). Heart failure unlikely.\n';
            } else if (bnpLevel < 400) {
                interpretation += 'BNP: Elevated (100-400 pg/mL). Heart failure possible.\n';
            } else {
                interpretation += 'BNP: High (&gt;400 pg/mL). Heart failure likely.\n';
            }
        }
        
        if (ntProbnpLevel) {
            let threshold = 125; // Default for <50 years
            if (ageGroup === '50-75') threshold = 450;
            else if (ageGroup === '>75') threshold = 900;
            
            if (ntProbnpLevel < threshold) {
                interpretation += `NT-proBNP: Normal (&lt;${threshold} pg/mL). Heart failure unlikely.\n`;
            } else {
                interpretation += `NT-proBNP: Elevated (&gt;${threshold} pg/mL). Heart failure likely.\n`;
            }
        }
        
        if (!interpretation) {
            interpretation = 'Please enter at least one biomarker value for interpretation.';
        }
        
        document.getElementById('bnp-interpretation').textContent = interpretation;
        document.getElementById('bnp-result').classList.remove('hidden');
        
        // Animate result
        anime({
            targets: '#bnp-result',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    initializeFlowcharts() {
        const flowchartNodes = document.querySelectorAll('.flowchart-node');
        const explanationDiv = document.getElementById('flowchart-explanation');
        const contentDiv = document.getElementById('explanation-content');
        
        const stepExplanations = {
            '1': {
                title: 'Initial Assessment',
                content: 'Patient presents with chest pain. Immediate evaluation of vital signs, pain characteristics, and cardiac risk factors.'
            },
            '2': {
                title: 'High Risk Features',
                content: 'Assess for high-risk features: chest pain at rest, recent onset, radiation to arm/jaw, associated symptoms (dyspnea, nausea, diaphoresis).'
            },
            '3': {
                title: 'Low Risk Assessment',
                content: 'Low-risk chest pain can be evaluated with outpatient stress testing or coronary CT angiography if needed.'
            },
            '4': {
                title: 'Diagnostic Testing',
                content: 'Immediate ECG and cardiac troponin measurement to assess for acute coronary syndrome.'
            },
            '5': {
                title: 'STEMI/NSTEMI Management',
                content: 'If STEMI: immediate reperfusion therapy. If NSTEMI: risk stratification and appropriate intervention.'
            },
            '6': {
                title: 'Alternative Diagnoses',
                content: 'Consider other causes: pulmonary embolism, aortic dissection, pericarditis, gastroesophageal reflux.'
            }
        };
        
        flowchartNodes.forEach(node => {
            node.addEventListener('click', () => {
                const step = node.dataset.step;
                const explanation = stepExplanations[step];
                
                if (explanation) {
                    contentDiv.innerHTML = `
                        <h5 class="font-semibold text-deep-navy mb-2">${explanation.title}</h5>
                        <p class="text-sm text-neutral-slate">${explanation.content}</p>
                    `;
                    explanationDiv.classList.remove('hidden');
                    
                    // Animate explanation
                    anime({
                        targets: explanationDiv,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
    }

    initializeBiomarkerInterpreter() {
        // Troponin Interpreter
        const interpretTroponinBtn = document.getElementById('interpret-troponin');
        if (interpretTroponinBtn) {
            interpretTroponinBtn.addEventListener('click', () => {
                this.interpretTroponin();
            });
        }

        // Lipid Panel Interpreter
        const interpretLipidsBtn = document.getElementById('interpret-lipids');
        if (interpretLipidsBtn) {
            interpretLipidsBtn.addEventListener('click', () => {
                this.interpretLipids();
            });
        }
    }

    interpretTroponin() {
        const troponinI = parseFloat(document.getElementById('troponin-i').value);
        const troponinT = parseFloat(document.getElementById('troponin-t').value);
        const symptomOnset = parseFloat(document.getElementById('symptom-onset').value);
        
        let interpretation = '';
        
        if (troponinI) {
            if (troponinI < 0.04) {
                interpretation += '<strong>Troponin I:</strong> Normal (&lt;0.04 ng/mL). ';
                interpretation += 'Myocardial infarction unlikely, but consider clinical context and timing.\n\n';
            } else if (troponinI < 10) {
                interpretation += '<strong>Troponin I:</strong> Elevated. ';
                interpretation += 'Suggestive of myocardial injury. Consider MI, myocarditis, or other causes.\n\n';
            } else {
                interpretation += '<strong>Troponin I:</strong> Markedly elevated. ';
                interpretation += 'High likelihood of significant myocardial injury.\n\n';
            }
        }
        
        if (troponinT) {
            if (troponinT < 0.01) {
                interpretation += '<strong>Troponin T:</strong> Normal (&lt;0.01 ng/mL). ';
                interpretation += 'Myocardial infarction unlikely.\n\n';
            } else if (troponinT < 1) {
                interpretation += '<strong>Troponin T:</strong> Elevated. ';
                interpretation += 'Suggestive of myocardial injury.\n\n';
            } else {
                interpretation += '<strong>Troponin T:</strong> Markedly elevated. ';
                interpretation += 'High likelihood of significant myocardial injury.\n\n';
            }
        }
        
        if (symptomOnset) {
            interpretation += `<strong>Timing Considerations:</strong> ${symptomOnset} hours since symptom onset. `;
            if (symptomOnset < 3) {
                interpretation += 'Early presentation - consider serial troponins. ';
            } else if (symptomOnset > 12) {
                interpretation += 'Late presentation - troponin may be declining. ';
            }
        }
        
        if (!interpretation) {
            interpretation = 'Please enter at least one troponin value for interpretation.';
        }
        
        document.getElementById('troponin-interpretation').innerHTML = interpretation;
        document.getElementById('troponin-result').classList.remove('hidden');
        
        // Animate result
        anime({
            targets: '#troponin-result',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    interpretLipids() {
        const totalCholesterol = parseFloat(document.getElementById('total-cholesterol').value);
        const ldlCholesterol = parseFloat(document.getElementById('ldl-cholesterol').value);
        const hdlCholesterol = parseFloat(document.getElementById('hdl-cholesterol').value);
        const triglycerides = parseFloat(document.getElementById('triglycerides').value);
        
        let interpretation = '';
        
        if (totalCholesterol) {
            if (totalCholesterol < 200) {
                interpretation += '<strong>Total Cholesterol:</strong> Desirable (&lt;200 mg/dL). ';
            } else if (totalCholesterol < 240) {
                interpretation += '<strong>Total Cholesterol:</strong> Borderline high (200-239 mg/dL). ';
            } else {
                interpretation += '<strong>Total Cholesterol:</strong> High (≥240 mg/dL). ';
            }
        }
        
        if (ldlCholesterol) {
            interpretation += '<br><br>';
            if (ldlCholesterol < 100) {
                interpretation += '<strong>LDL Cholesterol:</strong> Optimal (&lt;100 mg/dL). ';
            } else if (ldlCholesterol < 130) {
                interpretation += '<strong>LDL Cholesterol:</strong> Near optimal (100-129 mg/dL). ';
            } else if (ldlCholesterol < 160) {
                interpretation += '<strong>LDL Cholesterol:</strong> Borderline high (130-159 mg/dL). ';
            } else if (ldlCholesterol < 190) {
                interpretation += '<strong>LDL Cholesterol:</strong> High (160-189 mg/dL). ';
            } else {
                interpretation += '<strong>LDL Cholesterol:</strong> Very high (≥190 mg/dL). ';
            }
        }
        
        if (hdlCholesterol) {
            interpretation += '<br><br>';
            if (hdlCholesterol < 40) {
                interpretation += '<strong>HDL Cholesterol:</strong> Low (&lt;40 mg/dL). Major risk factor. ';
            } else if (hdlCholesterol < 50) {
                interpretation += '<strong>HDL Cholesterol:</strong> Acceptable (40-49 mg/dL). ';
            } else if (hdlCholesterol < 60) {
                interpretation += '<strong>HDL Cholesterol:</strong> Good (50-59 mg/dL). ';
            } else {
                interpretation += '<strong>HDL Cholesterol:</strong> Excellent (≥60 mg/dL). Protective factor. ';
            }
        }
        
        if (triglycerides) {
            interpretation += '<br><br>';
            if (triglycerides < 150) {
                interpretation += '<strong>Triglycerides:</strong> Normal (&lt;150 mg/dL). ';
            } else if (triglycerides < 200) {
                interpretation += '<strong>Triglycerides:</strong> Borderline high (150-199 mg/dL). ';
            } else if (triglycerides < 500) {
                interpretation += '<strong>Triglycerides:</strong> High (200-499 mg/dL). ';
            } else {
                interpretation += '<strong>Triglycerides:</strong> Very high (≥500 mg/dL). ';
            }
        }
        
        // Calculate non-HDL cholesterol if possible
        if (totalCholesterol && hdlCholesterol) {
            const nonHDL = totalCholesterol - hdlCholesterol;
            interpretation += `<br><br><strong>Non-HDL Cholesterol:</strong> ${nonHDL} mg/dL. `;
            interpretation += nonHDL < 130 ? 'Optimal.' : 'Elevated.';
        }
        
        if (!interpretation) {
            interpretation = 'Please enter at least one lipid value for interpretation.';
        }
        
        document.getElementById('lipids-interpretation').innerHTML = interpretation;
        document.getElementById('lipids-result').classList.remove('hidden');
        
        // Animate result
        anime({
            targets: '#lipids-result',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }
}

// Initialize the diagnostic tools
document.addEventListener('DOMContentLoaded', () => {
    window.diagnosticTools = new DiagnosticTools();
});