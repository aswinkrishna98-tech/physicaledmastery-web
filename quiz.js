// Progressive enhancement for the free sample quizzes on the static pages.
// Without JavaScript the "Answer and explanation" disclosure still works.
(function(){
  var quiz=document.getElementById("quiz"); if(!quiz) return;
  var qs=quiz.querySelectorAll(".qz"), answered=0, right=0, started=false;
  function track(n,p){try{ if(window.plausible) window.plausible(n,{props:p}); else if(window.umami&&window.umami.track) window.umami.track(n,p);}catch(e){}}
  qs.forEach(function(li){
    li.addEventListener("change",function(e){
      if(li.dataset.done||!e.target||e.target.type!=="radio") return;
      li.dataset.done="1"; answered++;
      if(!started){started=true; track("start_sample_quiz",{page:location.pathname});}
      var c=+li.dataset.c, v=+e.target.value, labels=li.querySelectorAll("label");
      labels.forEach(function(l,i){ l.querySelector("input").disabled=true; if(i===c) l.classList.add("correct"); else if(i===v) l.classList.add("wrong"); });
      if(v===c) right++;
      var d=li.querySelector("details"); if(d) d.open=true;
      if(answered===qs.length){
        var s=document.getElementById("score"); s.hidden=false;
        s.innerHTML="Your score: "+right+" / "+qs.length+' &nbsp; <a class="btn" href="/#/mock-tests">Take a full mock test</a>';
        track("complete_sample_quiz",{page:location.pathname,score:right+"/"+qs.length});
      }
    });
  });
})();
