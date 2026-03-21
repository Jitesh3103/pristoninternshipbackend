import mongoose from 'mongoose';
import express,{response, urlencoded} from 'express';
import cors from 'cors';

// cors : cross-origin resource sharing
const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded());

mongoose.connect("mongodb://localhost:27017/restaurant")
.then((ack)=>{
    if(ack){
        console.log("connected to database");
    }
})
.catch((err)=>{
    console.log("error connecting to database", err);
});

// creating the collection
// creating a validation schema
 
const orderSchema=new mongoose.Schema({
    ordername:String,
    qty:Number,
    location:String,
    contactNo:String
})

const orderCollection=new mongoose.model("orders",orderSchema);
app.get("/",(req,res)=>{
    res.send("Welcome to the node js class");
});

// menu collection creatioon flow
const menuSchema=new mongoose.Schema({
    menuname:String,
    price:Number,
    stock:Number
})

const menuColllection=new mongoose.model("menu",menuSchema);


// starting products
const productschema=new mongoose.Schema({

    category:String,
    price:Number,
    rating:{rate:Number, count:Number},
    description:String,
    image:String,
    title:String,
    id:Number,
    _id:String
})
   
const productCollection=new mongoose.model("products-cart",productschema);

const masterproductdata=new mongoose.model("allproducts",productschema);   

// storing products

app.post("/addtocart",(req,res)=>{
    productCollection.findOne({title:req.body.title}).then((alreadyaddedtocart)=>{
        if(alreadyaddedtocart)
            {
            res.send("product is already added to cart");
        }
        else{
            const newcartitem=productCollection(req.body);
            newcartitem.save().then((issavesuccess)=>{
                if(issavesuccess){
                    res.send("product added to cart successfully");
                }   
                    else{
                        res.send("Error in adding the product to cart");
                    }
            }).catch((exeerror)=>{
                console.log("error in adding the product to cart",exeerror);
                res.send("Error occureed");
            });
        }            
    }).catch((exe)=>{
        console.log("unable to add product",exe);
            res.send("unable to add product in cart");

    });
});
app.post("/add-menu",(req,res)=>{
    menuColllection.findOne({menuname:req.body.menuname}).then((ismenupresent)=>{
        if(ismenupresent){
            res.send("Menu is already created");
        }
        else{
            const newmenu=menuColllection(req.body);
            newmenu.save().then((ismenucreated)=>{
                if(ismenucreated){
                    res.send("Menu created successfully");
                }
                else{
                    res.send("Error in creating the menu");
                }
    })
    .catch((err)=>{
        console.log(err);
    });
}
})
.catch(()=>{})
})

app.get("/login",(req,res)=>{
    console.log("req sent",req.body);
});

app.get("/enquiry",(req,res)=>{
    console.log("query param sent from FE",req.query.name,
    req.query.age,
    req.query.address
    );
});

app.post("/place-order",(req,res)=>{
    console.log("order details",req.body);
    orderCollection.findOne({ordername:req.body.ordername}).then((isorderplaced)=>{
        if(isorderplaced){
            res.send("order already placed");
        }
        else{
            const neworder=new orderCollection(req.body);
            neworder.save().then((isSaveSuccess)=>{
                if(isSaveSuccess){
                    res.send("order placed successfully");
                }
                else{
                    res.send("Falling back to place order");

        }


    }).catch((exe)=>{
        console.log(exe);
    });
}
});
});

// to view fetching all the orders

app.get("/my-orders",async (req,res)=>{
    const allorders=await orderCollection.find();
    console.log("all orders",allorders);
        res.send(allorders);

});

app.get("/cartitems",async (req,res)=>{
    const allorders=await productCollection.find();
    console.log("all cart items",allorders);
        res.send(allorders);

});


app.put("/update-menu",async (req,res)=>{
    try{
        const ismenuupdated = await menuColllection.findOneAndUpdate(
            {menuname:req.body.menuname},
             req.body,
                {returnDocumnet:true}
        )

if(ismenuupdated){
    res.send("menu updated successfully");
}
else{
    res.send("Error in updating the menu");
}

    }catch(error){
        console.log("error",error);
        res.send("Error in updating the menu");
    }

});

app.put("/update-order",async (req,res)=>{
    try{
        const isorderupdatedsuccess = await orderCollection.findOneAndUpdate(
            {ordername:req.body.ordername},
                req.body,
                {returnDocument:true}
        )
if(isorderupdatedsuccess){
    res.send("order updated successfully");
}
else{
    res.send("Error in updating the order");
}
    }
    catch(error){
        console.log("error",error);
        res.send("Error in updating the order");
    }

});

app.delete("/delete-order",async (req,res)=>{
    try{
        const isorderdeleted=await orderCollection.findOneAndDelete({
            ordername:req.body.ordername
        });
        if(isorderdeleted){
            res.send("order deleted successfully!")

        }
        else{
            res.send("order not found ")
        }

    }catch(error){
        res.send("internal server error! try again later")

    }

});

app.delete("/delete-menu",async (req,res)=>{
    try{
        const isorderdeleted=await menuColllection.findOneAndDelete({
            menuname:req.body.menuname
        });
        if(isorderdeleted){
            res.send("order deleted successfully!")

        }
        else{
            res.send("order not found ")
        }

    }catch(error){
        res.send("internal server error! try again later")

    }

});

app.delete("/removecartitem",async (req,res)=>{
    console.log(req.query.title);
    try{
        const isitemremoved=await productCollection.findOneAndDelete({
            title:req.query.title
        })
        if(isitemremoved){
            res.send("item removed from cart successfully");
        }
        else{
            res.send("failed to remove item in cart try again");
        }
    }catch(error){
        console.log(error);
    }
});

app.get("/getallproducts",async(req,res)=>{
    const allproducts=await masterproductdata.find();
    res.send(allproducts);
})
app.listen(8000,()=>{
    console.log("server is running on port",8000);
});

