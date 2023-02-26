namespace API.DTOs
{
    public class BasketItemDto      // BasketItemDto is a Data Transfer Object (DTO) that is used to transfer data between BasketController and StoreContext
    {
        public int ProductId { get; set; }    
        public string Name { get; set; }       
        public long Price { get; set; }     
        public string PictureUrl { get; set; }      
        public string Brand { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }       
    }
}