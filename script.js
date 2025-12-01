document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для кнопок "Start Course"
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseTitle = this.closest('.course-card').querySelector('h2').textContent;
            alert(`Starting "${courseTitle}"\n(This is a demo - in a real app, this would start the course)`);
        });
    });

    // Обработчики для кнопок уроков на странице курса
    const lessonButtons = document.querySelectorAll('.lesson-button');
    lessonButtons.forEach(button => {
        if (!button.closest('.lesson-item').style.opacity) {
            button.addEventListener('click', function() {
                const lessonTitle = this.closest('.lesson-item').querySelector('.lesson-title').textContent;
                alert(`Starting "${lessonTitle}"\n(This is a demo - in a real app, this would open the lesson)`);
            });
        }
    });

    // Анимация кругов прогресса
    const progressCircles = document.querySelectorAll('.circle-fill');
    progressCircles.forEach(circle => {
        const currentTransform = circle.style.transform;
        circle.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            circle.style.transform = currentTransform;
        }, 300);
    });
});
