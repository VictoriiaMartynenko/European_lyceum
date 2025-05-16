document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let scrollThreshold = 50; // Мінімальна відстань прокрутки для зміни стану
    let scrollTimer;
    
    // Функція для контролю видимості хедера
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Якщо ми на початку сторінки, завжди показуємо хедер
        if (currentScrollY < scrollThreshold) {
            header.classList.remove('hidden');
            lastScrollY = currentScrollY;
            return;
        }
        
        // Визначаємо напрямок прокрутки і різницю у відстані
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        // Змінюємо стан тільки якщо прокрутка значна (> 5px)
        if (scrollDifference > 5) {
            if (currentScrollY > lastScrollY) {
                // Прокрутка вниз - ховаємо хедер
                header.classList.add('hidden');
            } else {
                // Прокрутка вгору - показуємо хедер
                header.classList.remove('hidden');
            }
            
            // Зберігаємо поточну позицію для наступного порівняння
            lastScrollY = currentScrollY;
        }
    }
    
    // Додаємо обробник події прокрутки з використанням debounce
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(handleScroll, 10);
    });
    
    // Додаємо обробники кліку для всіх кнопок акордеону
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.parentElement;
            // Перемикаємо активний клас при кліку
            accordionItem.classList.toggle('active');
        });
    });

    // Код для плавної прокрутки до FAQ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Отримуємо позицію цільового елемента
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Прокручуємо до цільового елемента з урахуванням висоти хедера
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // JavaScript для роботи акордеону на нових сторінках
    const eventItems = document.querySelectorAll('.event-item');
    
    if (eventItems.length > 0) {
        console.log('Found event-items:', eventItems.length);
        eventItems.forEach(item => {
            const header = item.querySelector('.event-header');
            
            if (header) {
                console.log('Setting up click handler for event header');
                header.addEventListener('click', function() {
                    console.log('Event header clicked');
                    // Закриваємо всі активні елементи крім поточного
                    eventItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Перемикаємо клас 'active' для поточного елемента
                    item.classList.toggle('active');
                    console.log('Toggled active class, new state:', item.classList.contains('active'));
                });
            } else {
                console.log('No event-header found in event-item');
            }
        });
    } else {
        console.log('No event-items found on page');
    }

    // Обробник для випадаючого списку року при наведенні
    const yearSelector = document.querySelector('.year-selector');
    const yearDropdown = document.querySelector('.year-dropdown-content');
    
    if (yearSelector && yearDropdown) {
        // Відкриття списку при наведенні на кнопку
        yearSelector.addEventListener('mouseenter', function() {
            yearDropdown.classList.add('active');
        });
        
        // Закриття списку при відведенні курсору
        yearSelector.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!yearDropdown.matches(':hover')) {
                    yearDropdown.classList.remove('active');
                }
            }, 100);
        });
        
        // Забезпечуємо, щоб список не закривався, поки курсор на ньому
        yearDropdown.addEventListener('mouseenter', function() {
            yearDropdown.classList.add('active');
        });
        
        yearDropdown.addEventListener('mouseleave', function() {
            yearDropdown.classList.remove('active');
        });
        
        // Обробник для вибору року
        const yearLinks = document.querySelectorAll('.year-dropdown-content a');
        yearLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const year = this.textContent;
                document.querySelector('.year-text').textContent = year;
                yearDropdown.classList.remove('active');
            });
        });
    }
    
    // Анімація для секції статистики
    const statisticsSection = document.querySelector('.statistics-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Зберігаємо цільові значення кожного числа
    const targetNumbers = [];
    statNumbers.forEach(statNumber => {
        const targetValue = parseInt(statNumber.textContent, 10);
        targetNumbers.push(targetValue);
        // Скидаємо всі числа до 0 перед початком анімації
        statNumber.textContent = '0';
    });
    
    let animationStarted = false;
    
    // Функція для перевірки, чи елемент видимий на екрані
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функція для анімації чисел
    function animateNumbers() {
        if (animationStarted) return;
        
        if (isElementInViewport(statisticsSection)) {
            animationStarted = true;
            
            const animationDuration = 2000; // 2 секунди
            const steps = 100; // Кількість кроків анімації
            const stepDuration = animationDuration / steps;
            
            let currentStep = 0;
            
            const interval = setInterval(() => {
                currentStep++;
                
                statNumbers.forEach((statNumber, index) => {
                    const targetValue = targetNumbers[index];
                    let currentValue;
                    
                    // Плавна анімація з уповільненням наприкінці (ease-out)
                    if (currentStep < steps * 0.7) {
                        // Швидка фаза (70% часу)
                        currentValue = Math.floor((currentStep / (steps * 0.7)) * targetValue * 0.9);
                    } else {
                        // Повільна фаза (останні 30% часу)
                        const progress = (currentStep - steps * 0.7) / (steps * 0.3);
                        currentValue = Math.floor(targetValue * 0.9 + progress * targetValue * 0.1);
                    }
                    
                    statNumber.textContent = currentValue;
                });
                
                if (currentStep >= steps) {
                    clearInterval(interval);
                    // Пересвідчимось, що фінальні числа точно дорівнюють цільовим
                    statNumbers.forEach((statNumber, index) => {
                        statNumber.textContent = targetNumbers[index];
                    });
                }
            }, stepDuration);
        }
    }
    
    // Додаємо обробник прокрутки для перевірки, чи секція статистики видима
    window.addEventListener('scroll', animateNumbers);
    // Викликаємо анімацію під час завантаження на випадок, якщо секція вже видима
    animateNumbers();
}); 