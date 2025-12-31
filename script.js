// Создание снежинок - теперь снег точно будет идти!
function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const snowflakeCount = 120; // Увеличил количество снежинок
    
    // Очищаем контейнер перед созданием новых снежинок
    snowflakesContainer.innerHTML = '';
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Случайные размеры снежинок
        const size = Math.random() * 12 + 3;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Случайная начальная позиция
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Случайная прозрачность
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Случайная длительность анимации
        const duration = Math.random() * 20 + 10;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Задержка начала анимации
        snowflake.style.animationDelay = `${Math.random() * 15}s`;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Обновлённое расписание
const scheduleData = {
    monday: {
        dayName: "Понедельник",
        lessons: [
            { time: "12:00", name: "Лепка", icon: "fas fa-hands" }
        ]
    },
    tuesday: {
        dayName: "Вторник",
        lessons: [
            { time: "14:00", name: "Адаб", icon: "fas fa-book-open" }
        ]
    },
    wednesday: {
        dayName: "Среда",
        lessons: [
            { time: "18:00", name: "История Пророков", icon: "fas fa-mosque" }
        ]
    },
    thursday: {
        dayName: "Четверг",
        lessons: [
            { time: "19:00", name: "Поделки", icon: "fas fa-paintbrush" }
        ]
    },
    friday: {
        dayName: "Пятница",
        lessons: [
            { time: "14:00", name: "Кулинария", icon: "fas fa-utensils" }
        ]
    },
    saturday: {
        dayName: "Суббота",
        lessons: [
            { time: "13:00", name: "Математика для 1 класса", icon: "fas fa-calculator" }
        ]
    },
    sunday: {
        dayName: "Воскресенье",
        lessons: [
            { time: "13:40", name: "Поделки", icon: "fas fa-cut" }
        ]
    }
};

// Иконки для каждого типа занятий
const lessonIcons = {
    "Лепка": "fas fa-hands",
    "Адаб": "fas fa-book-open",
    "История Пророков": "fas fa-mosque",
    "Поделки": "fas fa-paintbrush",
    "Кулинария": "fas fa-utensils",
    "Математика для 1 класса": "fas fa-calculator"
};

// Функция отображения расписания
function displaySchedule(day) {
    const schedule = scheduleData[day];
    const selectedDayElement = document.getElementById('selected-day');
    const scheduleContentElement = document.getElementById('schedule-content');
    
    let scheduleHTML = '';
    
    if (schedule.lessons && schedule.lessons.length > 0) {
        schedule.lessons.forEach(lesson => {
            scheduleHTML += `
                <div class="lesson-item">
                    <div class="lesson-icon">
                        <i class="${lesson.icon}"></i>
                    </div>
                    <div class="lesson-time">${lesson.time}</div>
                    <div class="lesson-name">${lesson.name}</div>
                </div>
            `;
        });
        
        // Добавляем информацию о дне
        let dayInfo = "";
        if (day === "wednesday") {
            dayInfo = "История Пророков - увлекательное занятие о жизни и уроках пророков";
        } else if (day === "thursday" || day === "sunday") {
            dayInfo = "Творческие занятия развивают воображение и моторику";
        } else if (day === "tuesday") {
            dayInfo = "Адаб - уроки исламской этики и хорошего поведения";
        } else if (day === "friday") {
            dayInfo = "Кулинария - готовим полезные и вкусные блюда";
        } else if (day === "saturday") {
            dayInfo = "Математика в игровой форме для первоклассников";
        } else if (day === "monday") {
            dayInfo = "Лепка развивает творческие способности и мелкую моторику";
        }
        
        scheduleHTML += `
            <div class="day-info">
                <i class="fas fa-info-circle"></i> ${dayInfo}
            </div>
        `;
    } else {
        scheduleHTML = `
            <div class="no-schedule">
                <i class="fas fa-calendar-times fa-2x" style="margin-bottom: 15px; color: #4a8fdf;"></i><br>
                На этот день расписание еще не готово
            </div>
        `;
    }
    
    selectedDayElement.textContent = `Расписание на ${schedule.dayName}`;
    scheduleContentElement.innerHTML = scheduleHTML;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем снежинки сразу при загрузке
    createSnowflakes();
    
    // Находим все кнопки дней
    const dayButtons = document.querySelectorAll('.day-btn');
    
    // Обработчик нажатия на кнопку дня
    dayButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            dayButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            // Получаем выбранный день
            const selectedDay = this.getAttribute('data-day');
            
            // Отображаем расписание
            displaySchedule(selectedDay);
        });
    });
    
    // По умолчанию выбираем понедельник
    const mondayButton = document.querySelector('.day-btn[data-day="monday"]');
    if (mondayButton) {
        mondayButton.classList.add('active');
        displaySchedule('monday');
    }
    
    // Периодически обновляем снежинки (на случай, если анимация завершится)
    setInterval(createSnowflakes, 60000); // Каждую минуту
});

// Также создаем снежинки, когда пользователь возвращается на вкладку
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        createSnowflakes();
    }
});
