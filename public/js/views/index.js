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
            e.set('col', i%6);
            e.set('row', i+1);
            
            var item = $(template( { data: e.attributes }, {escape: false}));
            $(that.el).append( item );
            $(item).find('div.note').html(that.md.render(e.get('note')));

            if(e.get('content')!==undefined) {
                // if(e.get('class')=="spotify"){
                //     console.log(e);
                // }
                var contentTemplate = _.template($('#template-' + e.get('class') + '-' + e.get('type')).html());
                var content = $(contentTemplate( { data: e.get('content') }, {escape: false}));
                $(item).find('div.content').html(content);
            }

        });

        gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [100, 100],
            helper: 'clone',
            resize: {
                enabled: true,
                max_size: [3, 4]
            }
        }).data('gridster');

    }
});


$(window).ready(function(){
    var notesView = new NotesView({
        el: 'ul#articles'
    });
});
