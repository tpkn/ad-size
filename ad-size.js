/*!
 * adSize, http://tpkn.me/
 */

const fs = require('fs');

/**
 * Extract meta tag content without Cheerio and else
 * 
 * @param  {String} name <meta name='<name>'>
 * @param  {String} html html content
 * @return {String}
 */
function extractMeta(name, html){
   let list;
   let results = [];
   let meta_rule = new RegExp(('<meta\\s+name="' + name.replace(/([\.\\\+\/])/g, '\\$1') + '"\\s+content="(.+?)">'), 'gi');
   
   // Remove commented parts
   html = html.replace(/<!--[\s\S]*?-->/gi, '');

   while((list = meta_rule.exec(html)) !== null) {
      results.push(list[1]);
   }

   return results;
}

function adSize(input, silent = true){
   let size;
   let html_data = '';

   if(fs.existsSync(input)){
      html_data = fs.readFileSync(input, 'utf8');
   }else if(/<html/i.test(input) && /<head>/i.test(input)){
      html_data = input.toString('utf8');
   }else{
      return silent ? size : new Error('Unsupported input data format');
   }


   let meta_tags = extractMeta('ad.size', html_data);

   if(meta_tags.length == 1){
      let tag_value = meta_tags[0].split(',');

      if(tag_value.length == 2){

         // In case the width and height are swapped
         if(!/width\=/i.test(tag_value[0])){
            tag_value.reverse();
         }

         // Remove width=/height=/px
         size = tag_value.join('x').replace(/(width\=|height\=|px|\s)/gi, '');

      }else{
         return silent ? size : new Error('Incomplete ad.size content');
      }
   }else if(meta_tags.length == 0){
      return silent ? size : new Error('No ad.size meta tag');
   }else{
      return silent ? size : new Error('There are ' + meta_tags.length + ' ad.size meta tags');
   }

   return size;
}

module.exports = adSize;
