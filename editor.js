/**
 * Event listener for when the DOM content has been loaded.
 * Initializes the XML editor and handles file loading and saving.
 * @function
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Container for the CodeMirror editor.
     * @type {HTMLElement}
     */
    const editorContainer = document.getElementById('editor');

    /**
     * Variable to store the original content of the editor.
     * @type {string}
     */
    let originalContent = '';

    /**
     * Variable to store the current file name.
     * @type {string}
     */
    let currentFileName = '';

    /**
     * Save button element.
     * @type {HTMLButtonElement}
     */
    const saveButton = document.getElementById('saveButton');

    /**
     * File input element.
     * @type {HTMLSelectElement}
     */
    const fileInput = document.getElementById('selectFile');

    /**
     * Event listener for the save button click.
     * Calls the saveFile function.
     */
    saveButton.addEventListener('click', function () {
        saveFile();
    });

    /**
     * Event listener for the file input click.
     * Calls the loadFile function.
     */
    function loadFile() {
        const selectedFile = fileInput.options[fileInput.selectedIndex].value;
        loadSampleFile(selectedFile);
    }

    fileInput.addEventListener('click', loadFile);

    /**
     * Configuration for the CodeMirror editor.
     * @see {@link https://codemirror.net/doc/manual.html#config CodeMirror Configuration}
     */
    const editor = CodeMirror(editorContainer, {
        lineNumbers: true,
        mode: 'xml',
        theme: 'dracula',
        indentWithTabs: true,
        indentUnit: 4,
        tabSize: 4,
        autoCloseTags: true,
        copyWithEmptySelection: true,
        lineWrapping: true,
        extraKeys: {
            'Ctrl-Q': function (cm) {
                cm.foldCode(cm.getCursor());
            }
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });


    /**
     * Loads the content of the selected file into the editor.
     * @param {string} fileName - The name of the selected file.
     */
    function loadSampleFile(fileName) {
        if (fileName === 'sample') {
            // Load sample content directly into the editor
            originalContent = `
            <telefono modelo="Galaxy Z Flip3">
                <caracteristicas>
                    <pantalla tipo="AMOLED">
                        <tamano>6.7 pulgadas</tamano>
                        <resolucion>1080 x 2640 píxeles</resolucion>
                    </pantalla>
                    <procesador>
                        <marca>Qualcomm</marca>
                        <modelo>Snapdragon 888</modelo>
                    </procesador>
                    <almacenamiento interno="256 GB"/>
                    <memoria_ram>8 GB</memoria_ram>
                    <camaras>
                        <principal>
                            <resolucion>12 MP + 12 MP</resolucion>
                            <apertura>f/1.8 + f/2.2</apertura>
                        </principal>
                        <frontal>
                            <resolucion>10 MP</resolucion>
                            <apertura>f/2.4</apertura>
                        </frontal>
                    </camaras>
                    <bateria capacidad="3300 mAh"/>
                </caracteristicas>
                <sistema_operativo>Android 11</sistema_operativo>
                <precio moneda="USD">1499.99</precio>
            </telefono>
            `;
            editor.getDoc().setValue(originalContent);
        } else {
            // Load content from a file
            const sampleFilePath = '/' + fileName + '.xml';
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    originalContent = xhr.responseText;
                    editor.getDoc().setValue(originalContent);
                }
            };

            xhr.open('GET', sampleFilePath, true);
            xhr.send();
        }
    }

    /**
     * Saves the current content to a file and optionally updates the original content.
     * @param {boolean} manualSave - Indicates if the save action is manual or not.
     */
    function saveFile() {
        const content = editor.getValue();
        const blob = new Blob([content], { type: 'text/xml' });

        if (window.navigator && window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, currentFileName || 'edited.xml');
        } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);

            if (currentFileName) {
                a.download = currentFileName;
            } else {
                a.download = 'edited.xml';
            }

            document.body.appendChild(a);
            a.style.display = 'none';

            a.addEventListener('click', function () {
                originalContent = content;
                document.body.removeChild(a);
            });

            a.click();
        }
    }
});
