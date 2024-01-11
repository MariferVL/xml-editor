document.addEventListener('DOMContentLoaded', function () {
    const editor = document.querySelector('.editor');
    const fileInput = document.getElementById('fileInput');
    const loadButton = document.getElementById('loadButton');
    const saveButton = document.getElementById('saveButton');
    const autoSaveCheckbox = document.getElementById('autoSaveCheckbox');

    loadButton.addEventListener('click', loadFile);

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const content = event.target.result;
                highlightXML(content);
            };

            reader.readAsText(file);
        }
    });

    function highlightXML(content) {
        editor.innerHTML = `<pre><code class="language-xml">${escapeHtml(content)}</code></pre>`;
        Prism.highlightAll();
    }

    editor.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('tag')) {
            toggleCollapse(target);
        }
    });

    function toggleCollapse(target) {
        const element = target.parentElement;
        const isCollapsed = element.classList.toggle('collapsed');

        if (isCollapsed) {
            const content = element.innerHTML;
            const collapsedContent = content.replace(/&lt;\/?([a-zA-Z]+)([^&gt;]*)&gt;/g, match => {
                return `<span class="tag">${match}</span>`;
            });

            element.innerHTML = collapsedContent;
        } else {
            const content = element.innerText;
            element.innerHTML = content;
            highlightXML(content);
        }
    }

    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            saveFile();
        }
    });

    saveButton.addEventListener('click', saveFile);

    function saveFile() {
        const content = editor.innerText;
        const blob = new Blob([content], { type: 'text/xml' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'edited.xml';
        a.click();

        // Mostrar mensaje modal de guardado
        showSaveModal();
    }

    function showSaveModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerText = 'Guardado exitoso';

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 500);
        }, 2000);
    }

    // Función para escapar caracteres especiales en HTML
    function escapeHtml(unsafe) {
        return unsafe.replace(/[&<>"']/g, function (match) {
            switch (match) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
            }
        });
    }

    // Función para cargar un archivo
    function loadFile() {
        fileInput.click();
    }

    // Inicialización
    highlightXML();
});
