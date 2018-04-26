# adSize   
Module extracts banner's size from html file  


For now it's focuses on meta tag containing width and height.



## API

### adSize(input[, silent])


### input
Type: _String_ 
Path to html file or it's raw content 


### silent
Type: _Boolean_  
Default: `true`  
If `true`, then no errors would be thrown, and if an error occurs, the function returns `null`  



## Usage

```javascript
const adSize = require('ad-size');

let html = '<html><head><meta name="ad.size" content="HEIGHT=250px,width=970"></head><body></body></html>';
let size = adSize(html);
//=> '970x250'

```

