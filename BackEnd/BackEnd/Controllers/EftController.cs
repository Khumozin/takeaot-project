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
    public class EftController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Eft
        public IQueryable<Eft> GetEfts()
        {
            return db.Efts;
        }

        [HttpGet]
        [Route("api/GetEftByPaymentID")]
        public IQueryable<Object> GetEftByPaymentID(int id)
        {
            var list = db.Payments.
                Join(db.Efts,
                p => p.PaymentID, e => e.PaymentID,
                (p, e) => new
                {
                    EftID = e.EftID,
                    PaymentID = p.PaymentID,
                    CardNumber = e.CardNumber,
                    BankName = e.BankName,
                    BranchCode = e.BranchCode
                });

            var eft = list.Where(c => c.PaymentID.Equals(id));

            if (eft == null)
            {
                return (null);
            }

            return eft;
            //return db.Carts;
        }

        // GET: api/Eft/5
        [ResponseType(typeof(Eft))]
        public IHttpActionResult GetEft(int id)
        {
            Eft eft = db.Efts.Find(id);
            if (eft == null)
            {
                return NotFound();
            }

            return Ok(eft);
        }

        // PUT: api/Eft/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEft(int id, Eft eft)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eft.EftID)
            {
                return BadRequest();
            }

            db.Entry(eft).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EftExists(id))
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

        // POST: api/Eft
        [ResponseType(typeof(Eft))]
        public IHttpActionResult PostEft(Eft eft)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Efts.Add(eft);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = eft.EftID }, eft);
        }

        // DELETE: api/Eft/5
        [ResponseType(typeof(Eft))]
        public IHttpActionResult DeleteEft(int id)
        {
            Eft eft = db.Efts.Find(id);
            if (eft == null)
            {
                return NotFound();
            }

            db.Efts.Remove(eft);
            db.SaveChanges();

            return Ok(eft);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EftExists(int id)
        {
            return db.Efts.Count(e => e.EftID == id) > 0;
        }
    }
}