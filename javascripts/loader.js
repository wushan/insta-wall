jQuery(document).ready(function ($) {
    var URL = "https://api.instagram.com/v1/tags/walkinghomeco/media/recent?client_id=5c4e60cc6de3451187b3d276d173ca62";
    $.ajax({
        url: URL,
        dataType: "jsonp", // this is important
        cache: false,
        success: function (x) {
            for (var i = 0; i < x.data.length && i < 25; i++) {
                // GET THE PICTURE
                // -- options are thumbnail and large - see object for more
                var instaPicture = x.data[i].images.standard_resolution.url;
                var instaTag = x.data[i].tags;
                var instaTime = x.data[i].created_time;
                var instaAnchor = x.data[i].link;
                var instaHTML = instaHTML += "<div class='CaroselSlideItem'><img src='" + instaPicture + "'/><p>" + instaTag + "</p><p>Link:<a href='" + instaAnchor + "'>" + instaAnchor + "</a></p><p>Posted:" + instaTime + "</p></div>";
                
                // INSERT THE GALLERY
                jQuery('#datas').html(instaHTML);
            }
        },
        error: function () {
            $("#container").html("<p>There was an error in the ajax call</p>");
        }
    });
}); // ready