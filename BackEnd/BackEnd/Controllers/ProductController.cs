using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class ProductController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Product
        public IQueryable<Product> GetProducts()
        {
            return db.Products;
        }

        // GET: api/Product/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            var product = db.Products
                .Where(x => x.ProductID == id)
                .Select(x => new
                {
                    x.ProductID,
                    x.SupplierID,
                    x.ProductName,
                    x.CategoryName,
                    x.ProductDescription,
                    x.ProductPrice,
                    x.ProductQuantity,
                    x.ProductImg,
                    x.MinimumQuantity
                });


            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // Get Product By Category
        [HttpGet]
        [Route("api/GetProductByCategory")]
        public IHttpActionResult GetProductByCategory(string category)
        {
            Product p = new Product();

            var list = new
                {
                    ProductID = p.ProductID,
                    SupplierID = p.SupplierID,
                    ProductName = p.ProductName,
                    CategoryName = p.CategoryName,
                    ProductDescription = p.ProductDescription,
                    ProductPrice = p.ProductPrice,
                    ProductQuantity = p.ProductQuantity,
                    ProductImg = p.ProductImg,
                    MinimumQuantity = p.MinimumQuantity
            };

            var product = db.Products.Where(c => c.CategoryName.Equals(category));

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // Get Product By Supplier ID
        [HttpGet]
        [Route("api/GetProductBySupplierID")]
        public IHttpActionResult GetProductBySupplierID(int id)
        {
            Product p = new Product();

            var list = new
            {
                ProductID = p.ProductID,
                SupplierID = p.SupplierID,
                ProductName = p.ProductName,
                CategoryName = p.CategoryName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                ProductQuantity = p.ProductQuantity,
                ProductImg = p.ProductImg,
                MinimumQuantity = p.MinimumQuantity
            };

            var product = db.Products.Where(c => c.SupplierID.Equals(id));

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Product/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductID)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Product
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = product.ProductID }, product);
        }

        // DELETE: api/Product/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductID == id) > 0;
        }
    }
}