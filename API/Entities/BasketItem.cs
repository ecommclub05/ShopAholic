using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }     // Primary Key
        public int Quantity { get; set; }       // Quantity of Product in Basket

        // navigation properties
        public int ProductId { get; set; }      // Foreign Key
        public Product Product { get; set; }    // Navigation Property i.e a BasketItem HAS A Product        

        public int BasketId { get; set; }    // Foreign Key
        public Basket Basket { get; set; }  // Navigation Property i.e a BasketItem is part of a Basket, this completes the relationship i.e if we delete a Basket then all BasketItems are deleted
    }
}