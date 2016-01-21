# Picture SwitchBox
Switch box written with jQuery ( jQuery version >= 1.8 )

## Install
`npm install` <br/>

## Preview
`gulp serve` <br/>

## Configuration
In your user config file:

```
$('your images container selector').switchBox({
    speed: 4000,
    method: 'scale',
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
});
```

## Params
`speed`       the speed which images switch with <br/>
`method`       the way images switch in <br/>
`isLoop`       let the switch box loop or not <br/>         
`imgs.urls`    your imgs <br/>
`imgs.destUrl` where to go when clicking on the image <br/>
`imgs.altText` the alt info of your imgs <br/>

## License
Release under the MIT license.