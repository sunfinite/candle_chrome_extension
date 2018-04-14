// this is the code which will be injected into a given page...

(function() {
    // just place a div at top right
    /*var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.right = 0;
    div.textContent = 'Injected!';
    document.body.appendChild(div);*/
    var xmlhttp = new XMLHttpRequest();
    var form = document.forms[0];
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               var response = JSON.parse(xmlhttp.responseText);
               if (response.saved === true) {
                   window.localStorage.setItem('candle_sent', true);
                   alert("Form saved successfully on the server");
               }
               else if (response.saved === false) {
                   alert('We had an error saving the form on this page. But hey, we are only getting started.');
               }
               else if (response.ready === false) {
                    alert('Please talk to Alexa and fill the form before we try again:)')
               }
               else if (response.ready === true) {
                    ret = JSON.parse(response.form);
                    window.localStorage.removeItem('candle_sent');
                    for (var field in ret) {
                        form[field].value = ret[field];
                    }
               }
           }
           else if (xmlhttp.status == 400) {
               alert('We had an error saving the form on this page. But hey, we are only getting started.');
           }
           else {
               alert('We had an error saving the form on this page. But hey, we are only getting started.');
           }
        }
    };
    if (!window.localStorage.getItem('candle_sent')) {
        var form_name = form.name;
        if (form === undefined) {
            form_name = form.id;
            if (form_name === undefined) {
                alert("We could not find a supported form on this page. We are working on it!")
                return false;
            }
        }
        xmlhttp.open("POST", "https://sunfinite.tech/candle/plugin/", true);
        xmlhttp.send('name=' + form_name + '&html=' + form.innerHTML);
    }
    else {
        xmlhttp.open("GET", "https://sunfinite.tech/candle/plugin/", true);
        xmlhttp.send();
    }
        
})();
