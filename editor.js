document.addEventListener('DOMContentLoaded', function () {
    const editorContainer = document.getElementById('editor');
    let originalContent = '';
    let currentFileName = '';

    const autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
    const saveButton = document.getElementById('saveButton');
    const fileInput = document.getElementById('fileInput');
    const loadButton = document.getElementById('loadButton');
    const saveStatus = document.getElementById('saveStatus');

    autoSaveCheckbox.addEventListener('change', function () {
        // Si cambia la opción de guardado automático, actualiza el mensaje de estado
        if (autoSaveCheckbox.checked) {
            showSaveStatus();
        }
    });

    saveButton.addEventListener('click', function () {
        // Cuando se hace clic en el botón de guardar manualmente
        saveFile(true);
    });


    function loadFile() {
        fileInput.click();
    }


    loadButton.addEventListener('click', loadFile);

    // Configuración del editor CodeMirror
    const editor = CodeMirror(editorContainer, {
        lineNumbers: true,
        mode: 'xml',
        theme: 'dracula', // Puedes cambiar el tema según tus preferencias
        indentUnit: 4,
        tabSize: 4,
    });

    /**
     * Saves the current content to a file and optionally updates the original content.
     * @param {boolean} manualSave - Indica si el guardado es manual o no.
     */
    function saveFile(manualSave = false) {
        const content = editor.getValue();

        // Si el guardado es automático, sobrescribe el archivo cargado
        if (autoSaveCheckbox.checked && !manualSave) {
            if (currentFileName) {
                const blob = new Blob([content], { type: 'text/xml' });

                // Verifica si el navegador es Internet Explorer
                if (window.navigator && window.navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(blob, currentFileName);
                } else {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = currentFileName;
                    a.click();
                }

                originalContent = content; // Actualiza el contenido original
                showSaveStatus(); // Muestra el mensaje de estado
            }
        } else {
            // Si el guardado es manual, abre la ventana para elegir la ubicación del archivo
            const blob = new Blob([content], { type: 'text/xml' });

            // Verifica si el navegador es Internet Explorer
            if (window.navigator && window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(blob, currentFileName || 'edited.xml');
            } else {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);

                // Si hay un archivo cargado, mantiene el nombre original
                if (currentFileName) {
                    a.download = currentFileName;
                } else {
                    a.download = 'edited.xml';
                }

                document.body.appendChild(a);
                a.style.display = 'none';

                a.addEventListener('click', function () {
                    originalContent = content; // Actualiza el contenido original
                    document.body.removeChild(a);
                });

                a.click();
            }
        }
    }

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];

        if (file) {
            currentFileName = file.name; // Almacena el nombre del archivo cargado
            const reader = new FileReader();

            reader.onload = function (event) {
                originalContent = event.target.result;
                editor.setValue(originalContent); // Actualiza el contenido del editor
            };

            reader.readAsText(file);
        }
    });

    /**
     * Displays a temporary status message indicating a successful save.
     */
    function showSaveStatus() {
        saveStatus.style.display = 'inline';
        setTimeout(() => {
            saveStatus.style.display = 'none';
        }, 2000);
    }
});
