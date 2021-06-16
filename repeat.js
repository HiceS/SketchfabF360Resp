function getParamsJson(){
    const queryString = window.location.href;
    const code = queryString.split('#')[1];
    if (code){
        let params = code.split('&');
        const args = {
            event: "authorize",
            token: params[0].split("=")[1],
            expires: params[1].split("=")[1],
            token_type: params[2].split("=")[1],
            scope: params[3].split("=")[1],
            state: params[4].split("=")[1]
        };
        return args;
    }
    return false;
}
 
function repeat(){
    let args =  getParamsJson();

    if (args){
        try{
            setTimeout(function(){ adsk.fusionSendData('send', JSON.stringify(args)); }, 3000);
        }
        catch (e) {
            setTimeout(function(){ adsk.fusionSendData('send', JSON.stringify(args)); }, 3000);
        }
    }
}

window.onload = repeat;

window.fusionJavaScriptHandler = {
    handle: function(action, data){
        try {
            if (action == 'send') {
            }
            else if (action == 'debugger') {
                debugger;
            }
            else {
                return 'Unexpected command type: ' + action;
            }
        } catch (e) {
            console.log(e);
            console.log('exception caught with command: ' + action + ', data: ' + data);
        }
        return 'OK';
   }
};