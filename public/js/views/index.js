var Note = Backbone.Model.extend({
});
var NotesCollection = Backbone.Collection.extend({
    model: Note
});
var notes = new NotesCollection(data);
var NotesView = Backbone.View.extend({
    notes: notes,
    md: new markdownit({
      html: true,
      linkify: true,
      typographer: true
    }),
    events: {
        // "click .thumbnail": "selectPanel",
        // "click #viewer": "nextPanel"
    },
    initialize: function(){
        this.render();
    },
    render: function(){

        var that = this;
        var template = _.template($('#article-template').html());
        $.each(this.notes.models, function(i,e){
            var item = $(template( { data: e.attributes }, {escape: false}));
            $(that.el).append( item );
            $(item).find('.comments').html(that.md.render(e.get('comments')));

            if(e.get('content')!==undefined) {

                var contentTemplate = _.template($('#template-' + e.get('class') + '-' + e.get('type')).html());

                if(e.get('type')=="markdown") {
                    $(item).find('div.content').html(that.md.render(e.get('content')));
                } else {
                    var content = $(contentTemplate(
                        {
                            data: e.get('type')=="markdown" ? '' + that.md.render(e.get('content')) : e.get('content')
                        },
                        {
                            escape: false
                        }
                    ));

                    $(item).find('div.content').html(content);
                }
            }

        });

        //timeago
        $("span.timeago").timeago();

        gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [100, 100],
            helper: 'clone',
            resize: {
                enabled: true,
                max_size: [4, 4]
            }
        }).data('gridster');

         //twitter
        twttr.ready(function(){
            $.each($('div.tweet'), function(i,e){
                tweet_id = $(e).data('tweet-id');
                twttr.widgets.createTweet(
                    '' + tweet_id,
                    e
                );
            });
        });

    }
});


$(window).ready(function(){
    var notesView = new NotesView({
        el: 'ul#articles'
    });
});
