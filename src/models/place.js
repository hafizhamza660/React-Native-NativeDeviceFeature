class Place {
    constructor(titile,imageUri,address,location){
        this.titile=titile;
        this.imageUri=imageUri;
        this.address=address;
        this.location=location; // {lat: , long:}
        this.id = new Date().toString()+ Math.random().toString();
    }
}