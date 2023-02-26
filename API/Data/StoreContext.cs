using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext       // StoreContext does the heavy lifting of interacting with the database
    {
        public StoreContext(DbContextOptions options) : base(options)       // Constructor
        {
        }

        public DbSet<Product> Products { get; set; }        // DbSet of Products
        public DbSet<Basket> Baskets { get; set; }      // DbSet of Baskets
    }
}