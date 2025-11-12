// Comprehensive Cardiology Resource - Main JavaScript
// Professional medical reference with interactive features

class CardiologyResource {
    constructor() {
        this.disorders = [];
        this.filteredDisorders = [];
        this.searchIndex = {};
        this.init();
    }

    init() {
        this.loadDisorders();
        this.initializeSearch();
        this.initializeFilters();
        this.initializeAnimations();
        this.renderDisorders();
        this.setupEventListeners();
    }

    loadDisorders() {
        // Comprehensive cardiac disorders database
        this.disorders = [
            {
                id: 'coronary-artery-disease',
                name: 'Coronary Artery Disease',
                category: 'Ischemic Heart Disease',
                prevalence: 'Very Common',
                severity: 'High',
                symptoms: ['chest-pain', 'dyspnea', 'fatigue', 'palpitations'],
                riskFactors: ['age', 'hypertension', 'diabetes', 'smoking', 'family-history', 'obesity'],
                diagnostics: ['ecg', 'stress-test', 'cardiac-cath', 'ct-angiogram'],
                treatments: ['medications', 'intervention', 'surgery', 'lifestyle'],
                description: 'Atherosclerotic narrowing of coronary arteries leading to myocardial ischemia. Includes stable angina, acute coronary syndromes, and silent ischemia.',
                incidence: '6.2% of adults (18.2 million)',
                mortality: '365,000 deaths annually',
                image: 'resources/coronary_disease.png',
                color: 'clinical-blue'
            },
            {
                id: 'heart-failure',
                name: 'Heart Failure',
                category: 'Cardiomyopathy',
                prevalence: 'Common',
                severity: 'High',
                symptoms: ['dyspnea', 'fatigue', 'edema', 'orthopnea'],
                riskFactors: ['hypertension', 'diabetes', 'age', 'coronary-disease'],
                diagnostics: ['echocardiogram', 'ecg', 'bnp', 'chest-xray'],
                treatments: ['medications', 'devices', 'lifestyle'],
                description: 'Complex clinical syndrome resulting from structural or functional cardiac abnormalities that impair ventricular filling or ejection.',
                incidence: '6.5 million adults (2.7%)',
                mortality: '86,000 deaths annually',
                image: 'resources/heart_failure.png',
                color: 'alert-coral'
            },
            {
                id: 'atrial-fibrillation',
                name: 'Atrial Fibrillation',
                category: 'Arrhythmia',
                prevalence: 'Common',
                severity: 'Moderate',
                symptoms: ['palpitations', 'dyspnea', 'fatigue', 'syncope'],
                riskFactors: ['age', 'hypertension', 'heart-disease', 'thyroid-disease'],
                diagnostics: ['ecg', 'holter', 'echocardiogram'],
                treatments: ['medications', 'intervention', 'devices'],
                description: 'Most common sustained cardiac arrhythmia characterized by disorganized atrial electrical activity and irregular ventricular response.',
                incidence: '2.7-6.1 million adults',
                mortality: 'Stroke risk 5x higher',
                image: 'resources/afib.png',
                color: 'warning-amber'
            },
            {
                id: 'hypertension',
                name: 'Hypertension',
                category: 'Vascular Disease',
                prevalence: 'Very Common',
                severity: 'Moderate',
                symptoms: ['headache', 'dizziness', 'chest-pain'],
                riskFactors: ['age', 'obesity', 'smoking', 'family-history', 'sedentary'],
                diagnostics: ['blood-pressure', 'ecg', 'echocardiogram', 'labs'],
                treatments: ['medications', 'lifestyle'],
                description: 'Persistent elevation of systolic blood pressure ≥140 mmHg or diastolic blood pressure ≥90 mmHg. Major risk factor for cardiovascular disease.',
                incidence: '108 million adults (45%)',
                mortality: 'Primary contributor to CVD deaths',
                image: 'resources/hypertension.png',
                color: 'diagnostic-teal'
            },
            {
                id: 'valvular-disease',
                name: 'Valvular Heart Disease',
                category: 'Structural Heart Disease',
                prevalence: 'Common',
                severity: 'Moderate-High',
                symptoms: ['dyspnea', 'chest-pain', 'syncope', 'fatigue'],
                riskFactors: ['age', 'rheumatic-fever', 'congenital', 'infective-endocarditis'],
                diagnostics: ['echocardiogram', 'cardiac-cath', 'ct', 'mri'],
                treatments: ['medications', 'intervention', 'surgery'],
                description: 'Disorders affecting cardiac valves including stenosis, regurgitation, or mixed lesions. Can affect any of the four heart valves.',
                incidence: '2.5% of population',
                mortality: 'Variable by valve and severity',
                image: 'resources/valvular_disease.png',
                color: 'cardiac-purple'
            },
            {
                id: 'cardiomyopathy',
                name: 'Cardiomyopathy',
                category: 'Cardiomyopathy',
                prevalence: 'Uncommon',
                severity: 'High',
                symptoms: ['dyspnea', 'fatigue', 'edema', 'palpitations'],
                riskFactors: ['genetic', 'hypertension', 'alcohol', 'viral-infection'],
                diagnostics: ['echocardiogram', 'mri', 'genetic-testing', 'biopsy'],
                treatments: ['medications', 'devices', 'surgery', 'lifestyle'],
                description: 'Diseases of heart muscle with structural and functional abnormalities. Classified as dilated, hypertrophic, restrictive, or arrhythmogenic.',
                incidence: '1 in 500 adults',
                mortality: 'Variable by type and stage',
                image: 'resources/cardiomyopathy.png',
                color: 'imaging-orange'
            },
            {
                id: 'peripheral-artery-disease',
                name: 'Peripheral Artery Disease',
                category: 'Vascular Disease',
                prevalence: 'Common',
                severity: 'Moderate',
                symptoms: ['claudication', 'limb-pain', 'wounds', 'cold-extremities'],
                riskFactors: ['smoking', 'diabetes', 'hypertension', 'age', 'dyslipidemia'],
                diagnostics: ['ankle-brachial-index', 'duplex-ultrasound', 'angiography'],
                treatments: ['medications', 'intervention', 'lifestyle', 'surgery'],
                description: 'Atherosclerotic narrowing of peripheral arteries, most commonly affecting lower extremities. Strong predictor of systemic atherosclerosis.',
                incidence: '6.8 million adults >40 years',
                mortality: 'Increased cardiovascular mortality',
                image: 'resources/pad.png',
                color: 'biomarker-rose'
            },
            {
                id: 'congenital-heart-disease',
                name: 'Congenital Heart Disease',
                category: 'Structural Heart Disease',
                prevalence: 'Uncommon',
                severity: 'Variable',
                symptoms: ['cyanosis', 'dyspnea', 'poor-growth', 'heart-murmur'],
                riskFactors: ['genetic', 'maternal-diabetes', 'maternal-infection', 'teratogens'],
                diagnostics: ['echocardiogram', 'cardiac-cath', 'ct', 'mri'],
                treatments: ['medications', 'intervention', 'surgery'],
                description: 'Structural heart defects present at birth. Range from simple lesions to complex cyanotic conditions requiring lifelong management.',
                incidence: '1% of live births',
                mortality: 'Variable by lesion complexity',
                image: 'resources/chd.png',
                color: 'success-green'
            },
            {
                id: 'aortic-disease',
                name: 'Aortic Disease',
                category: 'Vascular Disease',
                prevalence: 'Uncommon',
                severity: 'High',
                symptoms: ['chest-pain', 'back-pain', 'syncope', 'hoarseness'],
                riskFactors: ['hypertension', 'connective-tissue-disorders', 'atherosclerosis', 'trauma'],
                diagnostics: ['ct-angiogram', 'mri', 'transesophageal-echo', 'aortography'],
                treatments: ['medications', 'surgery', 'intervention'],
                description: 'Conditions affecting the aorta including aneurysms, dissections, and coarctation. Life-threatening emergencies require immediate intervention.',
                incidence: 'Variable by condition',
                mortality: 'High for acute dissection',
                image: 'resources/aortic_disease.png',
                color: 'alert-coral'
            },
            {
                id: 'pulmonary-embolism',
                name: 'Pulmonary Embolism',
                category: 'Thrombotic Disease',
                prevalence: 'Uncommon',
                severity: 'High',
                symptoms: ['dyspnea', 'chest-pain', 'hemoptysis', 'syncope'],
                riskFactors: ['immobility', 'surgery', 'cancer', 'pregnancy', 'thrombophilia'],
                diagnostics: ['ct-pulmonary-angiogram', 'd-dimer', 'ventilation-perfusion-scan'],
                treatments: ['anticoagulation', 'thrombolysis', 'intervention'],
                description: 'Obstruction of pulmonary arteries by thrombotic material, most commonly from deep vein thrombosis. Medical emergency requiring prompt diagnosis and treatment.',
                incidence: '1 in 1000 adults annually',
                mortality: 'High if untreated',
                image: 'resources/pe.png',
                color: 'warning-amber'
            },
            {
                id: 'deep-vein-thrombosis',
                name: 'Deep Vein Thrombosis',
                category: 'Thrombotic Disease',
                prevalence: 'Common',
                severity: 'Moderate',
                symptoms: ['leg-swelling', 'pain', 'warmth', 'erythema'],
                riskFactors: ['immobility', 'surgery', 'cancer', 'pregnancy', 'oral-contraceptives'],
                diagnostics: ['duplex-ultrasound', 'd-dimer', 'venography'],
                treatments: ['anticoagulation', 'compression', 'intervention'],
                description: 'Thrombus formation in deep venous system, most commonly lower extremities. Major risk factor for pulmonary embolism.',
                incidence: '1-3 per 1000 adults annually',
                mortality: 'Low with treatment',
                image: 'resources/dvt.png',
                color: 'clinical-blue'
            },
            {
                id: 'myocarditis',
                name: 'Myocarditis',
                category: 'Inflammatory Heart Disease',
                prevalence: 'Rare',
                severity: 'High',
                symptoms: ['chest-pain', 'dyspnea', 'palpitations', 'fatigue'],
                riskFactors: ['viral-infection', 'autoimmune', 'toxins', 'drugs'],
                diagnostics: ['ecg', 'troponin', 'echocardiogram', 'cardiac-mri', 'biopsy'],
                treatments: ['medications', 'supportive-care', 'immunosuppression'],
                description: 'Inflammation of myocardium typically caused by viral infections. Can present as acute heart failure or mimic myocardial infarction.',
                incidence: '1-10 per 100,000 annually',
                mortality: 'Variable by etiology',
                image: 'resources/myocarditis.png',
                color: 'diagnostic-teal'
            },
            {
                id: 'pericarditis',
                name: 'Pericarditis',
                category: 'Inflammatory Heart Disease',
                prevalence: 'Uncommon',
                severity: 'Low-Moderate',
                symptoms: ['chest-pain', 'pericardial-friction-rub', 'fever', 'dyspnea'],
                riskFactors: ['viral-infection', 'autoimmune', 'renal-failure', 'post-mi'],
                diagnostics: ['ecg', 'echocardiogram', 'chest-xray', 'inflammatory-markers'],
                treatments: ['medications', 'pericardiocentesis', 'surgery'],
                description: 'Inflammation of pericardium characterized by chest pain and pericardial friction rub. Can be acute, recurrent, or chronic.',
                incidence: '1 per 1000 hospital admissions',
                mortality: 'Generally low',
                image: 'resources/pericarditis.png',
                color: 'success-green'
            },
            {
                id: 'endocarditis',
                name: 'Infective Endocarditis',
                category: 'Infectious Heart Disease',
                prevalence: 'Rare',
                severity: 'High',
                symptoms: ['fever', 'heart-murmur', 'embolic-phenomena', 'immunologic-phenomena'],
                riskFactors: ['valvular-disease', 'prosthetic-valves', 'iv-drug-use', 'dental-procedures'],
                diagnostics: ['blood-cultures', 'echocardiogram', 'duke-criteria'],
                treatments: ['antibiotics', 'surgery', 'supportive-care'],
                description: 'Infection of endocardium typically involving heart valves. Characterized by bacteremia, valvular vegetations, and systemic emboli.',
                incidence: '3-10 per 100,000 annually',
                mortality: '15-25% despite treatment',
                image: 'resources/endocarditis.png',
                color: 'alert-coral'
            }
        ];

        this.filteredDisorders = [...this.disorders];
        this.buildSearchIndex();
    }

    buildSearchIndex() {
        this.disorders.forEach(disorder => {
            const searchableText = [
                disorder.name,
                disorder.category,
                disorder.description,
                ...disorder.symptoms,
                ...disorder.riskFactors,
                ...disorder.diagnostics,
                ...disorder.treatments
            ].join(' ').toLowerCase();
            
            this.searchIndex[disorder.id] = searchableText;
        });
    }

    initializeSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchToggle = document.getElementById('search-toggle');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = document.getElementById('search-close');

        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                searchOverlay.classList.remove('hidden');
                searchInput.focus();
            });
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchOverlay.classList.add('hidden');
                searchInput.value = '';
                searchResults.innerHTML = '';
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value, searchResults);
            });
        }

        // Close overlay on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
                searchOverlay.classList.add('hidden');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });
    }

    performSearch(query, resultsContainer) {
        if (!query.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }

        const results = this.disorders.filter(disorder => {
            return this.searchIndex[disorder.id].includes(query.toLowerCase());
        });

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-neutral-slate text-center py-4">No results found. Try different search terms.</p>';
            return;
        }

        resultsContainer.innerHTML = results.map(disorder => `
            <div class="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onclick="window.location.href='disorders/${disorder.id}.html'">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-semibold text-deep-navy">${disorder.name}</h4>
                        <p class="text-sm text-neutral-slate">${disorder.category}</p>
                        <p class="text-xs text-gray-500 mt-1">${disorder.description.substring(0, 100)}...</p>
                    </div>
                    <div class="text-right">
                        <span class="inline-block px-2 py-1 text-xs rounded-full bg-${disorder.color} text-white">
                            ${disorder.prevalence}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    initializeFilters() {
        const applyFiltersBtn = document.getElementById('apply-filters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }
    }

    applyFilters() {
        const symptomFilter = document.getElementById('symptom-filter')?.value || '';
        const riskFilter = document.getElementById('risk-filter')?.value || '';
        const diagnosticFilter = document.getElementById('diagnostic-filter')?.value || '';
        const treatmentFilter = document.getElementById('treatment-filter')?.value || '';

        this.filteredDisorders = this.disorders.filter(disorder => {
            const matchesSymptom = !symptomFilter || disorder.symptoms.includes(symptomFilter);
            const matchesRisk = !riskFilter || disorder.riskFactors.includes(riskFilter);
            const matchesDiagnostic = !diagnosticFilter || disorder.diagnostics.includes(diagnosticFilter);
            const matchesTreatment = !treatmentFilter || disorder.treatments.includes(treatmentFilter);

            return matchesSymptom && matchesRisk && matchesDiagnostic && matchesTreatment;
        });

        this.renderDisorders();
        
        // Show filter results
        const resultsCount = this.filteredDisorders.length;
        const totalCount = this.disorders.length;
        
        // Scroll to disorders section
        document.getElementById('disorders').scrollIntoView({ behavior: 'smooth' });
        
        // Show notification
        this.showNotification(`Showing ${resultsCount} of ${totalCount} disorders matching your filters.`);
    }

    renderDisorders() {
        const grid = document.getElementById('disorders-grid');
        if (!grid) return;

        if (this.filteredDisorders.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 text-neutral-slate mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"/>
                    </svg>
                    <h3 class="text-xl font-semibold text-deep-navy mb-2">No disorders found</h3>
                    <p class="text-neutral-slate">Try adjusting your filters to see more results.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredDisorders.map(disorder => `
            <div class="disorder-card bg-white rounded-2xl p-6 shadow-lg border border-gray-200 cursor-pointer" onclick="window.location.href='disorders/${disorder.id}.html'">
                <div class="flex items-center justify-between mb-4">
                    <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-${disorder.color} text-white">
                        ${disorder.category}
                    </span>
                    <span class="text-sm text-neutral-slate">${disorder.prevalence}</span>
                </div>
                
                <div class="mb-4">
                    <img src="${disorder.image}" alt="${disorder.name}" class="w-full h-32 object-cover rounded-lg mb-4" onerror="this.style.display='none'">
                    <h3 class="text-xl font-playfair font-bold text-deep-navy mb-2">${disorder.name}</h3>
                    <p class="text-sm text-neutral-slate mb-4">${disorder.description.substring(0, 120)}...</p>
                </div>
                
                <div class="space-y-2 mb-4">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-neutral-slate">Incidence:</span>
                        <span class="font-semibold text-deep-navy">${disorder.incidence}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-neutral-slate">Mortality:</span>
                        <span class="font-semibold text-deep-navy">${disorder.mortality}</span>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-1 mb-4">
                    ${disorder.symptoms.slice(0, 3).map(symptom => `
                        <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-neutral-slate rounded">${symptom.replace('-', ' ')}</span>
                    `).join('')}
                    ${disorder.symptoms.length > 3 ? `<span class="text-xs text-neutral-slate">+${disorder.symptoms.length - 3} more</span>` : ''}
                </div>
                
                <div class="pt-4 border-t border-gray-200">
                    <button class="w-full bg-${disorder.color} hover:opacity-90 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300">
                        View Details →
                    </button>
                </div>
            </div>
        `).join('');

        // Animate disorder cards
        this.animateDisorderCards();
    }

    animateDisorderCards() {
        const cards = document.querySelectorAll('.disorder-card');
        
        anime({
            targets: cards,
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutCubic'
        });
    }

    initializeAnimations() {
        // Animate stats counters
        const statsCounters = document.querySelectorAll('.stats-counter');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsCounters.forEach(counter => {
            observer.observe(counter);
        });

        // Animate hero text
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            Splitting({ target: heroText, by: 'chars' });
            
            anime({
                targets: '.hero-text .char',
                translateY: [100, 0],
                opacity: [0, 1],
                delay: anime.stagger(50),
                duration: 1000,
                easing: 'easeOutCubic'
            });
        }
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle (if needed)
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                document.getElementById('search-toggle').click();
            }
        });
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-success-green text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
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
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Utility functions for other pages
    static getDisorderById(id) {
        const cardiologyResource = new CardiologyResource();
        return cardiologyResource.disorders.find(disorder => disorder.id === id);
    }

    static getAllDisorders() {
        const cardiologyResource = new CardiologyResource();
        return cardiologyResource.disorders;
    }

    static searchDisorders(query) {
        const cardiologyResource = new CardiologyResource();
        return cardiologyResource.disorders.filter(disorder => {
            return cardiologyResource.searchIndex[disorder.id].includes(query.toLowerCase());
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.cardiologyApp = new CardiologyResource();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardiologyResource;
}