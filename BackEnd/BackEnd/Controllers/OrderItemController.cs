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
    public class OrderItemController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/OrderItem
        public IQueryable<Object> GetOrderItems()
        {
            //var orderItem = db.Customers.
            //    Join(db.OrderItems,
            //    cust => cust.CustomerID, oi => oi.CustomerID,
            //    (cust, oi) => new
            //    {
            //        OrderItemID = oi.OrderItemID,
            //        OrderID = oi.OrderID,
            //        ProductID = oi.ProductID,
            //        CustomerID = cust.CustomerID,
            //        ProductQuantity = oi.ProductQuantity
            //    }).Join(db.Products,
            //            a => a.ProductID, p => p.ProductID,
            //            (a, p) => new
            //            {
            //                OrderItemID = a.OrderItemID,
            //                OrderID = a.OrderID,
            //                ProductID = p.ProductID,
            //                CustomerID = a.CustomerID,
            //                ProductName = p.ProductName,
            //                ProductQuantity = a.ProductQuantity
            //            });

            var orderItem = db.Products.
                Join(db.OrderItems,
                pro => pro.ProductID, oi => oi.ProductID,
                (pro, oi) => new
                {
                    OrderItemID = oi.OrderItemID,
                    OrderID = oi.OrderID,
                    ProductID = pro.ProductID,
                    ProductName = pro.ProductName,
                    ProductQuantity = oi.ProductQuantity
                });


            if (orderItem == null)
            {
                return (null);
            }

            return orderItem;
            //return db.OrderItems;
        }

        // GET: api/OrderItem/5
        [ResponseType(typeof(OrderItem))]
        public IQueryable<Object> GetOrderItem(int id)
        {
            //var list = db.Customers.
            //    Join(db.OrderItems,
            //    cust => cust.CustomerID, oi => oi.CustomerID,
            //    (cust, oi) => new
            //    {
            //        OrderItemID = oi.OrderItemID,
            //        OrderID = oi.OrderID,
            //        ProductID = oi.ProductID,
            //        CustomerID = cust.CustomerID,
            //        ProductQuantity = oi.ProductQuantity                   
            //    }).Join(db.Products,
            //            a => a.ProductID, p => p.ProductID,
            //            (a, p) => new
            //            {
            //                OrderItemID = a.OrderItemID,
            //                OrderID = a.OrderID,
            //                ProductID = p.ProductID,
            //                CustomerID = a.CustomerID,
            //                ProductName = p.ProductName,
            //                ProductQuantity = a.ProductQuantity
            //            });

            var list = db.Products.
                Join(db.OrderItems,
                pro => pro.ProductID, oi => oi.ProductID,
                (pro, oi) => new
                {
                    OrderItemID = oi.OrderItemID,
                    OrderID = oi.OrderID,
                    ProductID = pro.ProductID,
                    ProductName = pro.ProductName,
                    ProductQuantity = oi.ProductQuantity
                });

            var orderItem = list.Where(c => c.OrderID.Equals(id));

            if (orderItem == null)
            {
                return (null);
            }

            return orderItem;
        }

        [HttpGet]
        [Route("api/GetOrderSummary")]
        public IQueryable<Object> GetOrderSummary(int id)
        {
            var list = db.Orders.
                Join(db.OrderItems,
                o => o.OrderID, oi => oi.OrderID,
                (o, oi) => new
                {
                    OrderItemID = oi.OrderItemID,
                    OrderID = oi.OrderID,
                    ProductID = oi.ProductID,
                    CustomerID = o.CustomerID,
                    ProductQuantity = oi.ProductQuantity
                }).Join(db.Products,
                        a => a.ProductID, p => p.ProductID,
                        (a, p) => new
                        {
                            OrderItemID = a.OrderItemID,
                            OrderID = a.OrderID,
                            ProductID = p.ProductID,
                            CustomerID = a.CustomerID,
                            ProductName = p.ProductName,
                            ProductQuantity = a.ProductQuantity,
                            ProductPrice = p.ProductPrice
                        });

            var orderItem = list.Where(x => x.OrderID.Equals(id));

            if (orderItem == null)
            {
                return (null);
            }

            return orderItem;
        }

        // PUT: api/OrderItem/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrderItem(int id, OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderItem.OrderItemID)
            {
                return BadRequest();
            }

            db.Entry(orderItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(id))
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

        // POST: api/OrderItem
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult PostOrderItem(OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderItems.Add(orderItem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = orderItem.OrderItemID }, orderItem);
        }

        // DELETE: api/OrderItem/5
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult DeleteOrderItem(int id)
        {
            OrderItem orderItem = db.OrderItems.Find(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            db.OrderItems.Remove(orderItem);
            db.SaveChanges();

            return Ok(orderItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderItemExists(int id)
        {
            return db.OrderItems.Count(e => e.OrderItemID == id) > 0;
        }
    }
}