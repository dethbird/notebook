$(window).ready(function(){
    $('main').sortable();
    $('article').each(function(i,e){
        e = $(e);
        // console.log(e.data('weight'));
        // console.log(6/e.data('weight') + 'em');
        // e.css('font-size', 0.75 + (e.data('weight')/6) + 'em');
    });
});
