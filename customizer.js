// customizer.js - Lógica actualizada para manejar doble correa y COMBINACIÓN ALEATORIA.

document.addEventListener('DOMContentLoaded', () => {
    
    // Ruta base a la carpeta de imágenes (asume que está en submariner/images/)
    const imagePath = 'images/'; 
    
    // 1. Obtener todas las referencias a los elementos de visualización
    const dialDisplay = document.getElementById('dial-display');
    const bezelDisplay = document.getElementById('bezel-display');
    const strapDisplay1 = document.getElementById('strap-display-1'); // Correa Superior
    const strapDisplay2 = document.getElementById('strap-display-2'); // Correa Inferior
    const randomButton = document.getElementById('random-btn'); // 🚨 Botón Aleatorio

    // Mapeo de elementos de visualización por tipo de componente
    const displayMap = {
        'dial': [dialDisplay],
        'bezel': [bezelDisplay],
        'strap': [strapDisplay1, strapDisplay2] 
    };

    // 2. Obtener todos los botones de selección y grupos
    const selectorGroups = document.querySelectorAll('.selector-group');
    const selectorButtons = document.querySelectorAll('.selector-group button');


    // ------------------------------------------------
    // FUNCIÓN PRINCIPAL DE CAMBIO DE COMPONENTE
    // ------------------------------------------------
    function applySelection(clickedButton) {
        const componentType = clickedButton.closest('.selector-group').dataset.component;
        // El fileIdentifier es el nombre completo (dialazul.png) o el prefijo de color (azul)
        const fileIdentifier = clickedButton.dataset.file; 

        // 🚨 Aplicar cambios en la visualización
        displayMap[componentType].forEach((displayElement, index) => {
            let newFileName;

            if (componentType === 'strap') {
                // Lógica de doble correa (correa1[color].png y correa2[color].png)
                const strapNumber = index + 1; 
                newFileName = `correa${strapNumber}${fileIdentifier}.png`;
            } else {
                newFileName = fileIdentifier;
                
                // 🚨 Lógica para gestionar las clases CSS de la esfera (para centrado individual)
                if (componentType === 'dial') {
                    // 1. Quitar la clase de centrado anterior (ej: dial-azul)
                    displayElement.className = displayElement.className.replace(/dial-[a-z]+/g, '');
                    
                    // 2. Extraer el color del nombre del archivo (ej: de 'dialblanco.jpg' extrae 'blanco.jpg')
                    const color = newFileName.replace('dial', '').replace('.png', '').replace('.jpg', '');
                    
                    // 3. Añadir la nueva clase al elemento (ej: "dial-blanco")
                    displayElement.classList.add(`dial-${color}`);
                }
            }
            
            // 4. Actualizar el atributo 'src' de la imagen
            if (displayElement) {
                displayElement.src = imagePath + newFileName;
            }
        });

        // 🚨 Actualizar la clase 'active' para el efecto visual
        const currentActive = clickedButton.parentNode.querySelector('.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        clickedButton.classList.add('active');
    }


    // ------------------------------------------------
    // 1. ESCUCHADOR DE BOTONES REGULARES (Dial, Bisel, Correa)
    // ------------------------------------------------
    selectorButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            applySelection(e.currentTarget);
        });
    });

    // ------------------------------------------------
    // 2. ESCUCHADOR DEL BOTÓN ALEATORIO
    // ------------------------------------------------
    if (randomButton) {
        randomButton.addEventListener('click', () => {
            // Itera sobre cada grupo de selección (dial, bezel, strap)
            selectorGroups.forEach(group => {
                // Obtener todos los botones dentro de este grupo
                const buttonsInGroup = group.querySelectorAll('button');
                
                // Generar un índice aleatorio
                const randomIndex = Math.floor(Math.random() * buttonsInGroup.length);
                
                // Obtener el botón elegido al azar
                const randomButton = buttonsInGroup[randomIndex];
                
                // Aplicar la selección de ese botón para actualizar el reloj
                applySelection(randomButton);
            });
        });
    }
});