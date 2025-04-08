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
}); 