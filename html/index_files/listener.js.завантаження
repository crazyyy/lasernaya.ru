(function(){setInterval(function () {
    if (document.getElementById('jivo_container')) {
        var iframe = document.getElementById('jivo_container'),
            iframeDoc = iframe.contentWindow.document,
            submit = iframeDoc.getElementById('submit');
        if (submit && !submit.dataset.r7k12EventDone) {
            submit.dataset.r7k12EventDone = 1;
            iframeDoc.getElementById('submit').addEventListener('mousedown',function () {
                var iframe = document.getElementById('jivo_container'),
                    iframeDoc = iframe.contentWindow.document,
                    phone = iframeDoc.getElementById('phone'),
                    email = iframeDoc.getElementById('email'),
                    name = iframeDoc.getElementById('name') || iframeDoc.getElementById('client_name'),
                    comment = iframeDoc.getElementById('message');
                R7K12.crm({
                    type: 'JivoSite',
                    title: 'Заявка с JivoSite',
                    phone : phone ? phone.value : '',
                    email : email ? email.value : '',
                    name : name ? name.value : '',
                    comment : comment ? comment.value : ''
                });
            });
        }
    }
},100);window['e_client_vars'] = {r7k12id: window['r7k12_si']};(function () {
    setInterval(function () {
        if (!window.flexbe_cli) return;
        var forms = document.forms,
            input = '<input name="type[99999]" value="text" type="hidden"><input name="vars[99999]" value="r7k12id" type="hidden"><input name="form[99999]" value="' + r7k12_si + '" type="hidden">'
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].dataset.r7k12 == 1) continue;
            forms[i].dataset.r7k12 = 1;
            var div = document.createElement('div');
            div.className = 'form_fields_user';
            div.innerHTML = input;
            forms[i].insertBefore(div,forms[i].firstElementChild);
        }
    },100);
}());})()