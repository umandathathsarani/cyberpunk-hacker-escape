const storyTextElement = document.getElementById('story-text');
const choiceButtonsElement = document.getElementById('choice-buttons');
const inventoryListElement = document.getElementById('inventory-list');

let state = {};

function startGame() {
    state = {};
    updateInventoryDisplay();
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = storyNodes.find(textNode => textNode.id === textNodeIndex);
    
    storyTextElement.innerText = textNode.text;
    
    while (choiceButtonsElement.firstChild) {
        choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
    }
    
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

startGame();