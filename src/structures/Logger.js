const moment = require("moment");
const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
const colors = require('colors');
colors.enable();
export class Logger {
 
    error(error) {
        console.error(error);
    }

    debug(name, content) {
       console.log(`[${date}]`.green,` : [DEBUG]`.red,`[${name}]`.yellow,` =>  ${content}`.cyan);
    }

    event(name, content) {
        
        console.log(`[${date}]`.green,` : [EVENT]`.red,`[${name}]`.yellow,` =>  ${content}`.blue);
    }

    log(name, content) {
       
        console.log(`[${date}]`.green,` : [LOGS]`.red,`[${name}]`.yellow,` =>  ${content}`.blue);
    }
   

}