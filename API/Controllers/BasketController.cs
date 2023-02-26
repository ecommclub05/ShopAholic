using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController       // BasketController does the heavy lifting of interacting with the Basket
    {
        private readonly StoreContext _context;     // Inject the StoreContext
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]       
        public async Task<ActionResult<BasketDto>> GetBasket()      // Get the Basket
        {
            var basket = await RetrieveBasket();        // Retrieve the Basket from the database

            if (basket == null) return NotFound();      // If the Basket does not exist then return NotFound

            return new BasketDto                // If the Basket does exist then return the Basket
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)     // Add a Product to the Basket
        {
            var basket = await RetrieveBasket();        // Retrieve the Basket from the database
            if (basket == null) basket = CreateBasket();        // If the Basket does not exist then create a new Basket

            var product = await _context.Products.FindAsync(productId);     // Retrieve the Product from the database

            if (product == null) return NotFound();     // If the Product does not exist then return NotFound

            basket.AddItem(product, quantity);      // Add the Product to the Basket

            var result = await _context.SaveChangesAsync() > 0;     // Save the changes to the database

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));    // If the changes were saved successfully then return CreatedAtRoute

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });      // If the changes were not saved successfully then return BadRequest
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity = 1)       // Remove a Product from the Basket
        {
            var basket = await RetrieveBasket();        // Retrieve the Basket from the database

            if (basket == null) return NotFound();      // If the Basket does not exist then return NotFound

            basket.RemoveItem(productId, quantity);     // Remove the Product from the Basket

            var result = await _context.SaveChangesAsync() > 0;     // Save the changes to the database

            if (result) return Ok();        // If the changes were saved successfully then return Ok

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });      // If the changes were not saved successfully then return BadRequest
        }

        private async Task<Basket> RetrieveBasket()     // Retrieve the Basket from the database(method is private because it is only used in this class)
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()       // Create a new Basket(method is private because it is only used in this class)
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)     // Map the Basket to a BasketDto(method is private because it is only used in this class)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}