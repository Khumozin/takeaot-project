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
    public class CartController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Cart
        public IQueryable<Object> GetCarts(int id)
        {
            var list = db.Customers.
                Join(db.Carts,
                cust => cust.CustomerID, ca => ca.CustomerID,
                (cust, ca) => new
                {
                    CartID = ca.CartID,
                    CustomerID = cust.CustomerID,
                    ProductQuantity = ca.ProductQuantity,
                    ProductID = ca.ProductID
                }).Join(db.Products,
                        a => a.ProductID, p => p.ProductID,
                        (a, p) => new
                        {
                            CartID = a.CartID,
                            CustomerID = a.CustomerID,
                            ProductPrice = p.ProductPrice,
                            ProductName = p.ProductName,
                            ProductImg = p.ProductImg,
                            ProductQuantity = a.ProductQuantity,
                            ProductDescription = p.ProductDescription,
                            ProductID = p.ProductID
                        });

        var cart = list.Where(c => c.CustomerID.Equals(id));

            if (cart == null)
            {
                return (null);
            }

            return cart;
            //return db.Carts;
        }

        [HttpGet]
        [Route("api/GetCartByCustomer")]
        public IQueryable<Object> GetCartByCustomer(int id)
        {
            var list = db.Customers.
                Join(db.Carts,
                cust => cust.CustomerID, ca => ca.CustomerID,
                (cust, ca) => new
                {
                    CartID = ca.CartID,
                    CustomerID = cust.CustomerID,
                    ProductQuantity = ca.ProductQuantity,
                    ProductID = ca.ProductID
                });

            var orderItem = list.Where(c => c.CustomerID.Equals(id));

            if (orderItem == null)
            {
                return (null);
            }

            return orderItem;
        }
        //GET: api/Cart/5
        //[ResponseType(typeof(Cart))]
        //public IHttpActionResult GetCart(int id)
        //{
        //    Cart cart = db.Carts.Find(id);
        //    if (cart == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(cart);
        //}

        // PUT: api/Cart/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCart(int id, Cart cart)
        {

            if (id != cart.CartID)
            {
                return BadRequest();
            }

            db.Entry(cart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Cart
        [ResponseType(typeof(Cart))]
        public IHttpActionResult PostCart(Cart cart)
        {

            db.Carts.Add(cart);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cart.CartID }, cart);
        }

        // DELETE: api/Cart/5
        [ResponseType(typeof(Cart))]
        public IHttpActionResult DeleteCart(int id)
        {
            Cart cart = db.Carts.Find(id);

            if (cart == null)
            {
                return NotFound();
            }

            db.Carts.Remove(cart);
            db.SaveChanges();

            return Ok(cart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CartExists(int id)
        {
            return db.Carts.Count(e => e.CartID == id) > 0;
        }
    }
}