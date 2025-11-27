import express  from 'express';
const router = express.Router();

router.post('/sensor-data',(req, res) => {
    try{
        app.post('/sensor-data',(req, res) => {
            res.status(200).json({message:"sensor data recieved"})
            console.log(req.body)
        })
    }catch(error){
        res.status(500).json({message:"Error in recieving sensor data"})
    }
});

export default router;