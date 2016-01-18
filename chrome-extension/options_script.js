"use strict";

var background = chrome.extension.getBackgroundPage();
var allowDomains = background.allowDomains;
var denyDomains = background.denyDomains;

var allowDomainContainer = document.getElementById("allow-domain-container");
var denyDomainContainer = document.getElementById("deny-domain-container");

var allowDomainList = Object.keys(allowDomains.list);
if (allowDomainList.length === 0) {
    var li = document.createElement("li");
    li.innerText = "リストは空です";
    allowDomainContainer.appendChild(li);
} else {
    allowDomainList.forEach(function (domain) {
        var li = document.createElement("li");
        li.innerText = domain;
        
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "削除";
        deleteButton.className = "delete";
        deleteButton.onclick = function () {
            allowDomains.remove(domain);
            li.parentNode.removeChild(li);
        };
        li.insertBefore(deleteButton, li.firstChild);
        
        allowDomainContainer.appendChild(li);
    });
}

var denyDomainList = Object.keys(denyDomains.list);
if (denyDomainList.length === 0) {
    var li = document.createElement("li");
    li.innerText = "リストは空です";
    denyDomainContainer.appendChild(li);
} else {
    denyDomainList.forEach(function (domain) {
        var li = document.createElement("li");
        li.innerText = domain;
        
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "削除";
        deleteButton.className = "delete";
        deleteButton.onclick = function () {
            denyDomains.remove(domain);
            li.parentNode.removeChild(li);
        };
        li.insertBefore(deleteButton, li.firstChild);
        
        denyDomainContainer.appendChild(li);
    });
}