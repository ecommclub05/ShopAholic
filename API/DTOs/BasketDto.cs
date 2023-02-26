namespace API.DTOs
{
    public class BasketDto      // BasketDto is a Data Transfer Object (DTO) that is used to transfer data between BasketController and StoreContext 
    {
        public int Id { get; set; }     // Primary Key
        public string BuyerId { get; set; }     // Foreign Key
        public List<BasketItemDto> Items { get; set; }      // Navigation Property i.e a Basket HAS many BasketItems
    }
}