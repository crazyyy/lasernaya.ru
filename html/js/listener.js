"use strict";setInterval(function(){if(document.getElementById("jivo_container")){var e=document.getElementById("jivo_container").contentWindow.document,t=e.getElementById("submit");t&&!t.dataset.r7k12EventDone&&(t.dataset.r7k12EventDone=1,e.getElementById("submit").addEventListener("mousedown",function(){var e=document.getElementById("jivo_container").contentWindow.document,t=e.getElementById("phone"),n=e.getElementById("email"),i=e.getElementById("name")||e.getElementById("client_name"),d=e.getElementById("message");R7K12.crm({type:"JivoSite",title:"Заявка с JivoSite",phone:t?t.value:"",email:n?n.value:"",name:i?i.value:"",comment:d?d.value:""})}))}},100),window.e_client_vars={r7k12id:window.r7k12_si},setInterval(function(){if(window.flexbe_cli)for(var e=document.forms,t='<input name="type[99999]" value="text" type="hidden"><input name="vars[99999]" value="r7k12id" type="hidden"><input name="form[99999]" value="'+r7k12_si+'" type="hidden">',n=0;n<e.length;n++)if(1!=e[n].dataset.r7k12){e[n].dataset.r7k12=1;var i=document.createElement("div");i.className="form_fields_user",i.innerHTML=t,e[n].insertBefore(i,e[n].firstElementChild)}},100);
//# sourceMappingURL=maps/listener.js.map