using API.Entities;

namespace API.Data
{
    public static class DbInitializer 
    {
        public static void Initialize(StoreContext context)     
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Red Puma T-Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/t-shirt5.png",
                    Brand = "Puma",
                    Type = "t-shirts",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Jinny & Jonny Black and White t-shirt",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products/t-shirt4.png",
                    Brand = "Jinny & Jonny",
                    Type = "t-shirts",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Rupa grey T-Shirt",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/t-shirt3.png",
                    Brand = "Rupa",
                    Type = "t-shirts",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "White Polo T-Shirt",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/t-shirt2.png",
                    Brand = "Polo", 
                    Type = "t-shirts",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Lee Cooper Black Hoodie",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/t-shirt1.png",
                    Brand = "Lee-Cooper",
                    Type = "t-shirts",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Woodland Cowboy Hat",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products/hat1.png",
                    Brand = "Woodland",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Maroon Army Cap",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/hat2.png",
                    Brand = "UArmy",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Black Nike Cap",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/hat3.png",
                    Brand = "Nike",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Roland Magician Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/hat4.png",
                    Brand = "Roland",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Boss Safety Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/glove4.png",
                    Brand = "Boss",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Red UnderArmour Boxing Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/glove3.png",
                    Brand = "UnderArmour",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Grey Rupa Winter Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/glove2.png",
                    Brand = "Rupa",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Medical Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/glove1.png",
                    Brand = "Medic",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Nike Ultra-lite running shoes",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/shoe1.png",
                    Brand = "Nike",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Black RedChief leather Shoes",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/shoe2.png",
                    Brand = "RedChief",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Nike Running Shoes",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureUrl = "/images/products/shoe4.png",
                    Brand = "Nike",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Grey Woodland Suede shoes",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/shoe3.png",
                    Brand = "Woodland",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dynanmic Basket-ball shoes",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/shoe5.png",
                    Brand = "Dynamic",
                    Type = "Boots",
                    QuantityInStock = 100
                },
            };
            
            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}