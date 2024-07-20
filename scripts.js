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

document.getElementById('persona
