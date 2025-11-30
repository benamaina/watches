document.addEventListener('DOMContentLoaded', () => {
    // 1. Definición de los datos de las imágenes
    const slidersData = [
        { 
            id: 'esferas-slider', 
            files: ['dialBMazul.jpg', 'dialBMverde.jpg', 'dialBMnegro.jpg', 'dialBMblanco.jpg'] 
        },
        { 
            id: 'biseles-slider', 
            files: ['biselverde.png', 'biselazul.png', 'biselblanco.png', 'biselnegro.png'] 
        },
        { 
            id: 'correas-slider', 
            files: ['correaverde.jpg', 'correazul.jpg', 'correarosa.jpg', 'correanegra.jpg'] 
        }
    ];

    const imagePath = 'images/'; // Ruta a la carpeta de imágenes
    const intervalTime = 3000; // Tiempo de rotación en milisegundos (3 segundos)

    // 2. Función principal para inicializar y rotar cada slider
    slidersData.forEach(sliderData => {
        const sliderContainer = document.getElementById(sliderData.id);
        let currentIndex = 0;

        // Cargar las imágenes en el DOM
        const images = sliderData.files.map(fileName => {
            const img = document.createElement('img');
            img.src = imagePath + fileName;
            img.alt = fileName;
            sliderContainer.appendChild(img);
            return img;
        });

        // Función para mostrar la siguiente imagen
        const nextImage = () => {
            // Oculta la imagen actual
            images[currentIndex].classList.remove('active');

            // Calcula el índice de la siguiente imagen
            currentIndex = (currentIndex + 1) % images.length;

            // Muestra la nueva imagen
            images[currentIndex].classList.add('active');
        };

        // Mostrar la primera imagen al inicio
        if (images.length > 0) {
            images[0].classList.add('active');
        }

        // Iniciar la rotación automática
        setInterval(nextImage, intervalTime);
    });
});