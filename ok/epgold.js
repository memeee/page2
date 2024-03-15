
// https://github.com/abdolence/x2js/blob/master/xml2json.min.js 
(function(a,b){if(typeof define==="function"&&define.amd){define([],b);}else{if(typeof exports==="object"){module.exports=b();}else{a.X2JS=b();}}}(this,function(){return function(z){var t="1.2.0";z=z||{};i();u();function i(){if(z.escapeMode===undefined){z.escapeMode=true;}z.attributePrefix=z.attributePrefix||"_";z.arrayAccessForm=z.arrayAccessForm||"none";z.emptyNodeForm=z.emptyNodeForm||"text";if(z.enableToStringFunc===undefined){z.enableToStringFunc=true;}z.arrayAccessFormPaths=z.arrayAccessFormPaths||[];if(z.skipEmptyTextNodesForObj===undefined){z.skipEmptyTextNodesForObj=true;}if(z.stripWhitespaces===undefined){z.stripWhitespaces=true;}z.datetimeAccessFormPaths=z.datetimeAccessFormPaths||[];if(z.useDoubleQuotes===undefined){z.useDoubleQuotes=false;}z.xmlElementsFilter=z.xmlElementsFilter||[];z.jsonPropertiesFilter=z.jsonPropertiesFilter||[];if(z.keepCData===undefined){z.keepCData=false;}}var h={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function u(){}function x(B){var C=B.localName;if(C==null){C=B.baseName;}if(C==null||C==""){C=B.nodeName;}return C;}function r(B){return B.prefix;}function s(B){if(typeof(B)=="string"){return B.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}else{return B;}}function k(B){return B.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,"&");}function w(C,F,D,E){var B=0;for(;B<C.length;B++){var G=C[B];if(typeof G==="string"){if(G==E){break;}}else{if(G instanceof RegExp){if(G.test(E)){break;}}else{if(typeof G==="function"){if(G(F,D,E)){break;}}}}}return B!=C.length;}function n(D,B,C){switch(z.arrayAccessForm){case"property":if(!(D[B] instanceof Array)){D[B+"_asArray"]=[D[B]];}else{D[B+"_asArray"]=D[B];}break;}if(!(D[B] instanceof Array)&&z.arrayAccessFormPaths.length>0){if(w(z.arrayAccessFormPaths,D,B,C)){D[B]=[D[B]];}}}function a(G){var E=G.split(/[-T:+Z]/g);var F=new Date(E[0],E[1]-1,E[2]);var D=E[5].split(".");F.setHours(E[3],E[4],D[0]);if(D.length>1){F.setMilliseconds(D[1]);}if(E[6]&&E[7]){var C=E[6]*60+Number(E[7]);var B=/\d\d-\d\d:\d\d$/.test(G)?"-":"+";C=0+(B=="-"?-1*C:C);F.setMinutes(F.getMinutes()-C-F.getTimezoneOffset());}else{if(G.indexOf("Z",G.length-1)!==-1){F=new Date(Date.UTC(F.getFullYear(),F.getMonth(),F.getDate(),F.getHours(),F.getMinutes(),F.getSeconds(),F.getMilliseconds()));}}return F;}function q(D,B,C){if(z.datetimeAccessFormPaths.length>0){var E=C.split(".#")[0];if(w(z.datetimeAccessFormPaths,D,B,E)){return a(D);}else{return D;}}else{return D;}}function b(E,C,B,D){if(C==h.ELEMENT_NODE&&z.xmlElementsFilter.length>0){return w(z.xmlElementsFilter,E,B,D);}else{return true;}}function A(D,J){if(D.nodeType==h.DOCUMENT_NODE){var K=new Object;var B=D.childNodes;for(var L=0;L<B.length;L++){var C=B.item(L);if(C.nodeType==h.ELEMENT_NODE){var I=x(C);K[I]=A(C,I);}}return K;}else{if(D.nodeType==h.ELEMENT_NODE){var K=new Object;K.__cnt=0;var B=D.childNodes;for(var L=0;L<B.length;L++){var C=B.item(L);var I=x(C);if(C.nodeType!=h.COMMENT_NODE){var H=J+"."+I;if(b(K,C.nodeType,I,H)){K.__cnt++;if(K[I]==null){K[I]=A(C,H);n(K,I,H);}else{if(K[I]!=null){if(!(K[I] instanceof Array)){K[I]=[K[I]];n(K,I,H);}}(K[I])[K[I].length]=A(C,H);}}}}for(var E=0;E<D.attributes.length;E++){var F=D.attributes.item(E);K.__cnt++;K[z.attributePrefix+F.name]=F.value;}var G=r(D);if(G!=null&&G!=""){K.__cnt++;K.__prefix=G;}if(K["#text"]!=null){K.__text=K["#text"];if(K.__text instanceof Array){K.__text=K.__text.join("\n");}if(z.stripWhitespaces){K.__text=K.__text.trim();}delete K["#text"];if(z.arrayAccessForm=="property"){delete K["#text_asArray"];}K.__text=q(K.__text,I,J+"."+I);}if(K["#cdata-section"]!=null){K.__cdata=K["#cdata-section"];delete K["#cdata-section"];if(z.arrayAccessForm=="property"){delete K["#cdata-section_asArray"];}}if(K.__cnt==0&&z.emptyNodeForm=="text"){K="";}else{if(K.__cnt==1&&K.__text!=null){K=K.__text;}else{if(K.__cnt==1&&K.__cdata!=null&&!z.keepCData){K=K.__cdata;}else{if(K.__cnt>1&&K.__text!=null&&z.skipEmptyTextNodesForObj){if((z.stripWhitespaces&&K.__text=="")||(K.__text.trim()=="")){delete K.__text;}}}}}delete K.__cnt;if(z.enableToStringFunc&&(K.__text!=null||K.__cdata!=null)){K.toString=function(){return(this.__text!=null?this.__text:"")+(this.__cdata!=null?this.__cdata:"");};}return K;}else{if(D.nodeType==h.TEXT_NODE||D.nodeType==h.CDATA_SECTION_NODE){return D.nodeValue;}}}}function o(I,F,H,C){var E="<"+((I!=null&&I.__prefix!=null)?(I.__prefix+":"):"")+F;if(H!=null){for(var G=0;G<H.length;G++){var D=H[G];var B=I[D];if(z.escapeMode){B=s(B);}E+=" "+D.substr(z.attributePrefix.length)+"=";if(z.useDoubleQuotes){E+='"'+B+'"';}else{E+="'"+B+"'";}}}if(!C){E+=">";}else{E+="/>";}return E;}function j(C,B){return"</"+(C.__prefix!=null?(C.__prefix+":"):"")+B+">";}function v(C,B){return C.indexOf(B,C.length-B.length)!==-1;}function y(C,B){if((z.arrayAccessForm=="property"&&v(B.toString(),("_asArray")))||B.toString().indexOf(z.attributePrefix)==0||B.toString().indexOf("__")==0||(C[B] instanceof Function)){return true;}else{return false;}}function m(D){var C=0;if(D instanceof Object){for(var B in D){if(y(D,B)){continue;}C++;}}return C;}function l(D,B,C){return z.jsonPropertiesFilter.length==0||C==""||w(z.jsonPropertiesFilter,D,B,C);}function c(D){var C=[];if(D instanceof Object){for(var B in D){if(B.toString().indexOf("__")==-1&&B.toString().indexOf(z.attributePrefix)==0){C.push(B);}}}return C;}function g(C){var B="";if(C.__cdata!=null){B+="<![CDATA["+C.__cdata+"]]>";}if(C.__text!=null){if(z.escapeMode){B+=s(C.__text);}else{B+=C.__text;}}return B;}function d(C){var B="";if(C instanceof Object){B+=g(C);}else{if(C!=null){if(z.escapeMode){B+=s(C);}else{B+=C;}}}return B;}function p(C,B){if(C===""){return B;}else{return C+"."+B;}}function f(D,G,F,E){var B="";if(D.length==0){B+=o(D,G,F,true);}else{for(var C=0;C<D.length;C++){B+=o(D[C],G,c(D[C]),false);B+=e(D[C],p(E,G));B+=j(D[C],G);}}return B;}function e(I,H){var B="";var F=m(I);if(F>0){for(var E in I){if(y(I,E)||(H!=""&&!l(I,E,p(H,E)))){continue;}var D=I[E];var G=c(D);if(D==null||D==undefined){B+=o(D,E,G,true);}else{if(D instanceof Object){if(D instanceof Array){B+=f(D,E,G,H);}else{if(D instanceof Date){B+=o(D,E,G,false);B+=D.toISOString();B+=j(D,E);}else{var C=m(D);if(C>0||D.__text!=null||D.__cdata!=null){B+=o(D,E,G,false);B+=e(D,p(H,E));B+=j(D,E);}else{B+=o(D,E,G,true);}}}}else{B+=o(D,E,G,false);B+=d(D);B+=j(D,E);}}}}B+=d(I);return B;}this.parseXmlString=function(D){var F=window.ActiveXObject||"ActiveXObject" in window;if(D===undefined){return null;}var E;if(window.DOMParser){var G=new window.DOMParser();var B=null;if(!F){try{B=G.parseFromString("INVALID","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;}catch(C){B=null;}}try{E=G.parseFromString(D,"text/xml");if(B!=null&&E.getElementsByTagNameNS(B,"parsererror").length>0){E=null;}}catch(C){E=null;}}else{if(D.indexOf("<?")==0){D=D.substr(D.indexOf("?>")+2);}E=new ActiveXObject("Microsoft.XMLDOM");E.async="false";E.loadXML(D);}return E;};this.asArray=function(B){if(B===undefined||B==null){return[];}else{if(B instanceof Array){return B;}else{return[B];}}};this.toXmlDateTime=function(B){if(B instanceof Date){return B.toISOString();}else{if(typeof(B)==="number"){return new Date(B).toISOString();}else{return null;}}};this.asDateTime=function(B){if(typeof(B)=="string"){return a(B);}else{return B;}};this.xml2json=function(B){return A(B);};this.xml_str2json=function(B){var C=this.parseXmlString(B);if(C!=null){return this.xml2json(C);}else{return null;}};this.json2xml_str=function(B){return e(B,"");};this.json2xml=function(C){var B=this.json2xml_str(C);return this.parseXmlString(B);};this.getVersion=function(){return t;};};}));


prog = {};
m3u8 = {};

async function GetM3u8(set) {
url_EPG =   set.url_EPG
url_M3u8 =  set.url_M3u8
cors_anywhere =  set.cors_anywhere||'';

m3u8.empity = [];
m3u8.lang= [];
m3u8.category = [];
m3u8.channels = {};

  return new Promise(function (resolve, reject) {
    xhr = new XMLHttpRequest();
    xhr.onload = async function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {   
        Re = /tvg-rec="(\d+)",(.*?.)\s+#EXTGRP:(.*?.)\s+(http:.*?.m3u8)/g;
        while ((m = Re.exec(xhr.responseText)) != null)
        {
          if (m3u8.channels[m[2].toUpperCase()]) {
            m3u8.channels[m[2].toUpperCase()].url2 = cors_anywhere+m[4];
          } else {
            Object.assign(m3u8.channels, {
              [m[2].toUpperCase()]: {
                "title": m[2],
                "url": cors_anywhere+m[4],
                "category": m[3],
                "rec": m[1],
              }
            })
            if (!m3u8.category.includes(m[3])) {
              m3u8.category.push(m[3])
            }
          }
        }
        resolve(await GetXMLEPG());
      }
    }
    xhr.addEventListener('load', function () {})
    xhr.open('GET', url_M3u8, true);
	xhr.onprogress = function(pe) {
  if(pe.lengthComputable) {
     //console.log( pe.total)
     //console.log( pe.loaded)
	 x = Math.round(100*pe.loaded/ pe.total)
	 console.log(x+' %') 
  }
}

    xhr.send(null);
  });
}

function GetXMLEPG() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
		  //console.log(xhr.getResponseHeader('last-modified')) 
		  //lastModified = xhr.getResponseHeader('last-modified')
		  lastModified = new Date(new Date(xhr.getResponseHeader('last-modified')).getTime())
		  console.log(lastModified) 
		  
        resolve(xmlparse(xhr.responseText));
      }
    }
    xhr.open('GET', url_EPG, true);
		xhr.onprogress = function(pe) {
  if(pe.lengthComputable) {
     //console.log( pe.total) 
     //console.log( pe.loaded) 
	 x = Math.round(100*pe.loaded/ pe.total)
	 console.log(x+' %') 
  }
}

    xhr.send(null);
  });
}

function xmlparse(doc) {
  console.log('xmlparse() start') 
  x2js = new X2JS();
  json = x2js.xml_str2json(doc);
   
  for (let ch of json.tv.channel) {
	   id = ch._id
       ico = ch?.icon?._src || 'none';
    if (Array.isArray(ch['display-name'])) {
     
      for (let info of ch['display-name'])
      {
        name = info.__text;
        lang = info._lang;
        AddM3u8(name, ico, id, lang);
      }
    }
    else {
      name = ch['display-name'].__text;
      lang = ch['display-name']._lang;
      AddM3u8(name, ico, id, lang);
    }
  }
  
  for (let programme of json.tv.programme) {
    text = programme.title.__text
    start = programme._start
    stop = programme._stop
    id = programme._channel
    if (id in prog) {
      prog[id].push({
        "start": start,
        "stop": stop,
        "text": text,
      })
    }
    else {
      Object.assign(prog, {
        [id]: [{
          "start": start,
          "stop": stop,
          "text": text,
        }]
      })
    }
  }

  return (GetProgramm(m3u8))
}

function AddM3u8(name, ico, id, lang) {
	if (!m3u8.lang.includes(lang)) m3u8.lang.push(lang) 
    if (m3u8.channels[name.toUpperCase()]) {
      Object.assign(m3u8.channels[name.toUpperCase()], {
        ico: ico,
        id: id,
        lang: lang,
      })
    }
    else {
      m3u8.empity.push(name)
    }
}

function GetProgramm(m3u8) {
	console.log('GetProgramm() start') 
  for (const [k, val] of Object.entries(m3u8.channels)) {
    Oj = []
    CH = val.id;
    url = val.url;
    if (prog[CH]) {
      programm = prog[CH];
      for (n in programm) {
        start = amp(programm[n].start);
        stop = amp(programm[n].stop);
        Oj.push({
          title: programm[n].text,
          start: start,
          stop: stop,        
        })
      }
      Object.assign(m3u8.channels[k], {
        prog: Oj,
      })
    }
  }
  return (m3u8)
}

function amp(data) {
  data = data.substr(0, 4) + "/" + data.substr(4, 2) + "/" + data.substr(6, 2) + " " + data.substr(8, 2) + ":" + data.substr(10, 2)
  return Date.parse(new Date(data)) / 1000;
}


