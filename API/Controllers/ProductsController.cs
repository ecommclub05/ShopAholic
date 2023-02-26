using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController     // ProductsController does the heavy lifting of interacting with the Products
    {
        private readonly StoreContext _context;     // Inject the StoreContext
        public ProductsController(StoreContext context)     // Constructor
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()        // Get all Products
        {
            return await _context.Products.ToListAsync();       // Return all Products from the database
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)     // Get a Product by Id
        {
            var product = await _context.Products.FindAsync(id);        // Retrieve the Product from the database

            if (product == null) return NotFound();     // If the Product does not exist then return NotFound

            return product;     // If the Product does exist then return the Product
        }
    }
}