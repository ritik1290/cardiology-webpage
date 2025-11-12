// Research Page JavaScript
// Interactive research filtering, trial search, and timeline functionality

class ResearchPage {
    constructor() {
        this.researchData = [];
        this.filteredResearch = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadResearchData();
        this.initializeFilters();
        this.initializeTrialSearch();
        this.initializeAnimations();
    }

    loadResearchData() {
        // Comprehensive research database
        this.researchData = [
            {
                id: 'sglt2-universal',
                title: 'SGLT2 Inhibitors Across All Heart Failure Phenotypes',
                type: 'breakthrough',
                journal: 'New England Journal of Medicine',
                date: '2024-12-15',
                impact: 'Practice-changing',
                description: 'Comprehensive meta-analysis demonstrating consistent benefit of SGLT2 inhibitors across the full spectrum of ejection fraction.',
                keyFindings: [
                    '25% reduction in cardiovascular mortality',
                    '30% reduction in heart failure hospitalizations',
                    'Consistent benefit across EF 15-70%',
                    'Benefits evident within 30 days'
                ],
                clinicalImpact: 'Universal recommendation for all heart failure patients regardless of ejection fraction',
                nctId: null,
                phase: null,
                estimatedCompletion: null
            },
            {
                id: 'ai-ecg-detection',
                title: 'AI-Enhanced ECG Interpretation for Early Detection',
                type: 'clinical-trial',
                journal: 'Lancet Digital Health',
                date: '2024-11-20',
                impact: 'Revolutionary potential',
                description: 'Machine learning algorithm demonstrates 94% accuracy in detecting left ventricular dysfunction from standard ECGs.',
                keyFindings: [
                    '94.2% sensitivity for LV dysfunction detection',
                    '91.8% specificity',
                    'AUC of 0.96',
                    'Outperforms expert cardiologists (87% accuracy)'
                ],
                clinicalImpact: 'FDA breakthrough device designation granted for clinical implementation',
                nctId: 'NCT05678901',
                phase: 'Phase III',
                estimatedCompletion: 'Completed'
            },
            {
                id: 'crispr-fh-trial',
                title: 'CRISPR Gene Therapy for Familial Hypercholesterolemia',
                type: 'clinical-trial',
                journal: 'Nature Medicine',
                date: '2024-11-10',
                impact: 'Revolutionary potential',
                description: 'First-in-human trial of in vivo CRISPR editing shows 70% reduction in LDL-C in patients with homozygous FH.',
                keyFindings: [
                    '70% reduction in LDL-C levels',
                    'Single injection provides sustained benefit',
                    'No serious adverse events reported',
                    'Sustained effect at 12 months'
                ],
                clinicalImpact: 'Potential single-dose cure for genetic hypercholesterolemia',
                nctId: 'NCT05398061',
                phase: 'Phase I/II',
                estimatedCompletion: '2026'
            },
            {
                id: 'bioresorbable-stent',
                title: 'First Bioresorbable Coronary Stent Approved',
                type: 'breakthrough',
                journal: 'Journal of the American College of Cardiology',
                date: '2024-09-25',
                impact: 'Interventional milestone',
                description: 'FDA approves first fully bioresorbable coronary stent that dissolves after 2 years, leaving no permanent implant.',
                keyFindings: [
                    'Complete dissolution at 24 months',
                    'Equivalent outcomes to drug-eluting stents',
                    'Restored vasomotor function',
                    'No late stent thrombosis'
                ],
                clinicalImpact: 'Milestone in interventional cardiology with potential for improved long-term outcomes',
                nctId: null,
                phase: null,
                estimatedCompletion: 'Approved'
            },
            {
                id: 'af-guidelines-2024',
                title: 'Updated Atrial Fibrillation Management Guidelines',
                type: 'guideline',
                journal: 'Circulation',
                date: '2024-10-15',
                impact: 'Standard of care update',
                description: 'ACC/AHA/HRS release comprehensive AF guidelines incorporating new anticoagulants and digital health integration.',
                keyFindings: [
                    'Updated CHA₂DS₂-VASc scoring recommendations',
                    'DOAC preference over warfarin',
                    'Catheter ablation expanded indications',
                    'Digital health integration strategies'
                ],
                clinicalImpact: 'Updated standard of care for atrial fibrillation management',
                nctId: null,
                phase: null,
                estimatedCompletion: 'Published'
            },
            {
                id: 'stem-cell-hf',
                title: 'Mesenchymal Stem Cells for Heart Failure',
                type: 'clinical-trial',
                journal: 'European Heart Journal',
                date: '2024-08-30',
                impact: 'Moderate',
                description: 'Phase II trial of intravenous mesenchymal stem cells in patients with chronic heart failure.',
                keyFindings: [
                    'Improved exercise tolerance',
                    'Reduced inflammatory markers',
                    'Enhanced quality of life scores',
                    'Favorable safety profile'
                ],
                clinicalImpact: 'Promising results warrant larger Phase III trials',
                nctId: 'NCT04567890',
                phase: 'Phase II',
                estimatedCompletion: '2025'
            }
        ];

        this.filteredResearch = [...this.researchData];
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.research-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.applyFilter(filter);
                
                // Update button states
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-clinical-blue', 'text-white');
                    btn.classList.add('text-neutral-slate', 'hover:bg-gray-100');
                });
                button.classList.add('active', 'bg-clinical-blue', 'text-white');
                button.classList.remove('text-neutral-slate', 'hover:bg-gray-100');
            });
        });
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredResearch = [...this.researchData];
        } else {
            this.filteredResearch = this.researchData.filter(item => item.type === filter);
        }
        
        this.renderResearch();
    }

    renderResearch() {
        // This would render research items in a grid or list
        // For now, we'll just log the filtered results
        console.log(`Showing ${this.filteredResearch.length} research items for filter: ${this.currentFilter}`);
        
        // Animate research cards
        const researchCards = document.querySelectorAll('.research-card');
        if (researchCards.length > 0) {
            anime({
                targets: researchCards,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 500,
                easing: 'easeOutCubic'
            });
        }
    }

    initializeTrialSearch() {
        const searchBtn = document.getElementById('search-trials');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchTrials();
            });
        }
    }

    searchTrials() {
        const condition = document.getElementById('trial-condition').value;
        const phase = document.getElementById('trial-phase').value;
        const intervention = document.getElementById('trial-intervention').value;
        
        // Mock trial database
        const trials = this.getMockTrials();
        
        // Filter trials based on search criteria
        let filteredTrials = trials.filter(trial => {
            if (condition && trial.condition !== condition) return false;
            if (phase && trial.phase !== phase) return false;
            if (intervention && trial.intervention !== intervention) return false;
            return true;
        });
        
        this.displayTrialResults(filteredTrials);
    }

    getMockTrials() {
        return [
            {
                title: 'EMPACT-MI',
                nctId: 'NCT04509674',
                condition: 'heart-failure',
                phase: 'phase-3',
                intervention: 'medication',
                description: 'Empagliflozin in patients with acute myocardial infarction and high risk of heart failure',
                completion: '2025',
                enrollment: 5300,
                sites: 300
            },
            {
                title: 'CRISPR-FH',
                nctId: 'NCT05398061',
                condition: 'dyslipidemia',
                phase: 'phase-1',
                intervention: 'medication',
                description: 'In vivo CRISPR gene editing for homozygous familial hypercholesterolemia',
                completion: '2026',
                enrollment: 40,
                sites: 8
            },
            {
                title: 'AUGUSTUS-AF',
                nctId: 'NCT05142751',
                condition: 'atrial-fibrillation',
                phase: 'phase-3',
                intervention: 'medication',
                description: 'Apixaban vs. warfarin in patients with atrial fibrillation and recent ACS/PCI',
                completion: '2025',
                enrollment: 4800,
                sites: 250
            },
            {
                title: 'REVIVED-BCIS2',
                nctId: 'NCT04847331',
                condition: 'coronary-disease',
                phase: 'phase-3',
                intervention: 'procedure',
                description: 'PCI vs. medical therapy in patients with severe ischemic cardiomyopathy',
                completion: '2024',
                enrollment: 700,
                sites: 40
            },
            {
                title: 'DIGITAL-AF',
                nctId: 'NCT05234567',
                condition: 'atrial-fibrillation',
                phase: 'phase-2',
                intervention: 'digital',
                description: 'AI-powered mobile health intervention for atrial fibrillation management',
                completion: '2025',
                enrollment: 200,
                sites: 10
            },
            {
                title: 'STEM-CELL-HF',
                nctId: 'NCT04567890',
                condition: 'heart-failure',
                phase: 'phase-2',
                intervention: 'medication',
                description: 'Mesenchymal stem cells for chronic heart failure treatment',
                completion: '2025',
                enrollment: 150,
                sites: 15
            }
        ];
    }

    displayTrialResults(trials) {
        const resultsDiv = document.getElementById('trial-results');
        
        if (trials.length === 0) {
            resultsDiv.innerHTML = `
                <div class="text-center py-8 text-neutral-slate">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"/>
                    </svg>
                    <p>No trials found matching your criteria</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        trials.forEach(trial => {
            html += `
                <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-deep-navy">${trial.title}</h4>
                        <span class="trial-badge">${trial.phase.toUpperCase()}</span>
                    </div>
                    <p class="text-sm text-neutral-slate mb-3">${trial.description}</p>
                    <div class="grid grid-cols-2 gap-4 text-xs text-neutral-slate mb-3">
                        <div>
                            <strong>NCT:</strong> ${trial.nctId}
                        </div>
                        <div>
                            <strong>Enrollment:</strong> ${trial.enrollment.toLocaleString()} patients
                        </div>
                        <div>
                            <strong>Sites:</strong> ${trial.sites} centers
                        </div>
                        <div>
                            <strong>Completion:</strong> ${trial.completion}
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-gray-100 text-neutral-slate px-2 py-1 rounded">
                            ${this.getConditionLabel(trial.condition)}
                        </span>
                        <button class="text-clinical-blue hover:text-blue-700 font-semibold text-xs">
                            View Details →
                        </button>
                    </div>
                </div>
            `;
        });
        
        resultsDiv.innerHTML = html;
        
        // Animate results
        anime({
            targets: '#trial-results',
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }

    getConditionLabel(condition) {
        const labels = {
            'heart-failure': 'Heart Failure',
            'coronary-disease': 'Coronary Artery Disease',
            'atrial-fibrillation': 'Atrial Fibrillation',
            'hypertension': 'Hypertension',
            'dyslipidemia': 'Dyslipidemia'
        };
        return labels[condition] || condition;
    }

    initializeAnimations() {
        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 600,
                        easing: 'easeOutCubic'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            observer.observe(item);
        });

        // Animate research cards on hover
        const researchCards = document.querySelectorAll('.research-card');
        researchCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    // Research impact calculator
    calculateResearchImpact(researchItem) {
        let impactScore = 0;
        
        // Journal impact factor (simplified)
        const journalImpact = {
            'New England Journal of Medicine': 10,
            'Lancet': 9,
            'Circulation': 8,
            'Journal of the American College of Cardiology': 8,
            'European Heart Journal': 7,
            'Nature Medicine': 9
        };
        
        impactScore += journalImpact[researchItem.journal] || 5;
        
        // Study type weighting
        const typeWeights = {
            'breakthrough': 3,
            'clinical-trial': 2,
            'meta-analysis': 2,
            'guideline': 3
        };
        
        impactScore *= typeWeights[researchItem.type] || 1;
        
        // Recency factor
        const daysSincePublication = (new Date() - new Date(researchItem.date)) / (1000 * 60 * 60 * 24);
        const recencyFactor = Math.max(0.5, 1 - (daysSincePublication / 365));
        impactScore *= recencyFactor;
        
        return Math.round(impactScore);
    }

    // Generate research recommendations
    generateRecommendations(userInterests) {
        const recommendations = [];
        
        // Score research items based on user interests
        this.researchData.forEach(item => {
            let relevanceScore = 0;
            
            // Check if research matches user interests
            userInterests.forEach(interest => {
                if (item.title.toLowerCase().includes(interest.toLowerCase()) ||
                    item.description.toLowerCase().includes(interest.toLowerCase())) {
                    relevanceScore += 2;
                }
            });
            
            // Add impact score
            relevanceScore += this.calculateResearchImpact(item);
            
            if (relevanceScore > 5) {
                recommendations.push({
                    item: item,
                    score: relevanceScore
                });
            }
        });
        
        // Sort by relevance score
        return recommendations.sort((a, b) => b.score - a.score).slice(0, 5);
    }

    // Create research alert
    createResearchAlert(researchItem) {
        const alert = {
            id: Date.now(),
            title: `New Research: ${researchItem.title}`,
            summary: researchItem.description.substring(0, 100) + '...',
            type: researchItem.type,
            date: new Date(),
            read: false,
            priority: this.calculateResearchImpact(researchItem) > 20 ? 'high' : 'medium'
        };
        
        // Store alert (would typically save to database)
        const alerts = JSON.parse(localStorage.getItem('researchAlerts') || '[]');
        alerts.unshift(alert);
        
        // Keep only last 50 alerts
        if (alerts.length > 50) {
            alerts.splice(50);
        }
        
        localStorage.setItem('researchAlerts', JSON.stringify(alerts));
        
        return alert;
    }

    // Get research statistics
    getResearchStats() {
        const stats = {
            total: this.researchData.length,
            breakthrough: this.researchData.filter(item => item.type === 'breakthrough').length,
            clinicalTrials: this.researchData.filter(item => item.type === 'clinical-trial').length,
            metaAnalyses: this.researchData.filter(item => item.type === 'meta-analysis').length,
            guidelines: this.researchData.filter(item => item.type === 'guideline').length,
            thisMonth: this.researchData.filter(item => {
                const itemDate = new Date(item.date);
                const now = new Date();
                return itemDate.getMonth() === now.getMonth() && 
                       itemDate.getFullYear() === now.getFullYear();
            }).length
        };
        
        return stats;
    }

    // Export research data
    exportResearchData(format = 'json') {
        const data = {
            timestamp: new Date().toISOString(),
            totalItems: this.researchData.length,
            research: this.researchData,
            stats: this.getResearchStats()
        };
        
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'csv') {
            // Simple CSV export
            let csv = 'Title,Type,Journal,Date,Impact,Description\n';
            this.researchData.forEach(item => {
                csv += `"${item.title}","${item.type}","${item.journal}","${item.date}","${item.impact}","${item.description}"\n`;
            });
            return csv;
        }
        
        return null;
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-success-green' : 
                       type === 'warning' ? 'bg-warning-amber' : 
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
}

// Initialize the research page
document.addEventListener('DOMContentLoaded', () => {
    window.researchPage = new ResearchPage();
    
    // Add some interactive features
    const readMoreButtons = document.querySelectorAll('button[class*="Learn More"], button[class*="View Details"]');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.researchPage.showNotification('Full research details would open in a new window', 'info');
        });
    });
    
    // Add export functionality
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Research Data';
    exportBtn.className = 'fixed bottom-6 right-6 bg-clinical-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-40';
    exportBtn.addEventListener('click', () => {
        const data = window.researchPage.exportResearchData('json');
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cardiovascular-research-data.json';
        a.click();
        URL.revokeObjectURL(url);
        
        window.researchPage.showNotification('Research data exported successfully', 'success');
    });
    
    document.body.appendChild(exportBtn);
});