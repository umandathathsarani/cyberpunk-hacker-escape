const storyTextElement = document.getElementById('story-text');
const choiceButtonsElement = document.getElementById('choice-buttons');
const inventoryListElement = document.getElementById('inventory-list');

let state = {};
let typingInterval;

function startGame() {
    state = {};
    localStorage.removeItem('cyberpunkGameState');
    localStorage.removeItem('cyberpunkCurrentNode');
    updateInventoryDisplay();
    showTextNode(1);
}

function loadGame() {
    const savedState = localStorage.getItem('cyberpunkGameState');
    const savedNode = localStorage.getItem('cyberpunkCurrentNode');
    
    if (savedState && savedNode) {
        state = JSON.parse(savedState);
        updateInventoryDisplay();
        showTextNode(parseInt(savedNode));
    } else {
        startGame();
    }
}

function showTextNode(textNodeIndex) {
    localStorage.setItem('cyberpunkCurrentNode', textNodeIndex);
    localStorage.setItem('cyberpunkGameState', JSON.stringify(state));

    const textNode = storyNodes.find(textNode => textNode.id === textNodeIndex);

    clearInterval(typingInterval);
    storyTextElement.innerText = '';
    choiceButtonsElement.innerHTML = '';
    
    let charIndex = 0;

    typingInterval = setInterval(() => {
        if (charIndex < textNode.text.length) {
            storyTextElement.innerText += textNode.text.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
            renderButtons(textNode);
        }
    }, 20);
}

function renderButtons(textNode) {
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('choice-btn');
            button.addEventListener('click', () => selectOption(option));
            choiceButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;

    if (nextTextNodeId <= 0) {
        return startGame();
    }

    state = Object.assign(state, option.setState);
    updateInventoryDisplay();
    showTextNode(nextTextNodeId);
}

function updateInventoryDisplay() {
    inventoryListElement.innerHTML = '';

    const items = Object.keys(state).filter(key => state[key] === true);

    if (items.length === 0) {
        const li = document.createElement('li');
        li.innerText = 'EMPTY';
        inventoryListElement.appendChild(li);
    } else {
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item.toUpperCase();
            inventoryListElement.appendChild(li);
        });
    }
}

loadGame();