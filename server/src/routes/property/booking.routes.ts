import { Router } from "express";
import { verifyRole, verifyaccessToken } from "../../middlewares/auth.middleware";
import { validateBooking } from "../../middlewares/inputvalidation";
import { checkBookingC, getBookingC, getMyBookingC, postBookingC } from "../../controllers/property/booking.controller";
import { verifyAccessTokenS } from "../../services/auth/auth.service";


const router=Router();

//get resevation for a single property/conditional of host or normal user
router.get("/propertyBooking/:id",getBookingC)

router.use(verifyaccessToken(true))
router.post('/:id',validateBooking,postBookingC);
router.get('/:id',validateBooking,checkBookingC);


//bookings made by me
router.get('/myBookings',verifyRole(false),getMyBookingC)





//update booking patch 
//dlete booking delete

//read booking now this may be multiple end points or single conditional end point












export default router;