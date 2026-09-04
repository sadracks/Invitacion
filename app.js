document.addEventListener("DOMContentLoaded", () => {
    
    // ================= DETECCIÓN DE HORA Y TEMA (CLARO / OSCURO) =================
    function configurarTemaAutomatico() {
        const horaActual = new Date().getHours();
        const minutoActual = new Date().getMinutes();
        const totalMinutos = horaActual * 60 + minutoActual;
        
        const esNoche = totalMinutos >= 1080 || totalMinutos <= 360;
        
        const cuerpo = document.getElementById('cuerpo-principal');
        const cortina = document.getElementById('cortina-transicion');
        const iconoTransicion = document.getElementById('icono-transicion');
        const btnModoPrueba = document.getElementById('btn-modo-prueba');

        if (esNoche) {
            cuerpo.classList.remove('tema-claro');
            cuerpo.classList.add('tema-oscuro');
            iconoTransicion.textContent = '🌙';
            cortina.classList.add('subir');
            if (btnModoPrueba) btnModoPrueba.textContent = '🌙';
        } else {
            cuerpo.classList.remove('tema-oscuro');
            cuerpo.classList.add('tema-claro');
            iconoTransicion.textContent = '☀️';
            cortina.classList.add('bajar');
            if (btnModoPrueba) btnModoPrueba.textContent = '☀️';
        }

        setTimeout(() => {
            cortina.style.display = 'none';
        }, 1200);
    }

    configurarTemaAutomatico();

    // ================= BOTÓN DE PRUEBA (CAMBIO DE TEMA MANUAL) =================
    const btnModoPrueba = document.getElementById('btn-modo-prueba');
    if (btnModoPrueba) {
        btnModoPrueba.addEventListener('click', () => {
            const cuerpo = document.getElementById('cuerpo-principal');
            const cortina = document.getElementById('cortina-transicion');
            const iconoTransicion = document.getElementById('icono-transicion');
            
            const esOscuroActual = cuerpo.classList.contains('tema-oscuro');
            
            cortina.style.display = 'flex';
            cortina.classList.remove('subir', 'bajar');

            if (esOscuroActual) {
                iconoTransicion.textContent = '☀️';
                cortina.classList.add('bajar');
                cuerpo.classList.remove('tema-oscuro');
                cuerpo.classList.add('tema-claro');
                btnModoPrueba.textContent = '☀️';
            } else {
                iconoTransicion.textContent = '🌙';
                cortina.classList.add('subir');
                cuerpo.classList.remove('tema-claro');
                cuerpo.classList.add('tema-oscuro');
                btnModoPrueba.textContent = '🌙';
            }

            setTimeout(() => {
                cortina.style.display = 'none';
                const seccionVisible = document.querySelector('.pantalla-seccion');
                if (seccionVisible) {
                    const esOscuro = cuerpo.classList.contains('tema-oscuro');
                    const colorDinamico = seccionVisible.getAttribute(esOscuro ? 'data-color-noche' : 'data-color-dia');
                    if (colorDinamico) {
                        document.getElementById('top-bar').style.backgroundColor = colorDinamico;
                    }
                }
            }, 1200);
        });
    }

    // ================= PRELOADER =================
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const contenido = document.getElementById('contenido-principal');
        
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.classList.add('oculto');
            contenido.classList.remove('oculto');
            iniciarLuceros();
            iniciarMariposas();
            iniciarDigitacion();
            iniciarCarrusel3D();
            iniciarContadorRegresivo();
        }, 800);
    }, 2500);

    // ================= ANIMACIÓN DE DIGITACIÓN (TYPING) =================
    function iniciarDigitacion() {
        const elementos = document.querySelectorAll('.efecto-digitacion');
        
        elementos.forEach(el => {
            const textoCompleto = el.getAttribute('data-texto');
            const delayInicial = parseFloat(getComputedStyle(el).animationDelay) * 1000 || 0;
            
            setTimeout(() => {
                let i = 0;
                el.style.opacity = '1';
                
                function escribir() {
                    if (i < textoCompleto.length) {
                        el.textContent += textoCompleto.charAt(i);
                        i++;
                        setTimeout(escribir, 55);
                    }
                }
                escribir();
            }, delayInicial);
        });
    }

    // ================= CONTADOR REGRESIVO Y EXPLOSIÓN DE CORAZONES =================
    function iniciarContadorRegresivo() {
        const fechaBoda = new Date("October 14, 2026 16:00:00").getTime();

        const spanDias = document.getElementById('dias');
        const spanHoras = document.getElementById('horas');
        const spanMinutos = document.getElementById('minutos');
        const spanSegundos = document.getElementById('segundos');

        function actualizarReloj() {
            const ahora = new Date().getTime();
            const diferencia = fechaBoda - ahora;

            if (diferencia < 0) return;

            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            spanDias.textContent = String(dias).padStart(2, '0');
            spanHoras.textContent = String(horas).padStart(2, '0');
            spanMinutos.textContent = String(minutos).padStart(2, '0');
            spanSegundos.textContent = String(segundos).padStart(2, '0');
        }

        setInterval(actualizarReloj, 1000);
        actualizarReloj();
    }

    function dispararExplosionCorazones() {
        const contenedor = document.getElementById('explosion-corazones-container');
        if (!contenedor || contenedor.childElementCount > 0) return;

        const totalCorazones = 25;
        for (let i = 0; i < totalCorazones; i++) {
            const corazon = document.createElement('div');
            corazon.classList.add('corazon-explosion');
            
            corazon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            `;

            const angulo = Math.random() * Math.PI * 2;
            const distancia = Math.random() * 160 + 60;
            const dx = Math.cos(angulo) * distancia;
            const dy = Math.sin(angulo) * distancia;
            const rotacion = Math.random() * 360;

            corazon.style.setProperty('--dx', `${dx}px`);
            corazon.style.setProperty('--dy', `${dy}px`);
            corazon.style.setProperty('--rot', `${rotacion}deg`);
            corazon.style.animationDelay = `${Math.random() * 0.2}s`;

            contenedor.appendChild(corazon);
            setTimeout(() => corazon.remove(), 1200);
        }
    }

    // ================= FUEGOS ARTIFICIALES (PANTALLA 5) =================
    function dispararFuegosArtificiales() {
        const contenedor = document.getElementById('fuegos-artificiales-container');
        if (!contenedor) return;

        const coloresFuego = ['#FFD700', '#FF6B81', '#87CEEB', '#FFFFFF', '#DDA7A5', '#CBE8BA'];

        function crearRondaFuegos() {
            if (!document.body.contains(contenedor)) return;

            const totalParticulas = 30;
            const colorElegido = coloresFuego[Math.floor(Math.random() * coloresFuego.length)];

            for (let i = 0; i < totalParticulas; i++) {
                const particula = document.createElement('div');
                particula.classList.add('particula-fuego');
                particula.style.backgroundColor = colorElegido;
                particula.style.boxShadow = `0 0 8px 2px ${colorElegido}`;

                const angulo = Math.random() * Math.PI * 2;
                const distancia = Math.random() * 180 + 50;
                const fx = Math.cos(angulo) * distancia;
                const fy = Math.sin(angulo) * distancia;

                particula.style.setProperty('--fx', `${fx}px`);
                particula.style.setProperty('--fy', `${fy}px`);

                contenedor.appendChild(particula);
                setTimeout(() => particula.remove(), 1200);
            }
        }

        crearRondaFuegos();
        window.intervaloFuegos = setInterval(crearRondaFuegos, 1800);
    }

    function detenerFuegosArtificiales() {
        if (window.intervaloFuegos) {
            clearInterval(window.intervaloFuegos);
            window.intervaloFuegos = null;
        }
    }

    // ================= CARRUSEL 3D Y LIGHTBOX =================
    function iniciarCarrusel3D() {
        const tarjetas = document.querySelectorAll('.tarjeta-3d');
        const lightbox = document.getElementById('lightbox');
        const lightboxVisor = document.getElementById('lightbox-visor');
        const lightboxDesc = document.getElementById('lightbox-descripcion');
        const lightboxCerrar = document.getElementById('lightbox-cerrar');
        
        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                const descripcion = tarjeta.getAttribute('data-descripcion');
                const multimediaDiv = tarjeta.querySelector('.placeholder-multimedia');
                
                lightboxVisor.innerHTML = '';
                
                const bgImage = multimediaDiv.style.backgroundImage;
                if (bgImage && bgImage !== 'none') {
                    const urlImg = bgImage.slice(5, -2);
                    const imgEl = document.createElement('img');
                    imgEl.src = urlImg;
                    lightboxVisor.appendChild(imgEl);
                } else {
                    const clone = multimediaDiv.cloneNode(true);
                    lightboxVisor.appendChild(clone);
                }

                lightboxDesc.textContent = descripcion;
                lightbox.classList.add('lightbox-activo');
            });
        });

        lightboxCerrar.addEventListener('click', () => {
            lightbox.classList.remove('lightbox-activo');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('lightbox-activo');
            }
        });
    }

    // ================= LUCEROS A CORAZONES =================
    const contenedorLuceros = document.getElementById('luceros-container');
    const coloresGlow = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFFFFF']; 

    function crearLucero() {
        if (contenedorLuceros.childElementCount > 15) return; 

        const particula = document.createElement('div');
        particula.classList.add('particula-magica');
        
        const color = coloresGlow[Math.floor(Math.random() * coloresGlow.length)];
        const duracion = Math.random() * 8 + 8; 
        const posicionX = Math.random() * 100; 

        particula.style.left = `${posicionX}vw`;
        particula.style.color = color;
        particula.style.animationDuration = `${duracion}s`;

        particula.innerHTML = `
            <div class="lucero" style="animation-duration: ${duracion}s;"></div>
            <svg class="corazon-final" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;

        contenedorLuceros.appendChild(particula);

        const tiempoTransformacion = (duracion * 0.8) * 1000;
        setTimeout(() => {
            particula.classList.add('transformacion-corazon');
        }, tiempoTransformacion);

        setTimeout(() => particula.remove(), duracion * 1000);
    }

    function iniciarLuceros() {
        setInterval(crearLucero, 800); 
    }

    // ================= MARIPOSAS (GIFs ESTÁNDAR) =================
    const contenedorMariposas = document.getElementById('mariposas-container');
    const gifsMariposas = ['1.gif', '2.gif', '3.gif'];

    function crearMariposa() {
        if (contenedorMariposas.childElementCount >= 6) return;

        const mariposa = document.createElement('div');
        mariposa.classList.add('mariposa');
        
        const alturaInicial = Math.random() * 60 + 10; 
        const duracion = Math.random() * 6 + 12; 
        const vuelaHaciaIzquierda = Math.random() > 0.5;
        
        const orientacionImg = vuelaHaciaIzquierda ? 'scaleX(-1)' : 'scaleX(1)';

        if (vuelaHaciaIzquierda) {
            mariposa.style.right = '-60px'; 
            mariposa.style.animationName = 'volarIzquierda';
        } else {
            mariposa.style.left = '-60px'; 
            mariposa.style.animationName = 'volarDerecha';
        }

        mariposa.style.top = `${alturaInicial}vh`;
        mariposa.style.animationDuration = `${duracion}s`;

        const gifElegido = gifsMariposas[Math.floor(Math.random() * gifsMariposas.length)];

        mariposa.innerHTML = `
            <div style="transform: ${orientacionImg};">
                <img src="${gifElegido}" class="gif-mariposa" alt="Mariposa">
            </div>
        `;

        contenedorMariposas.appendChild(mariposa);
        setTimeout(() => mariposa.remove(), duracion * 1000);
    }

    function iniciarMariposas() {
        crearMariposa(); 
        setInterval(crearMariposa, 2500); 
    }

    // ================= CONTROL DE SECCIONES, COLOR Y FADE =================
    const secciones = document.querySelectorAll('.pantalla-seccion');
    const indicadores = document.querySelectorAll('.indicador');
    const topBar = document.getElementById('top-bar');
    const cuerpo = document.getElementById('cuerpo-principal');

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            const contenidoCentro = entrada.target.querySelector('.contenido-centro');
            
            if (entrada.isIntersecting) {
                if (contenidoCentro) {
                    contenidoCentro.classList.remove('salida-fade');
                    contenidoCentro.classList.add('activo-fade');
                }

                if (entrada.target.id === 'pantalla-3') {
                    dispararExplosionCorazones();
                }

                if (entrada.target.id === 'pantalla-5') {
                    dispararFuegosArtificiales();
                } else {
                    detenerFuegosArtificiales();
                }

                const esOscuro = cuerpo.classList.contains('tema-oscuro');
                const colorDinamico = entrada.target.getAttribute(esOscuro ? 'data-color-noche' : 'data-color-dia');
                if (colorDinamico) {
                    topBar.style.backgroundColor = colorDinamico;
                }

                const index = Array.from(secciones).indexOf(entrada.target);
                indicadores.forEach((ind, idx) => {
                    if (idx === index) {
                        ind.classList.add('activo');
                    } else {
                        ind.classList.remove('activo');
                    }
                });

                if (entrada.target.id === 'pantalla-1') {
                    contenedorMariposas.style.opacity = '1';
                } else {
                    contenedorMariposas.style.opacity = '0';
                }

            } else {
                if (contenidoCentro) {
                    contenidoCentro.classList.remove('activo-fade');
                    contenidoCentro.classList.add('salida-fade');
                }
                if (entrada.target.id === 'pantalla-5') {
                    detenerFuegosArtificiales();
                }
            }
        });
    }, { threshold: 0.4 }); 

    secciones.forEach(seccion => {
        const contenidoCentro = seccion.querySelector('.contenido-centro');
        if (contenidoCentro) contenidoCentro.classList.add('seccion-animada');
        observer.observe(seccion);
    });
});