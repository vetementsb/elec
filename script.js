const certificates = [
    { name: "Свидетельство электролаборатории", desc: "Рег. № 16-2026 от 07.05.2026", img: "images/Лаборатория1.jpg" },
    { name: "Приборы комбинированые", desc: "Сертификат поверки", img: "images/Поверка1.jpg" },
    { name: "Нагрузочные измерительные комплекты", desc: "Сертификат поверки", img: "images/Поверка2.jpg" },
    { name: "Измерение показателей качества", desc: "Сертификат поверки", img: "images/Поверка3.jpg" },
    { name: "Измерение петли фаза-нуль", desc: "Сертификат поверки", img: "images/Поверка4.jpg" },
    { name: "Мегаометры", desc: "Сертификат поверки", img: "images/Поверка5.jpg" },
    { name: "Мегаометры", desc: "Сертификат поверки", img: "images/Поверка5.jpg" },
    { name: "Цифровые измерители", desc: "Сертификат поверки", img: "images/Поверка6.jpg" },
    { name: "Многофункциональные измерители", desc: "Свидетельство поверки", img: "images/Поверка7.jpg" },
    { name: "Удостоверение", desc: "Тереньтев А.Н.", img: "images/Удостоверение1.jpg" },
    { name: "Удостоверение", desc: "Двоеглазов А.Н.", img: "images/Удостоверение2.jpg" },
];

// Рендер галереи документов
const docsGrid = document.getElementById('docsGrid');
function renderDocs() {
    if(!docsGrid) return;
    docsGrid.innerHTML = '';
    certificates.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <div class="doc-preview">
                <img src="${cert.img}" alt="${cert.name}" loading="lazy">
            </div>
            <div class="doc-info">
                <h4>📄 ${cert.name}</h4>
                <p>${cert.desc}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modalImg.src = cert.img;
            modal.classList.add('active');
        });
        docsGrid.appendChild(card);
    });
}
renderDocs();

// Модальное окно
const modal = document.getElementById('imageModal');
const closeModal = document.querySelector('.close-modal');
closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('active'); });

// Плавный скролл для навигации
function scrollToSection(elementId) {
    const element = document.getElementById(elementId);
    if(element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Навигация по кликам
document.querySelectorAll('.nav-links a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        if(section === 'main') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if(section === 'services') {
            scrollToSection('services-section');
        } else if(section === 'docs') {
            scrollToSection('docs-block');
        } else if(section === 'contacts') {
            scrollToSection('contacts-block');
        } else if(section === 'form') {
            scrollToSection('form-section');
        }
    });
});

// Кнопки на главной
document.getElementById('scrollToFormBtn')?.addEventListener('click', () => scrollToSection('form-section'));
document.getElementById('scrollToServicesBtn')?.addEventListener('click', () => scrollToSection('services-section'));

// Обработка формы
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById('callbackForm');
    const status = document.getElementById('formStatus');

    if (!form) return; // защита

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = form.querySelector('[name="name"]')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || '';
        const details = form.querySelector('[name="details"]')?.value || '';

        const fullMessage = document.getElementById('fullMessage');
        if (fullMessage) {
            fullMessage.value =
                `Имя: ${name}\nТелефон: ${phone}\nДетали: ${details}`;
        }

        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xkoenpla", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (status) status.innerHTML = "✅ Спасибо! Заявка отправлена.";
                form.reset();
            } else {
                if (status) status.innerHTML = "❌ Ошибка отправки.";
            }
        } catch (error) {
            if (status) status.innerHTML = "⚠️ Ошибка соединения.";
        }

    });

});
