const storyTextElement = document.getElementById('story-text');
const choiceButtonsElement = document.getElementById('choice-buttons');
const inventoryListElement = document.getElementById('inventory-list');
const minigameOverlay = document.getElementById('minigame-overlay');
const movingCursor = document.getElementById('moving-cursor');
const hackBtn = document.getElementById('hack-btn');
const terminalWindow = document.querySelector('.terminal-window');

let state = {};
let typingInterval;
let minigameInterval;
let cursorPosition = 0;
let cursorDirection = 1;
let audioCtx;

function playClick() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(200 + Math.random() * 100, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}

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

    if ([5, 10, 14, 15, 20].includes(textNodeIndex)) {
        terminalWindow.classList.add('system-critical');
    } else {
        terminalWindow.classList.remove('system-critical');
    }

    clearInterval(typingInterval);
    storyTextElement.innerText = '';
    choiceButtonsElement.innerHTML = '';
    
    let charIndex = 0;

    typingInterval = setInterval(() => {
        if (charIndex < textNode.text.length) {
            storyTextElement.innerText += textNode.text.charAt(charIndex);
            
            if (textNode.text.charAt(charIndex) !== ' ') {
                playClick();
            }
            
            charIndex++;
        } else {
            clearInterval(typingInterval);
            renderButtons(textNode);
        }
    }, 30);
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
    if (option.minigame) {
        startMinigame(option.minigame);
        return;
    }

    const nextTextNodeId = option.nextText;

    if (nextTextNodeId <= 0) {
        return startGame();
    }

    state = Object.assign(state, option.setState);
    updateInventoryDisplay();
    showTextNode(nextTextNodeId);
}

function startMinigame(minigameData) {
    minigameOverlay.classList.remove('hidden');
    cursorPosition = 0;
    cursorDirection = 1;

    clearInterval(minigameInterval);
    minigameInterval = setInterval(() => {
        cursorPosition += 5 * cursorDirection;
        if (cursorPosition >= 290 || cursorPosition <= 0) {
            cursorDirection *= -1;
        }
        movingCursor.style.left = cursorPosition + 'px';
    }, 15);

    hackBtn.onclick = () => {
        clearInterval(minigameInterval);
        minigameOverlay.classList.add('hidden');

        if (cursorPosition >= 120 && cursorPosition <= 180) {
            showTextNode(minigameData.winNode);
        } else {
            showTextNode(minigameData.loseNode);
        }
    };
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

document.body.addEventListener('click', () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}, { once: true });

loadGame();