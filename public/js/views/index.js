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
            $(item).find('div.note').html(that.md.render(e.get('note')));

            if(e.get('content')!==undefined) {

                // if(e.get('class')=="trello"){
                //     // console.log(JSON.stringify(e.get('content')));
                //     console.log(e.get('content'));
                // }

                var contentTemplate = _.template($('#template-' + e.get('class') + '-' + e.get('type')).html());
                var content = $(contentTemplate( { data: e.get('content') }, {escape: false}));
                $(item).find('div.content').html(content);

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
                    String(tweet_id),
                    e,
                    {
                      width: 200
                    }
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


// var boards =[
//     {
//         "name": "15 Minutes",
//         "desc": "Dev URL:\nhttp://15min.artistcontrolbox.com",
//         "descData": {
//             "emoji": {}
//         },
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "6O4QgHlB",
//         "powerUps": [],
//         "dateLastActivity": "2014-02-12T16:18:38.458Z",
//         "idTags": [],
//         "id": "522391357b354baf3200006f",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/6O4QgHlB/15-minutes",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "522391357b354baf32000073",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             },
//             {
//                 "id": "5225f1474068721851005344",
//                 "idMember": "5225f14640687218510052e7",
//                 "memberType": "normal",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "Website",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "API",
//             "blue": "Admin",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:30:50.479Z",
//         "shortUrl": "https://trello.com/b/6O4QgHlB"
//     },
//     {
//         "name": "Animation: Dog Store",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "FKQ5AGzm",
//         "powerUps": [],
//         "dateLastActivity": "2015-02-09T02:26:14.885Z",
//         "idTags": [],
//         "id": "54d220ddea191b142c9f26d3",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/FKQ5AGzm/animation-dog-store",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "54d220ddea191b142c9f26d4",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:30:57.414Z",
//         "shortUrl": "https://trello.com/b/FKQ5AGzm"
//     },
//     {
//         "name": "Art",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "v5vphFk5",
//         "powerUps": [],
//         "dateLastActivity": null,
//         "idTags": [],
//         "id": "5540d683ca2945bc860767d1",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/v5vphFk5/art",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "5540d683ca2945bc860767d2",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:32:25.704Z",
//         "shortUrl": "https://trello.com/b/v5vphFk5"
//     },
//     {
//         "name": "ArtistControlbox",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "wxpAUZPt",
//         "powerUps": [
//             "voting"
//         ],
//         "dateLastActivity": "2013-07-05T13:26:14.102Z",
//         "idTags": [],
//         "id": "4e7258ff077c8d0d14043731",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/wxpAUZPt/artistcontrolbox",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "members",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": true,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "4e7258ff077c8d0d14043730",
//                 "idMember": "4e6a7fad05d98b02ba00845c",
//                 "memberType": "normal",
//                 "unconfirmed": false,
//                 "deactivated": false
//             },
//             {
//                 "id": "4e7258ff077c8d0d1404373b",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2013-06-26T17:03:20.902Z",
//         "shortUrl": "https://trello.com/b/wxpAUZPt"
//     },
//     {
//         "name": "ArtistControlbox",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "oYWUIm8E",
//         "powerUps": [],
//         "dateLastActivity": "2013-07-01T16:38:50.263Z",
//         "idTags": [],
//         "id": "50e4c918a4585d6f62008494",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/oYWUIm8E/artistcontrolbox",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "50e4c918a4585d6f62008498",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "PUBLIC",
//             "yellow": "",
//             "orange": "ARTIST",
//             "red": "ADMIN",
//             "purple": "API",
//             "blue": "OPS",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:30:32.015Z",
//         "shortUrl": "https://trello.com/b/oYWUIm8E"
//     },
//     {
//         "name": "ArtistControlbox R3",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "0B0e1x0A",
//         "powerUps": [],
//         "dateLastActivity": null,
//         "idTags": [],
//         "id": "502697ecf4732a8d2d621156",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/0B0e1x0A/artistcontrolbox-r3",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "502697ecf4732a8d2d62115a",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2013-06-26T17:05:19.567Z",
//         "shortUrl": "https://trello.com/b/0B0e1x0A"
//     },
//     {
//         "name": "BuddyMedia",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "Bjz2b7np",
//         "powerUps": [],
//         "dateLastActivity": null,
//         "idTags": [],
//         "id": "4f7a1b9c332ce23a2c198224",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/Bjz2b7np/buddymedia",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "4f7a1b9c332ce23a2c19822b",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2012-12-14T19:40:24.854Z",
//         "shortUrl": "https://trello.com/b/Bjz2b7np"
//     },
//     {
//         "name": "Comics and Illustrations",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "KEh1ZUZ0",
//         "powerUps": [
//             "cardAging",
//             "calendar"
//         ],
//         "dateLastActivity": "2015-02-04T13:22:41.742Z",
//         "idTags": [],
//         "id": "522dff211f61a2c01f000e83",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/KEh1ZUZ0/comics-and-illustrations",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "pirate",
//             "calendarFeedEnabled": true,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "522dff211f61a2c01f000e87",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:32:55.839Z",
//         "shortUrl": "https://trello.com/b/KEh1ZUZ0"
//     },
//     {
//         "name": "DELETEDELETE",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "sP38dWl7",
//         "powerUps": [],
//         "dateLastActivity": "2015-04-06T14:08:24.570Z",
//         "idTags": [],
//         "id": "5517effb5d474ad8de477ba7",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/sP38dWl7/deletedelete",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "5517effb5d474ad8de477ba8",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "New Dev",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "Cleanup",
//             "blue": "Ops",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:30:13.873Z",
//         "shortUrl": "https://trello.com/b/sP38dWl7"
//     },
//     {
//         "name": "Hot Fog Cover",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "ovzsP2Pc",
//         "powerUps": [],
//         "dateLastActivity": "2014-01-13T00:33:02.346Z",
//         "idTags": [],
//         "id": "52b9b81644a47841690296b2",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/ovzsP2Pc/hot-fog-cover",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "52b9b81644a47841690296b6",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2014-05-28T03:50:01.243Z",
//         "shortUrl": "https://trello.com/b/ovzsP2Pc"
//     },
//     {
//         "name": "Mail the Horse",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "ze7bewId",
//         "powerUps": [],
//         "dateLastActivity": "2015-09-20T22:37:39.683Z",
//         "idTags": [],
//         "id": "55feab219bb056ee6f89f72d",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/ze7bewId/mail-the-horse",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "55feab219bb056ee6f89f72e",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:30:23.106Z",
//         "shortUrl": "https://trello.com/b/ze7bewId"
//     },
//     {
//         "name": "Moving to NYC",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "eJbR5sdE",
//         "powerUps": [],
//         "dateLastActivity": "2013-08-28T21:10:23.651Z",
//         "idTags": [],
//         "id": "51f92dff0888105403002ddd",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/eJbR5sdE/moving-to-nyc",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "51f92dff0888105403002de1",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "San Francisco",
//             "yellow": "",
//             "orange": "",
//             "red": "Work",
//             "purple": "",
//             "blue": "New York",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2013-12-09T16:28:22.366Z",
//         "shortUrl": "https://trello.com/b/eJbR5sdE"
//     },
//     {
//         "name": "Music",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "ptfn01pz",
//         "powerUps": [],
//         "dateLastActivity": "2015-04-29T13:07:57.325Z",
//         "idTags": [],
//         "id": "5540d6175435122f52558761",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/ptfn01pz/music",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "5540d6175435122f52558762",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-04-29T13:07:57.403Z",
//         "shortUrl": "https://trello.com/b/ptfn01pz"
//     },
//     {
//         "name": "Notebook",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "cJwQEWIi",
//         "powerUps": [],
//         "dateLastActivity": "2015-10-17T17:53:36.518Z",
//         "idTags": [],
//         "id": "56154937335201688e33a7ca",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/cJwQEWIi/notebook",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "56154937335201688e33a7cb",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "Research",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-18T11:41:54.789Z",
//         "shortUrl": "https://trello.com/b/cJwQEWIi"
//     },
//     {
//         "name": "Presidency",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "hoTjDKlV",
//         "powerUps": [],
//         "dateLastActivity": "2015-09-08T16:32:53.518Z",
//         "idTags": [],
//         "id": "55eee1897b54b3911d5f68ce",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/hoTjDKlV/presidency",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "55eee1897b54b3911d5f68cf",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-09-11T12:04:05.056Z",
//         "shortUrl": "https://trello.com/b/hoTjDKlV"
//     },
//     {
//         "name": "RishiSatsangi.com",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "OBzaEOAT",
//         "powerUps": [
//             "calendar",
//             "cardAging",
//             "voting"
//         ],
//         "dateLastActivity": "2015-10-08T19:25:22.225Z",
//         "idTags": [],
//         "id": "52a5efe406304483430025fb",
//         "invited": false,
//         "starred": true,
//         "url": "https://trello.com/b/OBzaEOAT/rishisatsangi-com",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "members",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "52a5efe406304483430025ff",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-15T20:28:12.870Z",
//         "shortUrl": "https://trello.com/b/OBzaEOAT"
//     },
//     {
//         "name": "Salesforce/BuddyMedia",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "JqM1E2mu",
//         "powerUps": [
//             "cardAging",
//             "calendar"
//         ],
//         "dateLastActivity": "2014-10-09T14:50:37.340Z",
//         "idTags": [],
//         "id": "511e7497a3ddbd80720008cd",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/JqM1E2mu/salesforce-buddymedia",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "pirate",
//             "calendarFeedEnabled": true,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "511e7497a3ddbd80720008d1",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "Feature",
//             "yellow": "Investigate",
//             "orange": "",
//             "red": "Bug",
//             "purple": "Code Review",
//             "blue": "One-off",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:30:01.460Z",
//         "shortUrl": "https://trello.com/b/JqM1E2mu"
//     },
//     {
//         "name": "The Dwarves",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "n8pCOnZk",
//         "powerUps": [],
//         "dateLastActivity": null,
//         "idTags": [],
//         "id": "4f79d677b196f6257a56b831",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/n8pCOnZk/the-dwarves",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "4f79d677b196f6257a56b838",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2012-04-02T21:35:24.898Z",
//         "shortUrl": "https://trello.com/b/n8pCOnZk"
//     },
//     {
//         "name": "The Orchard",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "VXFynFId",
//         "powerUps": [
//             "calendar"
//         ],
//         "dateLastActivity": "2015-10-16T18:56:44.667Z",
//         "idTags": [],
//         "id": "5464cce60c05617521961318",
//         "invited": false,
//         "starred": true,
//         "url": "https://trello.com/b/VXFynFId/the-orchard",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "5464cce60c05617521961319",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "Road Map",
//             "yellow": "",
//             "orange": "Assist",
//             "red": "Emergency Bug",
//             "purple": "Bug",
//             "blue": "Developer",
//             "sky": "Fixin",
//             "lime": "",
//             "pink": "Merged",
//             "black": ""
//         },
//         "dateLastView": "2015-10-16T18:56:51.022Z",
//         "shortUrl": "https://trello.com/b/VXFynFId"
//     },
//     {
//         "name": "The Show",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "K5UT3yNB",
//         "powerUps": [],
//         "dateLastActivity": null,
//         "idTags": [],
//         "id": "5597ee45308349e86f6ffd40",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/K5UT3yNB/the-show",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "5597ee45308349e86f6ffd41",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:31:05.815Z",
//         "shortUrl": "https://trello.com/b/K5UT3yNB"
//     },
//     {
//         "name": "Video Games",
//         "desc": "Edits to my personal website",
//         "descData": null,
//         "closed": false,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "6R4dUIWR",
//         "powerUps": [],
//         "dateLastActivity": "2015-10-09T18:52:33.597Z",
//         "idTags": [],
//         "id": "4f79ec8c0c40f5134c8b75da",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/6R4dUIWR/video-games",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "4f79ec8c0c40f5134c8b75e5",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "Labs",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-15T02:34:44.492Z",
//         "shortUrl": "https://trello.com/b/6R4dUIWR"
//     },
//     {
//         "name": "Website",
//         "desc": "",
//         "descData": null,
//         "closed": false,
//         "idOrganization": "55de4ff5c887dcbac2c82991",
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "elcSlWEt",
//         "powerUps": [],
//         "dateLastActivity": "2015-09-19T18:15:32.380Z",
//         "idTags": [],
//         "id": "55de4ffd4cff45d2c20b7d59",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/elcSlWEt/website",
//         "prefs": {
//             "permissionLevel": "org",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": true,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "55de4ffd4cff45d2c20b7d5a",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-09-21T13:47:32.548Z",
//         "shortUrl": "https://trello.com/b/elcSlWEt"
//     },
//     {
//         "name": "dlt.tw",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "q2ccvWOJ",
//         "powerUps": [],
//         "dateLastActivity": "2015-04-22T11:11:38.027Z",
//         "idTags": [],
//         "id": "55295ffe19471bd1733ad473",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/q2ccvWOJ/dlt-tw",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "55295ffe19471bd1733ad474",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "",
//             "yellow": "",
//             "orange": "",
//             "red": "",
//             "purple": "",
//             "blue": "",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": "PREMIUM"
//         },
//         "dateLastView": "2015-10-07T16:31:13.437Z",
//         "shortUrl": "https://trello.com/b/q2ccvWOJ"
//     },
//     {
//         "name": "trkr",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": null,
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "S2txy1pg",
//         "powerUps": [
//             "cardAging",
//             "calendar"
//         ],
//         "dateLastActivity": "2014-09-18T20:32:01.597Z",
//         "idTags": [],
//         "id": "53855d6a56c875bd6159715e",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/S2txy1pg/trkr",
//         "prefs": {
//             "permissionLevel": "private",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": false,
//             "cardCovers": true,
//             "cardAging": "pirate",
//             "calendarFeedEnabled": true,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "53855d6a56c875bd61597162",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "Feature",
//             "yellow": "",
//             "orange": "Systems",
//             "red": "Bug",
//             "purple": "Marketing",
//             "blue": "UX",
//             "sky": "",
//             "lime": "",
//             "pink": "",
//             "black": ""
//         },
//         "dateLastView": "2015-10-07T16:31:25.786Z",
//         "shortUrl": "https://trello.com/b/S2txy1pg"
//     },
//     {
//         "name": "wedding site",
//         "desc": "",
//         "descData": null,
//         "closed": true,
//         "idOrganization": "5516ca7995014a589a29ed38",
//         "pinned": null,
//         "invitations": null,
//         "shortLink": "qXfS7SVj",
//         "powerUps": [],
//         "dateLastActivity": "2015-04-12T13:35:51.692Z",
//         "idTags": [],
//         "id": "54fa38da2ce5cffb5c2c18df",
//         "invited": false,
//         "starred": false,
//         "url": "https://trello.com/b/qXfS7SVj/wedding-site",
//         "prefs": {
//             "permissionLevel": "org",
//             "voting": "disabled",
//             "comments": "members",
//             "invitations": "members",
//             "selfJoin": true,
//             "cardCovers": true,
//             "cardAging": "regular",
//             "calendarFeedEnabled": false,
//             "background": "blue",
//             "backgroundColor": "#0079BF",
//             "backgroundImage": null,
//             "backgroundImageScaled": null,
//             "backgroundTile": false,
//             "backgroundBrightness": "unknown",
//             "canBePublic": true,
//             "canBeOrg": true,
//             "canBePrivate": true,
//             "canInvite": true
//         },
//         "memberships": [
//             {
//                 "id": "54fa38da2ce5cffb5c2c18e0",
//                 "idMember": "4e7258ff077c8d0d140436ce",
//                 "memberType": "admin",
//                 "unconfirmed": false,
//                 "deactivated": false
//             }
//         ],
//         "subscribed": false,
//         "labelNames": {
//             "green": "dev",
//             "yellow": "",
//             "orange": "",
//             "red": "bug",
//             "purple": "systems",
//             "blue": "design",
//             "sky": "",
//             "lime": "",
//             "pink": "labs",
//             "black": "unused"
//         },
//         "dateLastView": "2015-10-07T16:30:40.720Z",
//         "shortUrl": "https://trello.com/b/qXfS7SVj"
//     }
// ];
// // console.log(boards);
// console.log(JSON.stringify(boards[15]));
