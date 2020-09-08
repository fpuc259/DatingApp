using System;
namespace DatingApp.api.DTOs
{
    public class PhotoForReturnDto
    {

    
        public int Id { get; set; }
        public string Url { get; set; }
        public string Introduction { get; set; }
        public DateTime DateAdded { get; set; }
        public bool isMain { get; set; }
        public int MyProperty { get; set; }
     }
        
    

    }
