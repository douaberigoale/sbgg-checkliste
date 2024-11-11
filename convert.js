const fs = require('fs');
const MarkdownIt = require('markdown-it');

let styles = fs.readFileSync('style.css', 'utf8');

let openingFile = fs.readFileSync('opening.md', 'utf8');
let tasksFile = fs.readFileSync('tasks.md', 'utf8');
let closingFile = fs.readFileSync('closing.md', 'utf8');

tasksFile = tasksFile.replace(/- \[ \]/g, '- ☐');

const md = new MarkdownIt();
const opening = md.render(openingFile);
const tasks = md.render(tasksFile);
const closing = md.render(closingFile);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    ${styles}
  </style>
</head>

<body>
  <div class="markdown-body">
    ${opening}
    <hr>
    <div class="container">
      <div class="list-column">
        <h2>✅ Aufgaben</h2>
        ${tasks}
      </div>
      <div class="notes-column">
        <h2>📝 Notizen</h2>
      </div>
    </div>
    <hr>
    ${closing}
  </div>
</body>

</html>
`;

// Write the styled HTML to a file
fs.writeFileSync('output.html', htmlContent);
console.log("Markdown converted to HTML with custom styling and optimized font sizes.");