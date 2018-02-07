const TilteUtil = {

     titleCase:function(s) {  
        var i, ss = s.toLowerCase().split(/\s+/);  
        for (i = 0; i < ss.length; i++) {  
            ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);  
        }  
        return ss.join(' ');  
    }  

}
export default TilteUtil;