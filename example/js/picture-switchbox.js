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
         * user's config
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

                // add mouse event listener to make image's aciton stop or not
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

                // prevent elem's default action
                preventAllAnchorsDefault: function ( elems ) {
                    elems.each(function ( index ) {
                        $(this).on('click', function ( event ) {
                            event.preventDefault();
                        });
                    });
                }
            };

        // user must add images to start switch box
        if ( imgCount === 0 ) {
            console.error('No images !');
            return null;
        }

        /*=========================  main feature functions  =====================================*/

        // create img elements and add them to DOM
        function createImageBox() {
            var imgItems = [],
                selectorItem = [],
                imgBox = '',
                selectors = '',
                i;

            for ( i = 0; i < imgCount; i++ ) {
                imgItems[i] = '<li>\
                                   <a href="' + (config.imgs.destUrl[i] || '') + '">\
                                       <img src="' + (config.imgs.url[i] || '') + '" alt="' + (config.imgs.altText[i] || '') + '" />\
                                   </a>\
                               </li>';

                selectorItem[i] = ' <li></li>';
            }

            imgBox = '<ul class="imgs-content">' + imgItems.join('') + '</ul>';
            selectors = '<ul class="selector-circle">' + selectorItem.join('') + '</ul>';

            switchBoxContainer.append(imgBox, selectors);

            // add switch class to the first li element
            switchBoxContainer.find('.imgs-content li').eq(0).addClass(config.method);
            switchBoxContainer.find('.selector-circle li').eq(0).addClass('active');

            // prevent a tags' default behavior
            utils.preventAllAnchorsDefault(switchBoxContainer.find('a'));
        }

        // controller for images' switch and selectors' state change
        function switchCtrl( activeImgElem, activeSelectorElem, nextElemLen ) {
            // if actived element's next is empty, then go to the first element
            if ( nextElemLen === 0 ) {
                switchBoxContainer.find('.imgs-content li').eq(imgCount - 1).removeClass(config.method);
                switchBoxContainer.find('.imgs-content li').eq(0).addClass(config.method);
                switchBoxContainer.find('.selector-circle li').eq(imgCount - 1).removeClass('active');
                switchBoxContainer.find('.selector-circle li').eq(0).addClass('active');
            }
            else {
                activeImgElem.removeClass(config.method).next('li').addClass(config.method);
                activeSelectorElem.removeClass('active').next('li').addClass('active');
            }
        }

        // switch images in specific speed
        function switchImage() {
            var timer = null,
                activeImgElem = switchBoxContainer.find('li.' + config.method),
                activeSelectorElem = switchBoxContainer.find('li.active'),
                nextElemLen = activeImgElem.next('li').length;

            timer = setTimeout(function () {

                // if user don't want box to loop, set it to false
                if ( !config.isLoop && nextElemLen === 0 ) {
                    clearTimeout(timer);
                }
                else {
                    switchCtrl(activeImgElem, activeSelectorElem, nextElemLen);

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