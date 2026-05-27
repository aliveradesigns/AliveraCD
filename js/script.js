/**
 * Alivera Creative Designs - Interacciones JS
 */

// --- 1. Sincronización Dinámica del Formulario (WhatsApp y Gmail) ---
function updateContactLinks() {
    const name = document.getElementById('form-name').value.trim() || 'Cliente';
    const project = document.getElementById('form-project').value.trim() || 'Sin especificar';
    const idea = document.getElementById('form-idea').value.trim() || 'Sin detalles';
    const email = document.getElementById('form-email').value.trim() || 'No proporcionado';

    // Construcción del mensaje final
    const message = `Hola equipo de Alivera. Soy ${name}. 
Me interesa recibir una cotización para el proyecto: "${project}". 
Idea principal: ${idea}
Mi correo de contacto es: ${email}`;

    // Codificación segura para URLs
    const encodedMessage = encodeURIComponent(message);

    // Actualizar botones (Reemplaza los números y correos por los reales)
    document.getElementById('btn-wa').href = `https://wa.me/526564754232?text=${encodedMessage}`;
    document.getElementById('btn-mail').href = `mailto:aliveradesigns@gmail.com?subject=Cotización%20Proyecto:%20${encodeURIComponent(project)}&body=${encodedMessage}`;
}

// Escuchadores de eventos para cada input del formulario
['form-name', 'form-project', 'form-idea', 'form-email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateContactLinks);
});

// --- 2. Sistema de Pestañas del Portafolio ---
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    const tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const currentTab = document.getElementById(tabName);
    if (currentTab) currentTab.classList.add("active");
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

// --- 3. Modal FullScreen para Portafolio (Fotos, Videos, YouTube y PDFs) ---
function openMedia(type, src) {
    const container = document.getElementById('media-container');
    
    if (type === 'image') {
        container.innerHTML = `<img src="${src}" alt="Alivera Portfolio">`;
    } else if (type === 'video') {
        container.innerHTML = `<video controls autoplay><source src="${src}" type="video/mp4">Tu navegador no soporta video.</video>`;
    } else if (type === 'youtube') {
        // Iframe limpio: autoplay activado, sin videos recomendados externos y branding minimalista
        container.innerHTML = `<iframe style="width: 100%; height: 85vh; border-radius: 10px; background: #000;" src="https://www.youtube.com/embed/${src}?autoplay=1&rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (type === 'pdf') {
        // Integración nativa de iFrame para mostrar PDF en el visor
        container.innerHTML = `<iframe src="${src}" frameborder="0" style="width: 100%; height: 85vh; border-radius: 10px; background: white;"></iframe>`;
    }
    
    document.getElementById('media-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeMedia() {
    document.getElementById('media-modal').style.display = 'none';
    document.getElementById('media-container').innerHTML = '';
    document.body.style.overflow = 'auto';
}

// --- 4. Sistema Legal (Cookies y Privacidad) ---
function acceptCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}

window.onload = function() {
    if (!localStorage.getItem('cookiesAceptadas')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
    // Llama a la función para inicializar el form vacío con los botones predeterminados
    updateContactLinks();
}

function togglePrivacy() {
    const modal = document.getElementById('privacy-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-text-content');
    
    title.innerText = "Aviso de Privacidad Integral";
    content.innerHTML = `
        <p><strong>Responsable:</strong> Alivera Creative Designs.</p>
          <p><strong>Finalidad:</strong> Los datos recabados se utilizarán exclusivamente para la monitorización mediante Google Analytics.</p>
        <p><strong>Aclaraciones:</strong> Puedes obtener más informacion sobre la página enviando un correo a
                    aliveradesigns@gmail.com.</p>
    `;
    toggleModalDisplay(modal);
}

function toggleCookiesModal() {
    const modal = document.getElementById('privacy-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-text-content');
    
    title.innerText = "Política de Cookies";
    content.innerHTML = `
        <p><strong>Uso de Cookies:</strong> Alivera Creative Designs utiliza cookies técnicas estrictamente necesarias para el funcionamiento del sitio web.</p>
        <p><strong>Datos:</strong> No compartimos tus datos de navegación con terceros para fines publicitarios sin tu consentimiento previo.</p>
    `;
    toggleModalDisplay(modal);
}

function toggleModalDisplay(modal) {
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// --- 5. Navegación Suave (Smooth Scrolling) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});