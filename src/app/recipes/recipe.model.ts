export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public image_path: string;
    public directions: string[];
    public ingredients: string[];

    constructor(id: number, name: string, description: string, image_path: string, directions: string[], ingredients: string[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image_path = image_path;
        this.directions = directions;
        this.ingredients = ingredients;
    }
}