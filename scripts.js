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

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadPersonas();
    loadStyles();
    loadTones();
    loadDramaticStructures();
});

// Other JavaScript functions
// Function to clear default text on focus
function clearDefaultText(element, defaultText) {
    if (element.value === defaultText) {
        element.value = '';
        element.style.color = 'black';
    }
}

// Function to restore default text on blur if empty
function restoreDefaultText(element, defaultText) {
    if (element.value === '') {
        element.value = defaultText;
        element.style.color = 'gray';
    }
}

// Add event listeners for focus and blur on textareas and input
document.getElementById('context').addEventListener('focus', function() { clearDefaultText(this, 'Suppose year is 2400 with near galaxy'); });
document.getElementById('context').addEventListener('blur', function() { restoreDefaultText(this, 'Suppose year is 2400 with near galaxy'); });

document.getElementById('format').addEventListener('focus', function() { clearDefaultText(this, '3 paragraphs, 300 words, 250 max characters'); });
document.getElementById('format').addEventListener('blur', function() { restoreDefaultText(this, '3 paragraphs, 300 words, 250 max characters'); });

document.getElementById('persona').addEventListener('focus', function() { clearDefaultText(this, 'Enter the persona here...'); });
document.getElementById('persona').addEventListener('blur', function() { restoreDefaultText(this, 'Enter the persona here...'); });

document.getElementById('exemplar').addEventListener('focus', function() { clearDefaultText(this, 'Once there was a boy long time ago,'); });
document.getElementById('exemplar').addEventListener('blur', function() { restoreDefaultText(this, 'Once there was a boy long time ago,'); });

// Function to generate the prompt based on the input values
function generatePrompt() {
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
    const modalOutput = document.getElementById('modalOutput');
    const outputDiv = document.getElementById('output');
    
    modalOutput.value = outputDiv.value;
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// Function to save changes from the modal
function saveChanges() {
    const modalOutput = document.getElementById('modalOutput');
    const outputDiv = document.getElementById('output');
    
    outputDiv.value = modalOutput.value;
    closeModal();
}

// Close the modal if the user clicks outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
