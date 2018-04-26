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
    public class CreditController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Credit
        public IQueryable<Object> GetCredits(int id)
        {
            var list = db.Payments.
                Join(db.Credits,
                p => p.PaymentID, c => c.PaymentID,
                (p, c) => new
                {
                    CreditID = c.CreditID,
                    PaymentID = p.PaymentID,
                    CardDescription = c.CardDescription,
                    NameOnCard = c.NameOnCard,
                    CardNumber = c.CardNumber,
                    Cvv = c.Cvv
                });

            var credit = list.Where(c => c.PaymentID.Equals(id));

            if (credit == null)
            {
                return (null);
            }

            return credit;

            //return db.Credits;
        }

        // GET: api/Credit/5
        //[ResponseType(typeof(Credit))]
        //public IHttpActionResult GetCredit(int id)
        //{
        //    Credit credit = db.Credits.Find(id);
        //    if (credit == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(credit);
        //}

        // PUT: api/Credit/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCredit(int id, Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != credit.CreditID)
            {
                return BadRequest();
            }

            db.Entry(credit).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreditExists(id))
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

        // POST: api/Credit
        [ResponseType(typeof(Credit))]
        public IHttpActionResult PostCredit(Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Credits.Add(credit);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = credit.CreditID }, credit);
        }

        // DELETE: api/Credit/5
        [ResponseType(typeof(Credit))]
        public IHttpActionResult DeleteCredit(int id)
        {
            Credit credit = db.Credits.Find(id);
            if (credit == null)
            {
                return NotFound();
            }

            db.Credits.Remove(credit);
            db.SaveChanges();

            return Ok(credit);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CreditExists(int id)
        {
            return db.Credits.Count(e => e.CreditID == id) > 0;
        }
    }
}