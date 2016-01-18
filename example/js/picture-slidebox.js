/**
 * Slide box written with jQuery ( version >= 1.8 )
 * You can use it to make your pictures alive
 * There are some effects for the plugin
 * fadeIn/Out, slideRight/Left
 * Also, you can set the interval time for that
 * What's more, you can add pictures as more as you want
 * It's just amazing !
 * @example
 *
 * release under the MIT license
 * https://github.com/Erichain
 */
(function ( $ ) {

    $.fn.imgSlide = function ( options ) {

        $(this).attr('id', 'img-slidebox');

        var config = $.extend({
                speed: 3000,
                method: 'fade',
                isLoop: true,
                autoBegin: true,
                imgs: [
                    'images/img1.jpg',
                    'images/img2.jpg',
                    'images/img3.jpg'
                ]
            }, options),
            imgCount = config.imgs.length,
            slidebox = document.getElementById('img-slidebox').getElementsByTagName('a');

        if ( imgCount === 0 ) {
            console.error('No images !');
            return null;
        }

        function createImageElement () {
            var imgElem = [],
                i;

            for ( i = 0; i < imgCount; i++ ) {
                imgElem[i] = document.createElement('img');
                imgElem[i].src = config.imgs[i];
                slidebox[i].appendChild(imgElem[i]);
            }
        }

        function switchImage () {
            var imgsLi = document.getElementById('img-slidebox').getElementsByTagName('li'),
                liLen = imgsLi.length,
                timer = null,
                i;

            for ( i = 0; i < liLen; i++ ) {
                if ( imgsLi[i].classList.contains('active') ) {
                    imgsLi[i].classList.remove('active');
                }

                //imgsLi[i].nextSibling.nextSibling.classList.add('active');

            }

            timer = setTimeout(switchImage, 1000);
        }

        createImageElement();
        setTimeout(switchImage, 1000);
    }

})( jQuery );