import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export  class  Scurity {

    static CardHolderid : number ;
    static UniqId :string ;
    static FirstName :string; 
    static MiddleName :string; 
    static LastName :string; 
    static Photo :string; 
    static Email :string; 
    
    static IsActive :boolean; 
    static token :string; 
    //constructor( ) { }

    static GetCardHolderid(): number {
        return this.CardHolderid;
    }
    static GetUniqId(): string {
        return this.UniqId;
    }
    static GetFirstName(): string {
        return this.FirstName;
    }
    static GetMiddleName(): string {
        return this.MiddleName;
    }
    static GetLastName(): string {
        return this.LastName;
    }
    static Gettoken(): string {
        return this.token;
    }
    static GetISActive(): boolean {
        return this.IsActive;
    }
    static GetProfilepic(): string {
        return this.Photo;
    }

    static GetEmail(): string {
        return this.Email;
    }

    static SetCardHolderid(id:number ) {
         this.CardHolderid =id;
    }
    static setUniqId(id :string ) {
         this.UniqId =id;
    }
    static SetFirstName(Fname: string ) {
         this.FirstName = Fname;
    }
    static SetMiddleName(Mname: string) {
         this.MiddleName=Mname;
    }
    static SetLastName(lname: string) {
         this.LastName =lname;
    }
    static Settoken(t:string ) {
         this.token =t;
    }
    static SetEmail(Email: string) {
        this.Email =Email;
   }
   static SetIsActive(t:boolean ) {
        this.IsActive =t;
   }
   static SetProfilepic(t:string ) {
    this.Photo =t;
}

}
