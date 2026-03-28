import{a as u,S as d,i}from"./assets/vendor-BzeJ7Hez.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="https://pixabay.com/api/",m="38421129-385ad5ee77a37193a2d5ae11d";function p(s){return u.get(f,{params:{key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data)}const c=document.querySelector(".gallery"),y=new d(".gallery a",{captionsData:"alt",captionDelay:250}),l=document.querySelector(".loader");function h(s){const o=s.map(t=>`
        <li class="gallery-item">
        <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}"/>
        </a>
        
        <div class="info">
  <p><b>Likes: </b>${t.likes}</p>
  <p><b>Views: </b>${t.views}</p>
  <p><b>Comments: </b>${t.comments}</p>
  <p><b>Downloads: </b>${t.downloads}</p>
</div>
        </li>`).join("");c.insertAdjacentHTML("beforeend",o),y.refresh()}function g(){c.innerHTML=""}function b(){l.classList.remove("hidden")}function L(){l.classList.add("hidden")}const S=document.querySelector(".form");S.addEventListener("submit",q);function q(s){s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(!o){i.error({message:"Please enter a search query"});return}g(),b(),p(o).then(t=>{const n=t.hits;if(n.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}h(n)}).catch(t=>{console.log(t)}).finally(()=>{L()}),s.target.reset()}
//# sourceMappingURL=index.js.map
