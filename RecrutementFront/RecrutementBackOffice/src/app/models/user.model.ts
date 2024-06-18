export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    RECRUTEUR_RH= "RECRUTEUR_RH",
    RECRUTEUR_TECHNIQUE= "RECRUTEUR_TECHNIQUE",
    
}

export class User {
    id: number | null;
    nom: string | null;
    prenom: string | null;
    email: string | null;
    motDePasse: string | null;
    
    role: Role | null;
    

    constructor(
        id: number | null = null,
        nom: string | null = null,
        prenom: string | null = null,
        email: string | null = null,
        motDePasse: string | null = null,
        role: Role | null = null,
       
    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        
        this.role = role;
    }
}
