class Wall{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("position",{x:x,y:y,z:z});
        this.obj.setAttribute("color","white");
        this.obj.setAttribute("width", 15);
        this.obj.setAttribute("height", 2);
        this.obj.setAttribute("depth", 15);
        this.obj.setAttribute("opacity", 0.5);
        scene.append(this.obj);
    }

    launch() {
        // Placeholder for any wall behavior if needed
        // Can be extended later for animated walls, etc.
    }
}