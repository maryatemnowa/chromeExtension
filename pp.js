//var _bindApi = function (name, callback) {console.log('_bindApi');
//    var apiHandlers ;//= callback;
//    var me = this;
//    if (!apiHandlers) {console.log('apiHandlers');
//        apiHandlers = {};
//        window.addEventListener('message', function (event) {
//            try {
//                // Check the origin of the data!
//                if (~event.origin.indexOf('http://localhost')) {
//                    // The data has been sent from test environment
//                    // TODO: COMMENT OFF on production
//                    var objData = JSON.parse(event.data);
//                    if (objData != null) {
//                        var callback = apiHandlers[objData.eventName];
//                        if (callback != null) {
//                            var result = callback.apply(me, objData.args);
//                            console.log(result);
//                        }
//                    }
//                    return;
//                }
//            } catch (err) {
//                console.log(err);
//                return;
//            }
//        });
//    }
//    apiHandlers[name] = callback;
//}
//
//var bindResize = function (method) {
//    _bindApi('resizeScreen', method);
//}
//
//var resizeVideo = function() {
//    console.log('resizeVideo');
//    $('#buttonResize').trigger("click" );
//};
//var btn = document.getElementById('buttonResize');
//btn.addEventListener("click", function(){
//    var element = document.body;
//    if(document.getElementsByTagName('video')[0]) {
//        var element = document.getElementsByTagName('video')[0];
//        console.log('video');
//    }
//    else {
//        if(document.getElementsByTagName('object')[0]) {
//            if (RegExp('vgtv.no').test(host)){
//                element = document.getElementsByTagName('object')[0].parentNode.parentNode.parentNode;
//            }
//            else
//                element = document.getElementsByTagName('object')[0].parentNode;
//            console.log('object');
//
//        }
//
//        else {
//            element = document.body;
//            console.log('body');
//        }
//    }
//    launchFullScreen(element);
//});
//bindResize(resizeVideo);
