# XML Editor v1.3.0

## Project Description

The XML Editor project provides a user-friendly interface for creating and editing XML documents. It leverages the CodeMirror library for syntax highlighting and offers additional features for managing XML files. The editor supports loading sample files, creating new follow-ups, moving follow-ups, and saving the edited content.

## Project Structure

### Files

- `index.html`: The main HTML file containing the structure of the editor interface.
- `styles.css`: The stylesheet with global styling for the entire page.
- `editor.js`: JavaScript file responsible for initializing the XML editor and handling file operations.

### Dependencies

- No internet connection is required for dependencies, as Codemirror has been removed from npm. Instead, the necessary files are included in the project:

  - `codemirror/brace-fold.min.js`
  - `codemirror/codemirror.min.css`
  - `codemirror/codemirror.min.js`
  - `codemirror/dracula.min.css`
  - `codemirror/foldcode.min.js`
  - `codemirror/foldgutter.min.css`
  - `codemirror/foldgutter.min.js`
  - `codemirror/xml-fold.min.js`
  - `codemirror/xml.min.js`

### Project Tree

📦xml-editor
 ┣ 📂.git
 ┣ 📜editor.js
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜sample.xml
 ┣ 📂codemirror
 ┃ ┣ 📜brace-fold.min.js
 ┃ ┣ 📜codemirror.min.css
 ┃ ┣ 📜codemirror.min.js
 ┃ ┣ 📜dracula.min.css
 ┃ ┣ 📜foldcode.min.js
 ┃ ┣ 📜foldgutter.min.css
 ┃ ┣ 📜foldgutter.min.js
 ┃ ┣ 📜xml-fold.min.js
 ┃ ┗ 📜xml.min.js
 ┗ 📜styles.css

### Getting Started

To use the XML Editor locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://MariferVL@bitbucket.org/cdtfrontend/xml-editor.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd xml-editor
   ```

3. **Open the Editor**:
   - Open `index.html` in your preferred web browser.

## Editor Features

### 1. Load Sample Files

   - Select a sample file from the dropdown in the header to load its content into the editor.

### 2. Save Content

   - Click the "Guardar" (Save) button to save the current content. The saved file will be named either based on the selected file or as "edited.xml" if it's a new file.

### 3. CodeMirror Editor Features

   - **Syntax Highlighting**: XML code is highlighted for better readability.
   - **Line Numbers**: Line numbers are displayed for easy navigation.
   - **AutoClose Tags**: Automatically closes XML tags for improved code structure.
   - **Foldable Code Blocks**: Use 'Ctrl-Q' to fold and unfold code blocks, enhancing code organization.
   - **Copy with Empty Selection**: Allows copying the entire line when no specific text is selected.

### 4. Styling

   - The editor interface is designed with a clean and responsive layout, utilizing a dark theme based on the Dracula color scheme. Styles include buttons, labels, dropdowns, and the CodeMirror editor.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests on [Bitbucket](https://bitbucket.org/cdtfrontend/xml-editor).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
