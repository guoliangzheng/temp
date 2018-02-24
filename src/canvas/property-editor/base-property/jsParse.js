
let openToken = "#{"
let  closeToken = "}";
function JsParse(body){
    let builder = [];
    let index = 0;
    if (body != null && body.length > 0) {
      let src = body.split('');
      let offset = 0;
      let start = body.indexOf(openToken, offset);
      while (start > -1) {
        if (start > 0 && src[start - 1] == '\\') {
          builder.push(src.slice(offset, start - 1).join(''));
          builder.push(openToken) ;
          offset = start + openToken.length;
        } else {
          let end = body.indexOf(closeToken, start);
          if (end == -1) {
            builder.push(src.slice(offset, src.length).join(''))
            offset = src.length;
          } else {
            index ++;
            builder.push(src.slice(offset, start ).join(''))
            offset = start + openToken.length;
            let content = src.slice(offset, end ).join('');
            //在这个地方讲数据集和操作进行转义
            const arr = content.split(".");
            if(arr.length>1){
              let temp  = "";
              const type =arr[0];
              const name = arr[1];
              if(type=="data"){
                  temp ="dataSet.get('"+name+"').data ";
              }
              builder.push(temp);
            }
         
            offset = end + closeToken.length;
          }
        }
        start = body.indexOf(openToken, offset);
      }
      if (offset < src.length) {
        builder.push(src.slice (offset, src.length).join(''));
      }
    }
    return builder;
}
export default JsParse