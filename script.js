// Fungsi untuk menjalankan kode
function runCode() {
    const htmlCode = document.getElementById('html-editor').value;
    const cssCode = document.getElementById('css-editor').value;
    const jsCode = document.getElementById('js-editor').value;
    const outputFrame = document.getElementById('output-frame');

    // Membuat dokumen HTML lengkap
    const fullCode = `
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `;

    // Menulis kode ke iframe
    outputFrame.contentDocument.open();
    outputFrame.contentDocument.write(fullCode);
    outputFrame.contentDocument.close();
}

// Fungsi untuk mengosongkan editor
function clearEditors() {
    document.getElementById('html-editor').value = '';
    document.getElementById('css-editor').value = '';
    document.getElementById('js-editor').value = '';
    document.getElementById('output-frame').contentDocument.open();
    document.getElementById('output-frame').contentDocument.write('');
    document.getElementById('output-frame').contentDocument.close();
    document.getElementById('import-status').textContent = '';
}

// Fungsi untuk menangani import file
document.getElementById('file-input').addEventListener('change', function(event) {
    const files = event.target.files;
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');
    const importStatus = document.getElementById('import-status');

    if (files.length === 0) {
        importStatus.textContent = 'No files selected.';
        importStatus.style.color = '#ef4444';
        return;
    }

    let loadedFiles = 0;
    importStatus.textContent = 'Loading files...';
    importStatus.style.color = '#f59e0b';

    // Loop melalui file yang diunggah
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const extension = file.name.split('.').pop().toLowerCase();

            // Menempatkan isi file ke editor yang sesuai
            if (extension === 'html') {
                htmlEditor.value = content;
            } else if (extension === 'css') {
                cssEditor.value = content;
            } else if (extension === 'js') {
                jsEditor.value = content;
            }

            loadedFiles++;
            if (loadedFiles === files.length) {
                importStatus.textContent = `${loadedFiles} file(s) loaded successfully!`;
                importStatus.style.color = '#16a34a';
                setTimeout(() => {
                    importStatus.textContent = '';
                }, 3000);
            }
        };
        reader.onerror = function() {
            importStatus.textContent = 'Error loading file: ' + file.name;
            importStatus.style.color = '#ef4444';
        };
        reader.readAsText(file);
    }
});
