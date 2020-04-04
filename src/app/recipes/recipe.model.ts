export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public image_path: string;
    public directions: string[];
    public ingredients: string[];

    constructor(name: string, description: string, image_path: string, directions: string[], ingredients: string[]) {
        this.id = Math.floor(Math.random() * 100) + 3;
        this.name = name;
        this.description = description;
        this.image_path = image_path;
        this.directions = directions;
        this.ingredients = ingredients;
    }
}