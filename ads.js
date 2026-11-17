/* Optional Google AdSense for the public study pages only (not the app, tests or checkout).
   Loaded only when ADSENSE_CLIENT is set at build time. Ads load ONLY after a visitor
   accepts the prompt; the choice is stored in localStorage as "pep_ads_consent". */
(function(){
  var s = document.currentScript, client = s && s.getAttribute("data-client");
  if(!client || !/^ca-pub-\d{6,20}$/.test(client)) return;
  // Never show ads inside the installed Android/PWA app.
  try{
    if(/[?&]app=play/.test(location.search) || sessionStorage.getItem("pep_in_play_app")==="1") return;
    if(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return;
  }catch(e){}
  var KEY = "pep_ads_consent";
  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }
  function load(){
    if(document.querySelector("script[data-pep-ads]")) return;
    var a = document.createElement("script");
    a.async = true; a.crossOrigin = "anonymous"; a.setAttribute("data-pep-ads","1");
    a.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(client);
    document.head.appendChild(a);
  }
  function banner(){
    var b = document.createElement("div");
    b.setAttribute("role","dialog"); b.setAttribute("aria-label","Ads and cookies");
    b.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:560px;margin:0 auto;background:#0B1F3A;color:#fff;border-radius:12px;padding:14px 16px;box-shadow:0 6px 24px rgba(0,0,0,.35);font:14px/1.45 system-ui,sans-serif";
    b.innerHTML = '<div style="margin-bottom:10px">Free study pages are supported by ads. Allow ads and the cookies they use? Declining keeps the pages ad-free. See our <a href="/#/privacy" style="color:#FFB27A">Privacy policy</a>.</div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end"><button type="button" data-v="no" style="padding:8px 14px;border-radius:8px;border:1px solid #6b7f99;background:transparent;color:#fff;cursor:pointer">No ads</button>' +
      '<button type="button" data-v="yes" style="padding:8px 14px;border-radius:8px;border:0;background:#FF7A2F;color:#fff;font-weight:600;cursor:pointer">Allow ads</button></div>';
    b.addEventListener("click", function(e){
      var v = e.target && e.target.getAttribute && e.target.getAttribute("data-v");
      if(!v) return; set(v); b.remove(); if(v==="yes") load();
    });
    document.body.appendChild(b);
  }
  var c = get();
  if(c==="yes") load(); else if(c!=="no") banner();
})();
