document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadPersonas();
    loadStyles();
    loadTones();
    loadDramaticStructures();
    fetchTemplates();
});

// Function to load tasks from tasks.json
async function loadTasks() {
    try {
        const response = await fetch('tasks.json');
        const tasks = await response.json();
        const datalist = document.getElementById('tasks');
        tasks.forEach(task => {
            const option = document.createElement('option');
            option.value = task;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Function to load personas from persona.json
async function loadPersonas() {
    try {
        const response = await fetch('persona.json');
        const personas = await response.json();
        const datalist = document.getElementById('personas');
        personas.forEach(persona => {
            const option = document.createElement('option');
            option.value = persona;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading personas:', error);
    }
}

// Function to load styles from styles.json
async function loadStyles() {
    try {
        const response = await fetch('styles.json');
        const styles = await response.json();
        const select = document.getElementById('style');
        styles.forEach(style => {
            const option = document.createElement('option');
            option.value = style;
            option.textContent = style;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading styles:', error);
    }
}

// Function to load tones from tones.json
async function loadTones() {
    try {
        const response = await fetch('tones.json');
        const tones = await response.json();
        const select = document.getElementById('tone');
        tones.forEach(tone => {
            const option = document.createElement('option');
            option.value = tone;
            option.textContent = tone;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading tones:', error);
    }
}

// Function to load dramatic structures from dramatic.json
async function loadDramaticStructures() {
    try {
        const response = await fetch('dramatic.json');
        const structures = await response.json();
        const select = document.getElementById('structure');
        structures.forEach(structure => {
            const option = document.createElement('option');
            option.value = structure;
            option.textContent = structure;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading dramatic structures:', error);
    }
}

// Function to fetch templates from template.json
async function fetchTemplates() {
    try {
        const response = await fetch('template.json');
        const templates = await response.json();
        populateTemplateList(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
    }
}

// Function to populate the datalist with template names
function populateTemplateList(templates) {
    const datalist = document.getElementById('templates');
    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.name;
        datalist.appendChild(option);
    });

    // Add event listener for template selection
    document.getElementById('template').addEventListener('input', (event) => {
        const selectedTemplate = templates.find(template => template.name === event.target.value);
        if (selectedTemplate) {
            applyTemplate(selectedTemplate);
        }
    });
}

// Function to apply selected template values to the form fields
function applyTemplate(template) {
    document.getElementById('task').value = template.task || '';
    document.getElementById('context').value = template.context || '';
    document.getElementById('format').value = template.format || '';
    document.getElementById('persona').value = template.persona || '';
    document.getElementById('style').value = template.style || '';
    document.getElementById('tone').value = template.tone || '';
    document.getElementById('structure').value = template.structure || '';
    document.getElementById('exemplar').value = template.exemplar || '';
}

// Existing functions like generatePrompt, copyToClipboard, resetForm, showModal, closeModal, copyModalToClipboard

// Function to generate the prompt based on the input values
function generatePrompt() {
    const template = document.getElementById('template').value;
    // Retrieve input values from the form
    const task = document.getElementById('task').value;
    const context = document.getElementById('context').value;
    const format = document.getElementById('format').value;
    const persona = document.getElementById('persona').value;
    const style = document.getElementById('style').value;
    const tone = document.getElementById('tone').value;
    const structure = document.getElementById('structure').value;
    const exemplar = document.getElementById('exemplar').value;
    const addQuestions = document.getElementById('addQuestions').checked;
    const closeEnded = document.getElementById('closeEnded').checked;
    
    // Create the prompt string
    let prompt = `
        [Template: ${template}]
        [Task: ${task}]
        [Context: ${context}]
        [Format: ${format}]
        [Persona: ${persona}]
        [Style: ${style}]
        [Tone: ${tone}]
        [Structure: ${structure}]
        [Exemplar: ${exemplar}]
    `;
    
    if (addQuestions) {
        prompt += "\n\n[Questions to improve the prompt:]\n1. What is the main objective?\n2. Who is the target audience?\n3. What is the desired outcome?\n4. Are there any constraints?\n5. What is the deadline?";
    }
    
    if (closeEnded) {
        prompt += "\n\n[Close-ended question:]\nIs the prompt clear and achievable? (Yes/No)";
    }

    // Display the generated prompt in the output textarea
    document.getElementById('output').value = prompt;
}

// Function to copy the generated prompt to the clipboard
function copyToClipboard() {
    const outputDiv = document.getElementById('output');
    const text = outputDiv.value;
    navigator.clipboard.writeText(text).then(() => {
        alert('Prompt copied to clipboard!');
    }, (err) => {
        alert('Failed to copy prompt!');
    });
}

// Function to reset the form to default values
function resetForm() {
    document.getElementById('task').value = 'Create an image';
    document.getElementById('context').value = 'Suppose year is 2400 with near galaxy';
    document.getElementById('format').value = '3 paragraphs, 300 words, 250 max characters';
    document.getElementById('persona').value = 'Enter the persona here...';
    document.getElementById('style').value = 'Descriptive';
    document.getElementById('tone').value = 'Formal';
    document.getElementById('structure').value = "Hero's Journey";
    document.getElementById('exemplar').value = 'Once there was a boy long time ago,';
    document.getElementById('addQuestions').checked = true;
    document.getElementById('closeEnded').checked = false;
    
    // Reset text color
    document.getElementById('context').style.color = 'gray';
    document.getElementById('format').style.color = 'gray';
    document.getElementById('persona').style.color = 'gray';
    document.getElementById('exemplar').style.color = 'gray';

    // Clear output textarea
    document.getElementById('output').value = '';
}

// Function to show the modal
function showModal() {
    const modal = document.getElementById('myModal');
    const modalOutputContainer = document.getElementById('modalOutputContainer');
    const outputDiv = document.getElementById('output');
    
    modalOutputContainer.innerHTML = '';
    const lines = outputDiv.value.split('\n');
    lines.forEach((line, index) => {
        const lineElement = document.createElement('div');
        lineElement.textContent = line;
        lineElement.className = 'modal-line';
        lineElement.onclick = () => removeLine(index);
        modalOutputContainer.appendChild(lineElement);
    });
    
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// Function to remove a line from the modal output
function removeLine(index) {
    const modalOutputContainer = document.getElementById('modalOutputContainer');
    const lines = modalOutputContainer.children;
    lines[index].style.display = 'none';
}

// Function to copy the modified modal content to the clipboard
function copyModalToClipboard() {
    const modalOutputContainer = document.getElementById('modalOutputContainer');
    const newLines = [];
    for (const lineElement of modalOutputContainer.children) {
        if (lineElement.style.display !== 'none') {
            newLines.push(lineElement.textContent);
        }
    }
    const modifiedText = newLines.join('\n');
    navigator.clipboard.writeText(modifiedText).then(() => {
        alert('Modified prompt copied to clipboard!');
    }, (err) => {
        alert('Failed to copy modified prompt!');
    });
}

// Close the modal if the user clicks outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
