// THEME TOGGLE
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');

    if (!themeToggle || !icon) return;

    // Function to update icon - icon shows what mode you'll switch TO
    function updateIcon() {
        const isLight = body.classList.contains('light-mode');
        if (isLight) {
            // Light mode active - show moon icon (clicking will switch to dark)
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            // Dark mode active - show sun icon (clicking will switch to light)
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    updateIcon(); // Set initial icon

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        if (isLight) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        
        updateIcon(); // Update icon after toggle
    });
}

// READING PROGRESS INDICATOR
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// PROJECT MODALS
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const viewDetailsBtns = document.querySelectorAll('.btn-view-details');

    if (!modal || !modalBody) return;

    // Project data
    const projectData = {
        'brain-tumor': {
            title: 'Brain Tumor Classifier',
            image: './assets/images/tumor.jpg',
            tags: ['Deep Learning', 'Medical AI', 'Transfer Learning'],
            description: 'A sophisticated deep learning model that accurately classifies brain tumors from MRI scans using transfer learning techniques, achieving 97% accuracy.',
            techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'Transfer Learning'],
            challenges: 'The main challenge was handling imbalanced datasets and ensuring high accuracy for medical diagnosis. We implemented data augmentation and fine-tuned pre-trained models to achieve optimal performance.',
            results: 'Achieved 97% classification accuracy, significantly improving early detection capabilities. The model can classify multiple tumor types including glioma, meningioma, and pituitary tumors.',
            liveLink: 'https://brain-tumor-classifiers.streamlit.app/',
            githubLink: '#'
        },
        'lane-detection': {
            title: 'Lane Detection U-Net',
            image: './assets/images/lane.webp',
            tags: ['Computer Vision', 'Autonomous', 'Deep Learning'],
            description: 'A cascaded dual U-Net architecture for accurate lane detection in autonomous driving systems, achieving 96% segmentation accuracy.',
            techStack: ['Python', 'PyTorch', 'U-Net', 'Computer Vision', 'OpenCV', 'TensorFlow'],
            challenges: 'Handling various road conditions, lighting, and weather scenarios was challenging. The cascaded approach helps improve accuracy in difficult conditions.',
            results: '96% segmentation accuracy with real-time processing capabilities. Published research paper in IEEE INC4 Conference 2025.',
            liveLink: 'https://lane-detection-cascaded-unet.streamlit.app/',
            githubLink: '#'
        },
        'ich-detector': {
            title: 'ICH Detector',
            image: './assets/images/hamorrhage.jpg',
            tags: ['Attention Models', 'Healthcare', 'Deep Learning'],
            description: 'Intracranial Hemorrhage detection system using advanced attention mechanisms for accurate medical image analysis.',
            techStack: ['Python', 'TensorFlow', 'Attention Mechanisms', 'Medical Imaging', 'CNN'],
            challenges: 'Detecting subtle hemorrhages in CT scans requires high precision. The attention mechanism helps focus on critical regions.',
            results: 'High accuracy in detecting various types of intracranial hemorrhages, aiding radiologists in faster diagnosis.',
            liveLink: 'https://intracranial-hemorrhage-detector.streamlit.app/',
            githubLink: '#'
        },
        'storm-predictor': {
            title: 'Storm Predictor',
            image: './assets/images/dst.jpg',
            tags: ['Space Tech', 'NASA Data', 'Deep Learning'],
            description: 'Predicting Disturbance Storm Time (DST) indices using quadratic neurons and deep learning models trained on NASA space weather data.',
            techStack: ['Python', 'TensorFlow', 'NASA Data', 'Time Series', 'LSTM', 'Quadratic Neurons'],
            challenges: 'Space weather prediction requires handling complex time-series data and understanding solar-terrestrial relationships.',
            results: 'Accurate DST prediction helping in space weather forecasting and satellite operation planning.',
            liveLink: 'https://dst-predictor.streamlit.app/',
            githubLink: '#'
        },
        'tb-detector': {
            title: 'TB Detector',
            image: './assets/images/tuberculosis.jpg',
            tags: ['Medical AI', 'Ensemble', 'Deep Learning'],
            description: 'Ensemble-based transfer learning approach for tuberculosis detection from chest X-ray images, achieving 99% detection accuracy.',
            techStack: ['Python', 'TensorFlow', 'Ensemble Learning', 'Transfer Learning', 'Medical Imaging'],
            challenges: 'Ensuring high accuracy for TB detection while minimizing false positives and negatives in medical diagnosis.',
            results: '99% detection accuracy with ensemble architecture. Research published in IEEE INDISCON Conference 2025.',
            liveLink: 'https://tuberculosis-detector.streamlit.app/',
            githubLink: '#'
        },
        'alzheimers': {
            title: "Alzheimer's AI",
            image: './assets/images/alzheimer.jpeg',
            tags: ['Neuroscience', 'Deep Learning', 'Medical AI'],
            description: 'Staging classification system for Alzheimer\'s disease from MRI scans, achieving 97% accuracy in disease progression classification.',
            techStack: ['Python', 'TensorFlow', 'Medical Imaging', 'CNN', 'Transfer Learning'],
            challenges: 'Classifying different stages of Alzheimer\'s requires understanding subtle changes in brain structure over time.',
            results: '97% accuracy in staging classification, helping clinicians in early diagnosis and treatment planning.',
            liveLink: 'https://alzheimer-stage-classifier.streamlit.app/',
            githubLink: '#'
        }
    };

    // Open modal
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${project.title}</h2>
                <div class="modal-tags">
                    ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <img src="${project.image}" alt="${project.title}" class="modal-image" loading="lazy">
            <div class="modal-section">
                <h3>Description</h3>
                <p>${project.description}</p>
            </div>
            <div class="modal-section">
                <h3>Tech Stack</h3>
                <div class="modal-tech-stack">
                    ${project.techStack.map(tech => `<span class="modal-tech-item">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="modal-section">
                <h3>Challenges</h3>
                <p>${project.challenges}</p>
            </div>
            <div class="modal-section">
                <h3>Results</h3>
                <p>${project.results}</p>
            </div>
            <div class="modal-links">
                <a href="${project.liveLink}" target="_blank" class="modal-link">
                    <i class="fas fa-external-link-alt"></i> View Live Project
                </a>
                ${project.githubLink !== '#' ? `<a href="${project.githubLink}" target="_blank" class="modal-link secondary">
                    <i class="fab fa-github"></i> View Code
                </a>` : ''}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

