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

    $.fn.switchBox = function ( options ) {
        var config = $.extend({
                speed: 3000,
                method: 'fade',
                isLoop: true,
                autoBegin: true,
                imgs: {
                    url: [
                        'images/img1.jpg',
                        'images/img2.jpg',
                        'images/img3.jpg'
                    ],
                    destUrl: [],
                    altText: []
                }
            }, options),

            imgCount = config.imgs.url.length,
            switchBoxContainer = $(this),

            // util functions
            util = {
                clearTimeout: clearTimeout,
                clearInterval: clearInterval
            };

        if ( imgCount === 0 ) {
            console.error('No images !');
            return null;
        }

        // create img elements and add them to DOM
        function createImageBox () {
            var imgItems = [],
                imgBox = '',
                i;

            for ( i = 0; i < imgCount; i++ ) {
                imgItems[i] = '<li>\
                                   <a href="' + (config.imgs.destUrl[i] || '') + '">\
                                       <img src="' + (config.imgs.url[i] || '') + '" alt="' + (config.imgs.altText[i] || '') + '" />\
                                   </a>\
                               </li>';
            }

            imgBox = '<ul>' + imgItems.join('') + '</ul>';
            switchBoxContainer.append(imgBox);

            // add switch class to the first li elment
            switchBoxContainer.find('li').eq(0).addClass(config.method);
        }

        function switchImage ( elem ) {
            var timer = null,
                elem = switchBoxContainer.find('li.' + config.method);

            elem.removeClass(config.method).next().addClass(config.method);

            if ( elem.next() === '[]' || !config.isLoop ) {
                clearTimeout(timer);
            }

            console.log(elem.next());

            timer = setTimeout(switchImage, config.speed);
        }

        function switchImageWithFadeEffect () {
            var activedElem = switchBoxContainer.find('li.' + config.method),
                imgsLis = switchBoxContainer.find('li'),
                i = 0;

            switchImage(activedElem);
        }

        function switchImageWithSlideEffect () {}

        function switchImageWithPileEffect () {}

        /**
         * execute function according to user's config
         * @function getSwitchMethod
         */
        function startSwitchBox () {
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

        createImageBox();
        setTimeout(startSwitchBox, config.speed);
    }

})( jQuery );
