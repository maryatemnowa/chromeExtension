(function() {
    //var app = "/EmbeddedApp/default.html";
  var app = '//swapcastmirror.azurewebsites.net/EmbeddedApp/default.html';
  //var app = "http://apps.swapcast.com/EmbeddedApp/default.html";

  function createEl(attr, type, parent) {
    var el = document.createElement(type);
    attrSetter(el, attr);
    parent.insertBefore(el, parent.firstChild);
  }

  // Setters
  function attrSetter(el, attr) {
    for( var k in attr ) {
      el.setAttribute(k, attr[k]);
    }
  }
  function setUrl(myFrame, link) {
     var appFrame = document.getElementById(myFrame);
     appFrame.src = link;
     move(459,document.getElementById('SwapcastEmbedded_FrameContainer'), function(p) { return 1-p });
  }

  // Animation
  function animate(opts) {
    var start = new Date   
    var id = setInterval(function() {
      var timePassed = new Date - start
      var progress = timePassed / opts.duration
      if (progress > 1) progress = 1
      var delta = opts.delta(progress)
      opts.step(delta)
      if (progress == 1) {
        clearInterval(id)
      }
    }, opts.delay || 10)
  }
  function move(t, element, delta, duration) {
    animate({
      delay: 10,
      duration: duration || 300,
      delta: delta,
      step: function(delta) {
        element.style.left = -t*delta + "px"
      }
    })
  }

  // Create elements
  if(window === window.top) {
    createEl({'id':'SwapcastEmbedded_FrameContainer'}, 'div', document.body);
    createEl({'id':'SwapcastEmbedded_AppBtn','title':'Open chat'}, 'div', document.getElementById('SwapcastEmbedded_FrameContainer'));
    createEl({'id':'SwapcastEmbedded_Loader'}, 'span', document.getElementById('SwapcastEmbedded_FrameContainer'));



    var imgURL = chrome.extension.getURL('icon_open_chat_panel.png');
    document.getElementById('SwapcastEmbedded_AppBtn').style.backgroundImage = 'url("' + imgURL + '")';

    imgURL = chrome.extension.getURL('ajax-loader_.gif');
    document.getElementById('SwapcastEmbedded_Loader').style.backgroundImage = 'url("' + imgURL + '")';

    document.getElementById('SwapcastEmbedded_AppBtn').addEventListener("click", function() {
      if(document.getElementById("SwapcastEmbedded_AppFrame")) {
        if( parseInt(this.parentNode.style.left) == -459 )
          move(459,this.parentNode, function(p) { return 1-p });
        else
          move(459,this.parentNode, function(p) { return p });
      } else {
        createEl({ 'id':'SwapcastEmbedded_AppFrame' }, 'iframe', document.getElementById('SwapcastEmbedded_FrameContainer'));
        var frame = document.getElementById('SwapcastEmbedded_AppFrame');
        frame.onload = function() {
          document.getElementById('SwapcastEmbedded_Loader').style.display = 'none';
          try {
            frame.contentWindow.setAppButtonContent = function(content) {
              btn = document.getElementById('SwapcastEmbedded_AppBtn');
              if (btn != null)
                btn.innerHTML = content;
            };
          } catch(err) { }
        };
        setUrl('SwapcastEmbedded_AppFrame', app);
        frame.setAppButtonContent = function(content) {
          btn = document.getElementById('SwapcastEmbedded_AppBtn');
          if (btn != null)
            btn.innerHTML = content;
        };
      }
    });

    try {
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

      // Listen to message from child window
      eventer(messageEvent,function(e) {
        var key = e.message ? "message" : "data";
        var data = e[key];
        console.log('on Message: ' + data);
        if (data != null && data.indexOf('swapcast-') !== -1) {
          var content = data.substring(9);

          chrome.runtime.sendMessage({unreadMessagesCount: content}, function() { });

          btn = document.getElementById('SwapcastEmbedded_AppBtn');
          if (btn != null) {
            //var inner = '<div class="radius-button-red ng-scope ng-binding">'+content+'</div>';
            btn.innerHTML = content;//? inner : '';
          }
        }

      },false);

    } catch (err) {
      console.log(err);
    }

  }
})();