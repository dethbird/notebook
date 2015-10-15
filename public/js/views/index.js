var Note = Backbone.Model.extend({
});
var NotesCollection = Backbone.Collection.extend({
    model: Note
});
var notes = new NotesCollection(data);

var NotesView = Backbone.View.extend({
    notes: notes,
    events: {
        "click .thumbnail": "selectPanel",
        "click #viewer": "nextPanel"
    },
    initialize: function(){
        $(this.el).sortable();
        this.render();
    },
    render: function(){

        var that = this;
        var template = _.template($('#article-template').html());
        $.each(this.notes.models, function(i,e){
            $(that.el).append( template( { data: e.attributes }, {escape: false}) );
        });


    }
});


$(window).ready(function(){
    var notesView = new NotesView({
        el: 'section#articles'
    });
});