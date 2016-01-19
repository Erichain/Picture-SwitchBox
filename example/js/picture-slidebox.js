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

    $.fn.imgSwitch = function ( options ) {

        $(this).attr('id', 'img-switch');

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
            slidebox = $('#img-switch a'),

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
                imgElem[i] = $('<img src="" alt="" />');
                imgElem[i].attr('src', config.imgs[i]);
                imgElem[i].attr('index', i);
                slidebox.eq(i).append(imgElem[i]);
            }
        }

        function switchImage ( elem ) {
            elem.removeClass('active').next().addClass('active');
        }

        function switchImageWithFadeEffect () {
            var activedElem = $('#img-switch li.active'),
                imgsLis = $('#img-switch li'),
                timer = null,
                i = 0;

            switchImage(activedElem);
            //timer = setTimeout(switchImageWithFadeEffect, config.speed);
        }

        function switchImageWithSlideEffect () {}

        function switchImageWithPileEffect () {}

        function getSwitchMethod () {
            switch (config.method) {
                case 'fade':
                    console.log('fade');
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

        createImageElement();
        setTimeout(getSwitchMethod, config.speed);
    }

})( jQuery );