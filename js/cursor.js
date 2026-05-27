document.addEventListener('mousemove', createSpark);
document.addEventListener('touchmove', createSpark);

function createSpark(e) {

    const spark = document.createElement('div');

    spark.classList.add('neon-spark');

    if (Math.random() > 0.8) {
        spark.classList.add('pink');
    }

    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    document.body.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 15000);
}