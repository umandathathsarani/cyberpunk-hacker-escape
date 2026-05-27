document.addEventListener('mousemove', createSpark);
document.addEventListener('touchmove', createSpark);

function createSpark(e) {
    let baseX = e.clientX || e.touches[0].clientX;
    let baseY = e.clientY || e.touches[0].clientY;

    const sparkCount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.classList.add('neon-spark');
        
        if (Math.random() > 0.7) {
            spark.classList.add('pink');
        }

        const offsetX = (Math.random() - 0.5) * 30; 
        const offsetY = (Math.random() - 0.5) * 30;

        spark.style.left = `${baseX + offsetX}px`;
        spark.style.top = `${baseY + offsetY}px`;

        const sizeScale = Math.random() * 0.8 + 0.4; 
        spark.style.width = `${6 * sizeScale}px`;
        spark.style.height = `${6 * sizeScale}px`;

        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
        }, 15000);
    }
}