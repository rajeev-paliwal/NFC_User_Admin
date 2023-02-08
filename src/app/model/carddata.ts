export class Carddata {
       CardHolderid  : number  ;
       UniqId  : string ;
       FirstName  : string ;
       MiddleName  :  string;
       LastName  : string ;
       CardAddress  : string ;
       PhoneNo1  : string ;
       PhoneNoType1  :string  ;
       PhoneNo2  : string ;
       PhoneNoType2  :string  ;
       PhoneNo3  :  string;
       PhoneNoType3  : string ;
       Email  : string ;
       Organization  : string ;
       Photo  : string ;
       Title  : string ;
       Birthday  :string  ;
       Website  : string ;
       Note  :string  ;
       Facebook  :  string;
       LinkedIn  :  string;
       Instgram  : string ;
       Snapchat  : string ;
       Telegram  : string ;
       Youtube  : string ;
       Skype  : string ;
       Tweeter  :string  ;
       Tiktok  :  string;
       Maxtakatak  :string  ;
       WhatsApp  :string  ;
       IsActive  : boolean  ;
       WebURlAddress  : string ;
       UserName  : string ;
       pwd  : string ;
       QRCodeImgPath:string ;
}

export class cls_uploadpic {
       
CardHolderid: number;
UniqId: string;
UserName: string;
imagebytes: string;
ImagePath: string;
fileext: string;
            
}
export class PasswordUpdateResponse
    {
          Data :number ;
         Message :string;  
    }

    export class PasswordUpdateReq
    {
          CardHolderid :number  
         UniqId :string;  
         UserName :string;  
         Pwd :string;  

         Rpwd:string;  
    }