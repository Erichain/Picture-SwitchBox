/**
 * Switch box written with jQuery ( version >= 1.8 )
 * You can use it to make your pictures alive
 * There are some effects for the plugin
 * fadeIn/Out, slideRight/Left
 * Also, you can set the interval time for that
 * What's more, you can add pictures as more as you want
 * It's just amazing !
 * release under the MIT license
 * https://github.com/Erichain/Picture-SwitchBox
 */
(function ( $ ) {

    $.fn.switchBox = function ( options ) {

        /**
         * if not, use default
         *
         * @config speed         {Number}    the speed which images switch with
         * @config method        {String}    the way images switch in
         * @config isLoop        {Boolean}   let the switch box loop or not
         *
         * @config imgs          {Object}
         * @config imgs.urls     {Array}     your imgs
         * @config imgs.destUrl  {Array}     where to go when clicking on the image
         * @config imgs.altText  {Array}     the alt info of your imgs
         */
        var config = $.extend({
                speed: 3000,
                method: 'fade',
                isLoop: true,
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
            utils = {
                mouseListener: function ( elems, timer, speed, callback ) {
                    elems.each(function ( index ) {
                        $(this)
                            .on('mouseenter', function () {
                                clearTimeout(timer);
                            })
                            .on('mouseleave', function () {
                                setTimeout(callback, speed);
                            });
                    });
                },

                preventAllAnchorsDefault: function ( elems ) {
                    elems.each(function ( index ) {
                        $(this).on('click', function ( event ) {
                            event.preventDefault();
                        })
                    });
                }
            };

        // user must add images to start switch box
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

            // add switch class to the first li element
            switchBoxContainer.find('li').eq(0).addClass(config.method);

            // prevent a tags' default behavior
            utils.preventAllAnchorsDefault(switchBoxContainer.find('a'));
        }

        // switch images in specific speed
        function switchImage () {
            var timer = null,
                elem = switchBoxContainer.find('li.' + config.method),
                nextElemLen = elem.next('li').length;

            timer = setTimeout(function () {

                // if user don't want let box looping, set it to false
                if ( !config.isLoop && nextElemLen === 0 ) {
                    clearTimeout(timer);
                }
                else {

                    // if actived element's next is empty, then go to the first element
                    if ( nextElemLen === 0 ) {
                        switchBoxContainer.find('li').eq(imgCount - 1).removeClass(config.method);
                        switchBoxContainer.find('li').eq(0).addClass(config.method);
                    }
                    else {
                        elem.removeClass(config.method).next('li').addClass(config.method);
                    }

                    timer = setTimeout(switchImage, 0);
                }

            }, config.speed);

            // add event listener for mouse event
            utils.mouseListener(switchBoxContainer.find('a'), timer, 0, switchImage);
        }

        createImageBox();
        switchImage();
    }
})( jQuery );