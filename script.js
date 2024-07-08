document.getElementById('add-square-btn').addEventListener('click', addSquare);
document.getElementById('show-presets-btn').addEventListener('click', togglePresets);

document.querySelectorAll('.preset').forEach(preset => {
    preset.addEventListener('click', function() {
        const colorPicker = document.getElementById('color-picker');
        const colorInput = document.getElementById('color-input');
        const selectedColor = this.getAttribute('data-color');
        colorPicker.value = selectedColor;
        colorInput.value = selectedColor;
    });
});

function addSquare() {
    const gridContainer = document.getElementById('grid-container');
    const colorPicker = document.getElementById('color-picker');
    const colorInput = document.getElementById('color-input');
    const selectedColor = colorInput.value || colorPicker.value;

    if (!/^#[0-9A-F]{6}$/i.test(selectedColor)) {
        alert('Format de couleur invalide. Veuillez utiliser un code couleur hexadécimal comme #E0EAFC.');
        return;
    }

    const container = document.createElement('div');
    container.classList.add('container');
    container.style.setProperty('--start-color', selectedColor);
    container.style.setProperty('--end-color', adjustColorBrightness(selectedColor, 0.5));

    const circleBlack = document.createElement('div');
    circleBlack.classList.add('circle', 'black');
    container.appendChild(circleBlack);

    const circleGrey = document.createElement('div');
    circleGrey.classList.add('circle', 'grey');
    container.appendChild(circleGrey);

    const textBlack = document.createElement('div');
    textBlack.classList.add('text', 'black');
    textBlack.innerText = selectedColor;
    container.appendChild(textBlack);

    const textGrey = document.createElement('div');
    textGrey.classList.add('text', 'grey');
    textGrey.innerText = adjustColorBrightness(selectedColor, 0.5);
    container.appendChild(textGrey);

    gridContainer.appendChild(container);
}

function adjustColorBrightness(color, factor) {
    const r = Math.round(parseInt(color.slice(1, 3), 16) * factor);
    const g = Math.round(parseInt(color.slice(3, 5), 16) * factor);
    const b = Math.round(parseInt(color.slice(5, 7), 16) * factor);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

function togglePresets() {
    const presets = document.getElementById('preset-colors');
    presets.style.display = presets.style.display === 'none' ? 'flex' : 'none';
}
