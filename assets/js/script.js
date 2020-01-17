$(window).scroll(() => {
    var wScroll = $(this).scrollTop();
    const infoTop = $("#info-nav").offset().top + $("#info-nav").height();
    if (wScroll > infoTop) {
        $("#main-nav").addClass("fixed-top");
        $("#main-nav").addClass("shadow-sm");
    } else {
        $("#main-nav").removeClass("fixed-top");
        $("#main-nav").removeClass("shadow-sm");
    }
});
