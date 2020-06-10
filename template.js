function createTable(table) {
    var html = '';
    var maxCols = 0;
    var rows = "";

    table.content.forEach(function(item){
        var count = 0;
        item.data.forEach(function(){
            count++;
        })
        if(count > maxCols){
            maxCols = count;
        }
    });

    /* create rows */

    table.content.forEach(function(item){
        var td = "";
        var tag = item.type === "heading" ? "th" :"td";

        if(item.data.length < maxCols){
            td = `<${tag} colspan="${maxCols}">${item.data[0]}</${tag}>`;
        } else {
            item.data.forEach(function(col){
                td += `<${tag}>${col}</${tag}>`;
            })
        }
        rows += `<tr>${td}</tr>`
    });

    html += `
    <table class="table table-container">${rows}</table>`;
    return html;
}

function renderContent(content){
    var html = "";
    content.forEach(function(pageItem){
        if(pageItem.contentType === 'table'){
            html += `<div class="col-xs-12"> ${createTable(pageItem)} </div>`;
        } else  if(pageItem.contentType === 'image'){
            html += `<div class="col-xs-12"><img class="page-img img-center" src="${pageItem.content}"></div>`;
        }
    });
    return html;
}

window.onload = function(){
    var html = '';
    var left = '';
    var right = '';
    var pageFull = '';



    if(format.pageFull === undefined){
        left = renderContent(format.pageLeft);
        right = renderContent(format.pageRight);
        html=`<div class="container"><div class="col-xs-12"><div class="col-xs-6">${left}</div><div class="col-xs-6">${right}</div></div></div>`
    } else {
        full = renderContent(format.pageFull);
        html=`<div class="container"><div class="col-xs-12">${full}</div>`

    }
    var root = document.getElementById('root');
    root.innerHTML = html;
}