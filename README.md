# Picture SwitchBox
Switch box written with jQuery ( jQuery version >= 1.8 )

## Install
`npm install` <br/>

## Preview
`gulp serve` <br/>

## Build
`gulp build`

## Configuration
In your user config file:

```
$('your images container selector').switchBox({
    speed: 4000,
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
});
```

## Params
`speed`       the speed which images switch with. Default: 4000ms <br/>
`method`       the way images switch in. Default: fade <br/>
`isLoop`       let the switch box loop or not. Default: true <br/>         
`imgs.urls`    your imgs. Default: [] <br/>
`imgs.destUrl` where to go when clicking on the image. Default: [] <br/>
`imgs.altText` the alt info of your imgs. Default: [] <br/>

## License
Release under the MIT license.
