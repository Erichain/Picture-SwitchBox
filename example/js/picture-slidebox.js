/**
 * Switch box written with jQuery ( version >= 1.8 )
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
            slidebox = document.getElementById('img-slidebox').getElementsByTagName('a'),

            util = {
                addEventWatcher: function ( elem, event, callback ) {}
            };

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

        function switchImageWithFadeEffect () {
            var imgsLiElem = document.getElementById('img-slidebox').getElementsByTagName('li'),
                timer = null,
                i = 0;

            timer = setTimeout(switchImage, 1000);
        }

        function switchImageWithSlideEffect () {}

        function switchImageWithPileEffect () {}

        createImageElement();

        switch (config.method) {
            case 'fade':
                switchImageWithFadeEffect();
                break;

            case 'slide':
                switchImageWithSlideEffect();
                break;

            case 'pile':
                switchImageWithPileEffect();
                break;

            default:
                switchImageWithFadeEffect();
        }
    }

})( jQuery );