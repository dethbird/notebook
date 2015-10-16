var Note = Backbone.Model.extend({
});
var NotesCollection = Backbone.Collection.extend({
    model: Note
});
var notes = new NotesCollection(data);

var NotesView = Backbone.View.extend({
    notes: notes,
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
            $(that.el).append( template( { data: e.attributes }, {escape: false}) );
        });

        gridster = $(".gridster > ul").gridster({
            widget_margins: [10, 10],
            widget_base_dimensions: [100, 60],
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