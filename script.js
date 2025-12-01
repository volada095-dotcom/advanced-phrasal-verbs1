// Данные курсов
const courses = [
    {
        id: 1,
        title: "30-Day Advanced Phrasal Verbs Challenge",
        subtitle: "Master Advanced Phrasal Verbs",
        progress: 3,
        icon: "fas fa-bolt",
        color: "linear-gradient(135deg, #667eea, #764ba2)",
        description: "Master 150+ advanced phrasal verbs used in business, academic, and everyday contexts.",
        link: "course1.html",
        status: "In Progress"
    },
    {
        id: 2,
        title: "30-Day Challenge Using 'Get'",
        subtitle: "Master All Uses of 'Get'",
        progress: 0,
        icon: "fas fa-chart-line",
        color: "linear-gradient(135deg, #f093fb, #f5576c)",
        description: "Complete guide to mastering the versatile verb 'get' in all its forms.",
        link: "#",
        status: "Not Started"
    },
    // Место для будущих курсов (3-12)
    {
        id: 3,
        title: "Business English Challenge",
        subtitle: "Professional Communication",
        progress: 0,
        icon: "fas fa-briefcase",
        color: "linear-gradient(135deg, #4facfe, #00f2fe)",
        description: "Learn essential business vocabulary and communication skills.",
        link: "#",
        status: "Coming Soon"
    },
    {
        id: 4,
        title: "Academic Writing Challenge",
        subtitle: "University-Level Writing",
        progress: 0,
        icon: "fas fa-graduation-cap",
        color: "linear-gradient(135deg, #43e97b, #38f9d7)",
        description: "Improve your academic writing for essays and research papers.",
        link: "#",
        status: "Coming Soon"
    },
    {
        id: 5,
        title: "Pronunciation Mastery",
        subtitle: "Sound Like a Native",
        progress: 0,
        icon: "fas fa-microphone-alt",
        color: "linear-gradient(135deg, #fa709a, #fee140)",
        description: "Perfect your pronunciation with daily practice exercises.",
        link: "#",
        status: "Coming Soon"
    },
    {
        id: 6,
        title: "IELTS Preparation",
        subtitle: "Score Band 7+",
        progress: 0,
        icon: "fas fa-award",
        color: "linear-gradient(135deg, #30cfd0, #330867)",
        description: "Comprehensive preparation for all IELTS test sections.",
        link: "#",
        status: "Coming Soon"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/') {
        initializeHomePage();
    } else if (currentPage.includes('course1.html')) {
        initializeCoursePage();
    }
    
    initializeModal();
});

// Инициализация главной страницы
function initializeHomePage() {
    renderCourses();
    updateOverallProgress();
}

// Отображение курсов
function renderCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Создание карточки курса
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.id = course.id;
    
    card.innerHTML = `
        <div class="course-header">
            <div class="course-icon" style="background: ${course.color}">
                <i class="${course.icon}"></i>
            </div>
            <div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-subtitle">${course.subtitle}</p>
            </div>
        </div>
        <p>${course.description}</p>
        <div class="course-status">
            <div class="status-text">Status: ${course.status}</div>
            <div class="course-progress">
                <div class="small-progress-container">
                    <div class="small-progress-bar" style="width: ${course.progress}%"></div>
                </div>
                <div>${course.progress}% Complete</div>
            </div>
        </div>
        <button class="start-btn" data-id="${course.id}">
            <i class="fas ${course.id === 1 ? 'fa-play' : 'fa-lock'}"></i>
            ${course.id === 1 ? 'Continue' : 'Start Course'}
        </button>
    `;
    
    // Добавляем обработчик клика
    const startBtn = card.querySelector('.start-btn');
    startBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (course.id === 1) {
            window.location.href = course.link;
        } else {
            showCourseDetails(course);
        }
    });
    
    card.addEventListener('click', function() {
        showCourseDetails(course);
    });
    
    return card;
}

// Показ деталей курса в модальном окне
function showCourseDetails(course) {
    const modal = document.getElementById('course-modal');
    const title = document.getElementById('modal-title');
    const details = document.getElementById('course-details');
    
    title.textContent = course.title;
    
    let buttonHTML = '';
    if (course.id === 1) {
        buttonHTML = `<a href="${course.link}" class="start-btn"><i class="fas fa-play"></i> Continue Course</a>`;
    } else if (course.status === 'Coming Soon') {
        buttonHTML = '<button class="start-btn disabled"><i class="fas fa-clock"></i> Coming Soon</button>';
    } else {
        buttonHTML = '<button class="start-btn disabled"><i class="fas fa-lock"></i> Course Locked</button>';
    }
    
    details.innerHTML = `
        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
            <div class="course-icon" style="background: ${course.color}; width: 60px; height: 60px;">
                <i class="${course.icon}" style="font-size: 1.8rem;"></i>
            </div>
            <div>
                <h3 style="margin: 0 0 5px 0;">${course.subtitle}</h3>
                <p style="color: #666;">${course.status}</p>
            </div>
        </div>
        <p style="margin-bottom: 20px;">${course.description}</p>
        <div class="progress-container">
            <div class="progress-bar" style="width: ${course.progress}%"></div>
        </div>
        <div class="progress-text" style="text-align: center; margin: 10px 0 20px 0;">${course.progress}% Complete</div>
        ${buttonHTML}
    `;
    
    modal.style.display = 'flex';
}

// Обновление общего прогресса
function updateOverallProgress() {
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;
    const progressBar = document.getElementById('overall-progress');
    const progressText = document.getElementById('overall-progress-text');
    
    if (progressBar) {
        progressBar.style.width = `${totalProgress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(totalProgress)}% Complete`;
    }
}

// Инициализация модального окна
function initializeModal() {
    const modal = document.getElementById('course-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Инициализация страницы курса
function initializeCoursePage() {
    // Обновляем прогресс-круг
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        const percent = progressCircle.dataset.percent;
        const fill = progressCircle.querySelector('.fill');
        const degree = (percent / 100) * 360;
        fill.style.transform = `rotate(${degree}deg)`;
    }
    
    // Добавляем обработчики для кнопок уроков
    const lessonButtons = document.querySelectorAll('.lesson-card:not(.locked) .start-btn');
    lessonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonType = this.querySelector('i').className.includes('video') ? 'Video' : 
                             this.querySelector('i').className.includes('edit') ? 'Exercise' : 'Speaking';
            alert(`Starting ${lessonType} Practice...\n(This is a demo - in a real app, this would launch the lesson)`);
        });
    });
}

// Анимация прогресс-баров
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .small-progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Запуск анимации при загрузке
setTimeout(animateProgressBars, 500);

// Для будущих курсов
function addFutureCourses() {
    // Эта функция будет добавлять курсы 7-12 когда они будут готовы
    console.log('Ready to add courses 7-12 when available');
}
