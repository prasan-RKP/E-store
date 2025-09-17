import express from 'express';
import Accessory from '../src/model/accessoryModel.js';
import Men from '../src/model/manModel.js';
import Women from '../src/model/womenModel.js';
import Footwear from '../src/model/FootwearModel.js';


const router  = express.Router();

router.get("/fetchAccess", async(req,res)=> {

    try {
        const prods = await Accessory.find();
        if(!prods) {return res.status(400).json({message: "Sorry it's Unable Fetch Now..."})};
        return res.status(200).json(prods);
    } catch (error) {
         console.log("Error in Fetching Accessories", error);
         return res.status(500).json({message: "Internal Server Error"});
    }
})

router.get("/fetchManCloth", async(req, res)=> {
    try {
        const prods = await Men.find();
        if(!prods) {return res.status(400).json({message: "Unable to Fetch Men's section"})};
        return res.status(200).json(prods);
        
    } catch (error) {
        console.log("Error in Fetching Accessories", error);
         return res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/fetchWomenCloth", async(req, res)=> {
    try {
        const prods = await Women.find();
        if(!prods) return res.status(400).json({message: "Unable to get WomenSection"});
        return res.status(200).json(prods);
    } catch (error) {
        console.log("Error in Fetching Accessories", error);
         return res.status(500).json({message: "Internal Server Error"});
    }
})


router.get("/fetchFootwear", async(req, res)=> {
    try {
        const prods = await Footwear.find();
        if(!prods) return res.status(400).json({message: "Unable to Get Footwear section"});
        return res.status(200).json(prods);
        
    } catch (error) {
        console.log("Error in Fetching FootWear", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.get("/say" ,(req, res)=> {
    res.send("Hey I am saying hello");
})

export default router;