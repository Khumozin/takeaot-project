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
    public class OrderController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Order
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder()
        {
            var order = db.Customers.
                Join(db.Orders,
                cust => cust.CustomerID, o => o.CustomerID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    CustomerID = cust.CustomerID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    TotalPrice = o.TotalPrice,
                    DeliveryStatus = o.DeliveryStatus
                });
            //Order order = db.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // GET: api/Order/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrders(int id)
        {
            var list = db.Customers.
                Join(db.Orders,
                cust => cust.CustomerID, o => o.CustomerID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    CustomerID = cust.CustomerID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    TotalPrice = o.TotalPrice,
                    DeliveryStatus = o.DeliveryStatus
                });

            //var order = list.Where(c => c.CustomerID.Equals(id));
            // var order = (from o in db.Orders orderby o.OrderID descending select o).FirstOrDefault();
            var order = (from o in list orderby o.OrderID descending select o).FirstOrDefault();
            if (order == null)
            {
                return (null);
            }

            return Ok(order);

            //return db.Orders;
        }

        [HttpGet]
        [Route("api/GetOrderByCustomerID")]
        public IQueryable<Object> GetOrderByCustomerID(int id)
        {
            var list = db.Customers.
                Join(db.Orders,
                cust => cust.CustomerID, o => o.CustomerID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    CustomerID = cust.CustomerID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    TotalPrice = o.TotalPrice,
                    DeliveryStatus = o.DeliveryStatus
                });

            var order = list.Where(c => c.CustomerID.Equals(id));
            var x = order.OrderByDescending(c => c.OrderID);
            // var order = (from o in db.Orders orderby o.OrderID descending select o).FirstOrDefault();
            //var order = (from o in list where o.CustomerID.Equals(id) orderby o.OrderID descending select o).FirstOrDefault();
            if (x == null)
            {
                return (null);
            }

            return x;
        }

        // Get Order By Customer ID
        [HttpGet]
        [Route("api/GetCustomerOrder")]
        public IHttpActionResult GetCustomerOrder(int id)
        {
            var list = db.Customers.
                Join(db.Orders,
                cust => cust.CustomerID, o => o.CustomerID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    CustomerID = cust.CustomerID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    TotalPrice = o.TotalPrice,
                    DeliveryStatus = o.DeliveryStatus
                });

            var order = list.Where(c => c.CustomerID.Equals(id));
            if (order == null)
            {
                return (null);
            }

            return Ok(order);
        }

        [HttpGet]
        [Route("api/Invoice")]
        public IHttpActionResult GetInvoice(int id)
        {
            var list = db.Customers.
                Join(db.Orders,
                cust => cust.CustomerID, o => o.CustomerID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    CustomerID = cust.CustomerID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    TotalPrice = o.TotalPrice,
                    DeliveryStatus = o.DeliveryStatus
                });

            var order = list.Where(c => c.CustomerID.Equals(id));
            if (order == null)
            {
                return (null);
            }

            return Ok(order);
        }

        // Get Order By Status
        [HttpGet]
        [Route("api/GetOrderByStatus")]
        public IHttpActionResult GetOrderByStatus(string status)
        {
            var list = db.Customers.
                Join(db.Orders,
                cust => cust.CustomerID, o => o.CustomerID,
                (cust, o) => new
                {
                    OrderID = o.OrderID,
                    CustomerID = cust.CustomerID,
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate,
                    TotalPrice = o.TotalPrice,
                    DeliveryStatus = o.DeliveryStatus
                });

            var order = list.Where(c => c.DeliveryStatus.Equals(status));
            if (order == null)
            {
                return (null);
            }

            return Ok(order);
        }

        // PUT: api/Order/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Order
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orders.Add(order);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order.OrderID }, order);
        }

        // DELETE: api/Order/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}