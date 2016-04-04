function User(newName){
    var name = newName;

    this.getName = function(){
        return name;
    };
}
