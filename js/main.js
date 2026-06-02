(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // ==========================================
    // SECCIÓN DINÁMICA DE TESTIMONIOS
    // ==========================================

    function cargarTestimonios() {
        fetch('obtener_testimonios.php')
        .then(response => response.json())
        .then(data => {
            let $carousel = $('.testimonial-carousel');
            
            if ($carousel.hasClass('owl-loaded')) {
                $carousel.trigger('destroy.owl.carousel');
                $carousel.removeClass('owl-hidden');
            }
            
            $carousel.empty(); 

            data.forEach(item => {
                let html = `
                <div class="testimonial-item bg-dark text-white border-inner p-4">
                    <div class="d-flex align-items-center mb-3">
                        <img class="img-fluid flex-shrink-0" src="img/testimonial-1.png" style="width: 60px; height: 60px; border-radius: 50%;">
                        <div class="ps-3">
                            <h4 class="text-primary text-uppercase mb-1">${item.nombre}</h4>
                            <span>Cliente</span>
                        </div>
                    </div>
                    <p class="mb-0">${item.comentario}</p>
                </div>`;
                $carousel.append(html);
            });

            $carousel.owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                margin: 45,
                dots: true,
                loop: data.length > 1, // Solo hace loop si hay más de 1 testimonio
                center: true,
                responsive: {
                    0:{ items:1 },
                    576:{ items:1 },
                    768:{ items:2 },
                    992:{ items:3 }
                }
            });
        })
        .catch(error => console.error('Error cargando testimonios:', error));
    }

    cargarTestimonios();

    $('#form-testimonio').on('submit', function(e) {
        e.preventDefault();

        const nombre = $('#clienteNombre').val();
        const comentario = $('#clienteComentario').val();

        fetch('guardar_testimonio.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre, comentario: comentario })
        })
        .then(response => response.json())
        .then(data => {
            if(data.exito) {
                alert('¡Gracias por tu opinión!');
                $('#form-testimonio')[0].reset(); 
                cargarTestimonios(); 
            } else {
                alert('Hubo un error: ' + data.mensaje);
            }
        })
        .catch(error => console.error('Error al guardar:', error));
    });

})(jQuery);
