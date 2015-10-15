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
        // $(this.el).sortable({
        //     start: function(i,e){
        //         $(this).find('article').removeClass('animation-target');
        //     },
        //     stop: function(i,e){
        //         // console.log(e.item);
        //         e.item.addClass('animation-target');
        //     }
        // });
        this.render();
    },
    render: function(){

        var that = this;
        var template = _.template($('#article-template').html());
        $.each(this.notes.models, function(i,e){
            e.set('cols', 0 + e.get('weight'));
            e.set('rows', 50 * e.get('weight'));
            $(that.el).append( template( { data: e.attributes }, {escape: false}) );
        });

        $('section#articles').sortable({
            items: 'article',
            grid: [160, 50],
            tolerance: "pointer"
        });

        // $('section#articles').gridster();

    }
});


$(window).ready(function(){
    var notesView = new NotesView({
        el: 'section#articles'
    });
});