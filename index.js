var menu = "";
var converter = new showdown.Converter({tables: true, simpleLineBreaks: true, ghCodeBlocks: true, metadata: true});
var open_items = [];

function setMenu(tags = []) {
    $("#contents-items").empty();
    activeTags = new Set();
    for(var i = 0; i < menu.content.length; i++) {
    // Loop through each tag and check if 
    if(tags.length > 0) {
        var breakItem = false;
        for(var t = 0; t < tags.length; t++) {
        if(!menu.content[i].tags.includes(tags[t])) {
            breakItem = true;
            break;
        }
        }
        if(breakItem) {
        continue;
        }
    }
    for(var t = 0; t < menu.content[i].tags.length; t++) {
        activeTags.add(menu.content[i].tags[t]);
    }
    var item = menu.content[i];
    $("#contents-items").append(`<div class="MenuItem" data-id="${item.id}">
    <div class="MenuItem-Title">${item.title}</div><div class="MenuItem-SubLine">
        Published: ${item.published_on} | Tags: ${item.tags} 
    </div>
    </div>`);
    }
    setDisabledTags(activeTags);
}

function setDisabledTags(activeTags) {
    $(".content-Tag").removeClass("content-Tag-Disabled");
    $(".content-Tag").each(function(){
    if(!activeTags.has($(this).text())) {
        $(this).toggleClass("content-Tag-Disabled");
    }
    });
}

function menuUpdate() {
    $.getJSON('menu.json?_=' + new Date().getTime(), function(data) { // Timestamp to prevent browser cache
        menu = data;
        setMenu(); 
        setTags();
    }); 
}

function loadItem(id) {
    // Update URL id/path/name - Only use the ID, path/name for SEO
    var item = "";
    for(var i = 0; i < menu.content.length; i++) {
        if(menu.content[i].id == id) {
            item = menu.content[i];
            break;
        }
    }

    open_items.push(item);
    update_open_items();

    var url = `/Articles/${item.location.join("/")}/${item.file_name}`;
    $.get(encodeURIComponent(url), function(data) {
        document.getElementById('viewer-page').innerHTML = converter.makeHtml(data);//md.render(data);
        hljs.highlightAll();
        //console.log(converter.getMetadata(true));
        //console.log(converter.getMetadataFormat());
    }, "text");
}

$(document).on("click", ".MenuItem", function(e){
    hideContents();
    loadItem($(this).attr("data-id"));
});

$(document).on("click", ".content-Tag", function(e){
    if(!$(this).hasClass("content-Tag-Disabled")) {
    $(this).toggleClass("content-Tag-Selected");
    var tags = [];
    $(".content-Tag-Selected").each(function(){
        tags.push($(this).text());
    });
    setMenu(tags);
    }
});

function setTags() {
    for(var i = 0; i < menu.tags.length; i++) {
    $("#contents-tags").append(`<span class="content-Tag">${menu.tags[i]}</span>`);
    }
}

$(document).ready(function() {
    menuUpdate();
});

function hideContents() {
    $("#contents").hide();
}

function update_open_items() {
    $("#open-items").empty();
    for(var i = 0; i < open_items.length; i++) {
        $("#open-items").append(`<div class="open-items-item">${open_items[i].title}</span>`);
    }
}