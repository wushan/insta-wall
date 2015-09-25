jQuery(document).ready(function ($) {
    var URL = "https://api.instagram.com/v1/tags/beach/media/recent?client_id=5c4e60cc6de3451187b3d276d173ca62";
    $.ajax({
        url: URL,
        dataType: "jsonp", // this is important
        cache: false,
        success: function (x) {
            for (var i = 0; i < x.data.length && i < 25; i++) {
                // GET THE PICTURE
                // -- options are thumbnail and large - see object for more
                var instaPicture = x.data[i].images.standard_resolution.url;
                var AspectW = x.data[i].images.standard_resolution.width;
                var AspectH = x.data[i].images.standard_resolution.height;
                var AspectR = AspectW/AspectH;
                var instaTag = x.data[i].tags;
                var instaTime = x.data[i].created_time;
                var instaAnchor = x.data[i].link;
                if (AspectR > 1) {
                    var instaHTML = instaHTML += "<div class='block wide'><a href='" + instaAnchor + "'><img src='" + instaPicture + "'/></a><div class='instainfos'><p>Posted:" + instaTime + "</p></div></div>";
                } else {
                    var instaHTML = instaHTML += "<div class='block'><a href='" + instaAnchor + "'><img src='" + instaPicture + "'/></a><div class='instainfos'><p>Posted:" + instaTime + "</p></div></div>";
                }
                // INSERT THE GALLERY
                jQuery('#photo-grid').html(instaHTML);
            }
        },
        complete:function(){

            jQuery('#photo-grid').prepend('<div class=grid-sizer></div>');

            var $grid = $('#photo-grid').masonry({
              itemSelector: '.block',
              columnWidth: '.grid-sizer',
              percentPosition: true
            });

            // layout Masonry after each image loads
            $grid.imagesLoaded().progress( function() {
              $grid.masonry('layout');
            });
        },
        error: function () {
            $("#container").append("<p>There was an error in the ajax call</p>");
        }
    });
}); // ready