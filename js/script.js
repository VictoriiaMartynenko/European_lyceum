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
    

    // Код для відкриття першого акордеону по замовчуванню
    const firstAccordionItem = document.querySelector('.accordion-item');
    if (firstAccordionItem) {
        firstAccordionItem.classList.add('active');
    }
    
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
    
    
}); 