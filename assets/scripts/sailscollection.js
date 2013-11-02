/**
 * Created by Damiaan on 2-11-13.
 */
var SailsCollection = Backbone.Collection.extend({
    sailsCollection: "",
    socket: null,
    sync: function(method, model, options){
        var where = {};
        if (options.where) {
            where = {
                where: options.where
            }
        }
        if(typeof this.sailsCollection === "string" && this.sailsCollection !== "") {
            this.socket = io.connect();
            this.socket.on("connect", _.bind(function(){
                this.socket.request("/" + this.sailsCollection, where, _.bind(function(users){
                    this.set(users);
                }, this));

                this.socket.on("message", _.bind(function(msg){
                    var m = msg.verb;
                    if (m === "create") {
                        this.add(msg.data);
                    } else if (m === "update") {
                        this.get(msg.id).set(msg.data);
                    } else if (m === "destroy") {
                        this.remove(this.get(msg.id));
                    }
                }, this));
            }, this));
        } else {
            console.log("Error: Cannot retrieve models because property 'sailsCollection' not set on the collection");
        }
    }
});

var HadesServerModel = Backbone.Model.extend({
    urlRoot: '/grid'
});

var HadesCollection = SailsCollection.extend({
    sailsCollection: 'grid',
    model: HadesServerModel
});