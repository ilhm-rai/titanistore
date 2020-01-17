$(window).scroll(() => {
    var wScroll = $(this).scrollTop();
    if (wScroll > 100) {
        $("#main-nav").addClass("fixed-top");
        $("#main-nav").addClass("shadow-sm");
    } else {
        $("#main-nav").removeClass("fixed-top");
        $("#main-nav").removeClass("shadow-sm");
    }
});
