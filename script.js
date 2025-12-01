// Данные курсов (в реальном проекте можно загружать из JSON файла)
const coursesData = [
    {
        id: 1,
        title: "30-Day Phrasal Verbs Challenge",
        description: "Master essential phrasal verbs with daily practice",
        icon: "fas fa-comment-dots",
        days: 30,
        color: "#667eea",
        progress: 10
    },
    {
        id: 2,
        title: "Using 'Get' Challenge",
        description: "Learn all uses of the versatile verb 'get'",
        icon: "fas fa-bolt",
        days: 30,
        color: "#f093fb",
        progress: 0
    },
    {
        id: 3,
        title: "Articles Challenge",
        description: "Perfect your use of a/an/the and zero article",
        icon: "fas fa-file-alt",
        days: 30,
        color: "#4facfe",
        progress: 0
    },
    {
        id: 4,
        title: "Business English",
        description: "Essential vocabulary for the workplace",
        icon: "fas fa-briefcase",
        days: 30,
        color: "#43e97b",
        progress: 0
    },
    {
        id: 5,
        title: "Conversation Skills",
        description: "Improve your speaking and listening",
        icon: "fas fa-users",
        days: 30,
        color: "#fa709a",
        progress: 0
    },
    {
        id: 6,
        title: "Grammar Intensive",
        description: "Deep dive into English grammar",
        icon: "fas fa-university",
        days: 30,
        color: "#ff9a9e",
        progress: 0
    }
];

// DOM элементы
const coursesGrid = document.getElementById('courses-grid');
const courseModal = document.getElementById('course-modal');
const modalTitle = document.getElementById('modal-title');
const courseDetails = document.getElementById('course-details');
const closeBtn = document.querySelector('.close-btn');
const overallProgress = document.getElementById('overall-progress');

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
    setupEventListeners();
    updateStats();
});

// Рендеринг карточек курсов
function renderCourses() {
    coursesGrid.innerHTML = '';
    
    coursesData.forEach(course => {
        const card = createCourseCard(course);
        coursesGrid.appendChild(card);
    });
}

// Создание карточки курса
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.id = course.id;
    
    // Индикатор прогресса
    const progressBar = course.progress > 0 ? 
        `<div class="progress-container" style="margin: 15px 0; height: 6px;">
            <div class="progress-bar" style="width: ${course.progress}%; background: ${course.color};"></div>
        </div>
        <div style="text-align: center; font-size: 0.9rem; color: #666;">
            ${course.progress}% Complete
        </div>` : '';
    
    card.innerHTML = `
        <div class="course-icon" style="color: ${course.color};">
            <i class="${course.icon}"></i>
        </div>
        <h4>${course.title}</h4>
        <p class="course-description">${course.description}</p>
        ${progressBar}
        <div class="course-meta">
            <span class="course-days">
                <i class="fas fa-calendar-day"></i> ${course.days} days
            </span>
            <button class="start-btn" style="background: ${course.color};">
                ${course.progress > 0 ? 'Continue' : 'Start'} Course
            </button>
        </div>
    `;
    
    // Обработчики событий
    const startBtn = card.querySelector('.start-btn');
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCourseModal(course.id);
    });
    
    card.addEventListener('click', () => {
        openCourseModal(course.id);
    });
    
    return card;
}

// Открытие модального окна курса
function openCourseModal(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    modalTitle.textContent = course.title;
    
    // Создание деталей курса
    courseDetails.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 4rem; color: ${course.color}; margin-bottom: 20px;">
                <i class="${course.icon}"></i>
            </div>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 30px;">
                ${course.description}
            </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
            <h3 style="margin-bottom: 15px; color: #333;">
                <i class="fas fa-info-circle"></i> Course Details
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: ${course.color};">${course.days}</div>
                    <div style="color: #666;">Total Days</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: ${course.color};">${course.progress}%</div>
                    <div style="color: #666;">Your Progress</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: ${course.color};">
                        <i class="fas fa-star"></i>
                    </div>
                    <div style="color: #666;">Daily Exercises</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; color: #333;">
                <i class="fas fa-play-circle"></i> How It Works
            </h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                    <i class="fas fa-check" style="color: #43e97b; position: absolute; left: 0;"></i>
                    1 lesson per day for 30 days
                </li>
                <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                    <i class="fas fa-check" style="color: #43e97b; position: absolute; left: 0;"></i>
                    Video explanations for each topic
                </li>
                <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                    <i class="fas fa-check" style="color: #43e97b; position: absolute; left: 0;"></i>
                    Interactive exercises with instant feedback
                </li>
                <li style="padding-left: 25px; position: relative;">
                    <i class="fas fa-check" style="color: #43e97b; position: absolute; left: 0;"></i>
                    Progress tracking and certificates
                </li>
            </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="start-btn" id="start-course-btn" 
                    style="padding: 15px 40px; font-size: 1.1rem; background: ${course.color};">
                <i class="fas fa-play"></i> Start Day 1
            </button>
            ${course.progress > 0 ? `
                <button class="start-btn" id="continue-course-btn" 
                        style="padding: 15px 40px; font-size: 1.1rem; background: #6c757d; margin-left: 15px;">
                    <i class="fas fa-forward"></i> Continue (Day ${Math.ceil(course.progress/100 * 30)})
                </button>
            ` : ''}
        </div>
    `;
    
    // Обработчики для кнопок в модальном окне
    const startBtn = document.getElementById('start-course-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            alert(`Starting ${course.title}! Day 1 loading...`);
            // Здесь будет переход к первому дню курса
            courseModal.style.display = 'none';
        });
    }
    
    const continueBtn = document.getElementById('continue-course-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            const currentDay = Math.ceil(course.progress/100 * 30);
            alert(`Continuing ${course.title} at Day ${currentDay}`);
            // Здесь будет переход к текущему дню
            courseModal.style.display = 'none';
        });
    }
    
    courseModal.style.display = 'flex';
}

// Обновление статистики
function updateStats() {
    // Общий прогресс
    const totalProgress = coursesData.reduce((sum, course) => sum + course.progress, 0);
    const avgProgress = Math.round(totalProgress / coursesData.length);
    overallProgress.style.width = `${avgProgress}%`;
    
    // Обновление текста прогресса
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `${avgProgress}% Complete`;
    }
    
    // Обновление статистики
    const totalDays = coursesData.reduce((sum, course) => sum + Math.floor(course.days * course.progress/100), 0);
    const statCards = document.querySelectorAll('.stat-card h4');
    
    if (statCards[0]) statCards[0].textContent = totalDays; // Days Completed
    if (statCards[1]) statCards[1].textContent = totalDays * 3; // Exercises Done (примерно 3 упражнения в день)
    
    // Время потрачено (примерно 30 минут в день)
    const totalMinutes = totalDays * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (statCards[2]) statCards[2].textContent = `${hours}h ${minutes}m`;
    
    // Достижения
    const achievements = Math.floor(totalDays / 7); // 1 достижение за каждую неделю
    if (statCards[3]) statCards[3].textContent = achievements;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        courseModal.style.display = 'none';
    });
    
    // Закрытие модального окна по клику вне его
    window.addEventListener('click', (e) => {
        if (e.target === courseModal) {
            courseModal.style.display = 'none';
        }
    });
    
    // Закрытие модального окна по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && courseModal.style.display === 'flex') {
            courseModal.style.display = 'none';
        }
    });
    
    // Демо: обновление прогресса по клику на карточку
    coursesGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.course-card');
        if (card && e.target.tagName !== 'BUTTON') {
            const courseId = parseInt(card.dataset.id);
            const courseIndex = coursesData.findIndex(c => c.id === courseId);
            
            // Демо: увеличение прогресса при клике
            if (coursesData[courseIndex].progress < 100) {
                coursesData[courseIndex].progress += 10;
                if (coursesData[courseIndex].progress > 100) {
                    coursesData[courseIndex].progress = 100;
                }
                renderCourses();
                updateStats();
            }
        }
    });
}

// Функции для будущей интеграции с курсами
function loadCourse(courseId) {
    console.log(`Loading course ${courseId}`);
    // Здесь будет загрузка данных курса из отдельного файла
}

function saveProgress(courseId, day, score) {
    localStorage.setItem(`course_${courseId}_day_${day}`, score);
    updateStats();
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { coursesData, updateStats, loadCourse, saveProgress };
}
