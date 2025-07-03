import express from "express";
import User from "../src/model/userModel.js";
import bcryptjs from "bcryptjs";
import { createToken } from "../lib/webToken.js";
import { protectedRoute } from "../src/middleware/middleware.js";
import Women from "../src/model/womenModel.js";
import Men from "../src/model/manModel.js";
import Accessory from "../src/model/accessoryModel.js";
import Footwear from "../src/model/FootwearModel.js";
import Review from "../src/model/review.js";

const router = express.Router();

router.get("/check", protectedRoute, async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  //console.log("Hey signup listening....");

  const {
    username,
    email,
    contact,
    password,
    isAdmin = false,
    address = "",
    profilePic = "",
  } = req.body;

  //console.log(`username ${username}, email ${email}, contact ${contact}, password ${password}`);

  try {
    if (!username || !email || !contact || !password)
      return res.status(400).json({ message: "Please fill all credentials" });

    const user = await User.findOne({ email });
    if (user)
      return res.status(409).json({ message: "User already registered" });

    const hashPassword = await bcryptjs.hash(password, 10);
    //console.log("Password hashed");

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      isAdmin,
      address,
      profilePic,
      contact,
    });

    createToken(newUser._id, res); // Ensure this function works properly

    await newUser.save();
    //console.log("User saved successfully");

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      contact: newUser.contact,
      isAdmin: newUser.isAdmin,
      address: newUser.address,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Signup error:", error); // this will help you debug
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Fill your credentials" });

    const loggingInUser = await User.findOne({ email: email });
    if (!loggingInUser)
      return res.status(400).json({ message: "User not registered" });

    const isCorrectPassword = await bcryptjs.compare(
      password,
      loggingInUser.password
    );
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Wrong Credentials" });

    createToken(loggingInUser._id, res);

    return res.status(200).json({
      _id: loggingInUser._id,
      username: loggingInUser.username,
      email: loggingInUser.email,
      password: loggingInUser.password,
      isAdmin: loggingInUser.isAdmin,
      address: loggingInUser.address,
      contact: loggingInUser.contact,
      profilePic: loggingInUser.profilePic,
    });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout successfully ✅" });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.put("/saveChange", protectedRoute, async (req, res) => {
  const { username, email, address, contact } = req.body;

  try {
    // Find the user by email
    const loggingInUser = await User.findOne({ email });
    if (!loggingInUser) {
      return res.status(400).json({ message: "Invalid User" });
    }

    // Update user info
    const updatedUser = await User.findByIdAndUpdate(
      loggingInUser._id,
      {
        $set: {
          username,
          email,
          address,
          contact,
        },
      },
      { new: true } // ✅ Correctly placed outside $set
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Store the addToCart Items
router.post("/addCartData", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { productId, size } = req.body;

  //console.log(`UserId:${userId}, ProductId:${productId}, Size: ${size}`);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    let itemModel = null;

    if (await Women.findById(productId)) itemModel = "Women";
    else if (await Men.findById(productId)) itemModel = "Men";
    else if (await Accessory.findById(productId)) itemModel = "Accessory";
    else if (await Footwear.findById(productId)) itemModel = "Footwear";
    else return res.status(400).json({ message: "Product not found" });

    // If size is required but not provided
    if ((itemModel === "Women" || itemModel === "Men") && !size) {
      return res
        .status(400)
        .json({ message: "Size is required, Select your Size" });
    }

    const existingIndex = user.cart.findIndex(
      (item) =>
        item.productId.toString() === productId && item.itemModel === itemModel
    );

    if (existingIndex !== -1) {
      //  user.cart[existingIndex].quantity += 1;
      return res
        .status(400)
        .json({ message: "Product already exists in cart" });
    } else {
      user.cart.push({
        productId,
        itemModel,
        ...(size && { size }), // only include `size` if it exists
        quantity: 1,
      });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// show addToCartItems
router.get("/showAddToCart", protectedRoute, async (req, res) => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    // Create a new Array to hold populated Cart Items

    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    //console.log("Showing all addTOCart value", user);
    //console.log("Fetching the bacjend showAddToCart");
    res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    console.log("Error in ShowAddToCart", error);
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

//Increment product Quantity
router.post("/incQuantity", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { pid } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    // Find the cartItem by ProductId
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === pid
    );
    if (!cartItem)
      return res.status(400).json({ message: "Product Not Found in Cart" });

    cartItem.quantity += 1;
    await user.save();

    // Populate the cart items similar to showAddToCart
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    // Return the user with populated cart
    return res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    if (error.response) {
      return res.status(400).json({ message: "Something Error Occured" });
    }
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

// Decrementing the Quantity;
router.post("/decQuantity", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { pid } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    // Find the cartItem by ProductId
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === pid
    );
    if (!cartItem)
      return res.status(400).json({ message: "Product Not Found in Cart" });

    //cartItem.quantity += 1;
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else if (cartItem.quantity <= 1) {
      //console.log('0 item hitted');
      return res
        .status(400)
        .json({ message: "Product quantity cannot be less than 1" });
    }
    await user.save();

    // Populate the cart items similar to showAddToCart
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    // Return the user with populated cart
    return res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

// removing cartItem
// backend code
router.post("/removeCartProduct", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { pid } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === pid
    );
    if (!cartItem)
      return res.status(400).json({ message: "Product not Found❗" });

    // Remove the item
    user.cart = user.cart.filter((item) => item.productId.toString() !== pid);

    await user.save();

    // Populate the cart
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    return res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    console.error("Error in removeCartProduct:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ProdDisplay functionality
router.get("/prodDisplay/:pid", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { pid } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not registered" });

    let product = null;
    let itemModel = null;

    if ((product = await Women.findById(pid))) itemModel = "Women";
    else if ((product = await Men.findById(pid))) itemModel = "Men";
    else if ((product = await Accessory.findById(pid))) itemModel = "Accessory";
    else if ((product = await Footwear.findById(pid))) itemModel = "Footwear";
    else return res.status(404).json({ message: "Product not found" });

    //console.log("user value is ", user);
    const pidStr = pid.toString();
    const matchedCartItem = user.cart.find(
      ({ productId }) => productId.toString() === pidStr
    );

    return res.status(200).json({ product, cartDetail: matchedCartItem });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateSize", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { productId, size } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not registered" });
    if (!productId)
      return res.status(400).json({ message: "Product not Found" });
    if (!size) return res.status(400).json({ message: "Do Select your Size" });

    let itemModel = "";

    if (await Women.findById(productId)) itemModel = "Women";
    else if (await Men.findById(productId)) itemModel = "Men";
    else if (await Accessory.findById(productId)) itemModel = "Accessory";
    else if (await Footwear.findById(productId)) itemModel = "Footwear";

    const cartItem = user.cart.find(
      (item) =>
        item.productId.toString() === productId && item.itemModel === itemModel
    );

    if (!cartItem) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    cartItem.size = size;

    await user.save();

    // ✅ Repopulate cart for frontend display
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;
        if (item.itemModel === "Women")
          product = await Women.findById(item.productId);
        else if (item.itemModel === "Men")
          product = await Men.findById(item.productId);
        else if (item.itemModel === "Accessory")
          product = await Accessory.findById(item.productId);
        else if (item.itemModel === "Footwear")
          product = await Footwear.findById(item.productId);

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    return res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    console.error("Update size error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Review Upload

router.post("/postReview", protectedRoute, async (req, res) => {
  const userId = req?.user.id;
  const { name, rating, comment, productId } = req.body;

  //console.log("ProductId", productId);

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product not Found" });
    }
    if (!name || !comment || (!rating && rating !== 0)) {
      return res
        .status(400)
        .json({ message: "Fill your credentials properly" });
    }

    const newReview = new Review({
      username: name,
      user: userId,
      productId: productId,
      rating,
      reviewBox: comment,
    });

    const savedReview = await newReview.save();
    //console.log("Saved review:", savedReview);

    await User.findByIdAndUpdate(
      userId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    const userWithReviews = await User.findById(userId).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username email profilePic",
      },
    });

    if (!userWithReviews) {
      //console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    //console.log("New Review is", userWithReviews.reviews);
    return res.status(200).json({ review: userWithReviews.reviews });
  } catch (error) {
    console.error("Error posting review:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Checking the Item is presentIn

router.get("/fetchReview/:pid", protectedRoute, async (req, res) => {
  const { pid } = req.params;

  //console.log("Pid", pid);

  try {
    if (!pid) {
      return res.status(400).json({ message: "Product Not Found" });
    }

    const reviews = await Review.find({ productId: pid }).populate(
      "user",
      "username email profilePic"
    );

    res.status(200).json({ review: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/addWishlistProd",protectedRoute ,async(req, res)=>{

//   const userId = req.user?.id;
//   const {pid} = req.body;
//   console.log("ProductId", pid);
//   const productId = pid;

//   try {
//     if(!pid) {return res.status(400).json({message: "Product not found"})};

//     const user = await User.findById(userId);
//     if(!user) {return res.status(400).json({message: "User not Found"})};

//     let itemModel = null;

//     if (await Women.findById(productId)) itemModel = "Women";
//     else if (await Men.findById(productId)) itemModel = "Men";
//     else if (await Accessory.findById(productId)) itemModel = "Accessory";
//     else if(await Footwear.findById(productId)) itemModel = "Footwear";
//     else return res.status(400).json({ message: "Product not found" });

//     if ((itemModel === "Women" || itemModel === "Men" || itemModel === "Footwear") && !size) {
//       return res.status(400).json({ message: "Size is required, Select your Size" });
//     }

//     const existingIndex = user.wishlist.findIndex(
//       (item) =>
//         item.productId.toString() === pid && item.itemModel === itemModel
//     );

//     if(existingIndex !== -1){
//       return res.status(400).json({message: "Product already in WishList"});
//     }

//     else{
//       user.wishlist.push({
//         productId: pid,
//         itemModel,
//         ...(size && {size}),
//         quantity: 1
//       })
//     }

//     await user.save();
//     res.status(200).json(user);

//   } catch (error) {
//     console.error("Add to cart error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }

// })

router.post("/addWishlistProd", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { pid, size } = req.body;
  const productId = pid;

  //  console.log("ProductId", pid);

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    let itemModel = null;

    if (await Women.findById(productId)) itemModel = "Women";
    else if (await Men.findById(productId)) itemModel = "Men";
    else if (await Accessory.findById(productId)) itemModel = "Accessory";
    else if (await Footwear.findById(productId)) itemModel = "Footwear";
    else return res.status(400).json({ message: "Product not found" });

    //console.log(`DEBUG Statement ItemModel:${itemModel} & size:${size}`);

    // Set default size if needed
    let finalSize = size;
    if (!size) {
      if (itemModel === "Women" || itemModel === "Men") {
        finalSize = "M";
      } else if (itemModel === "Footwear") {
        finalSize = "8";
      }
    }

    const existingIndex = user.wishlist.findIndex(
      (item) =>
        item.productId.toString() === pid && item.itemModel === itemModel
    );

    if (existingIndex !== -1) {
      return res.status(400).json({ message: "Product already in WishList" });
    }

    // Create wishlist item
    const newWishlistItem = {
      productId,
      itemModel,
      quantity: 1,
      ...(itemModel !== "Accessory" && { size: finalSize }),
    };

    user.wishlist.push(newWishlistItem);
    await user.save();

    // console.log("DEBUg-2", user.wishlist);
    res.status(200).json(user);
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/showWishlist", protectedRoute, async (req, res) => {
  const userId = req.user?.id;

  // console.log("API called by profile")
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    // Populate wishlist items
    const populatedCart = await Promise.all(
      user.wishlist.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(), // ✅ FIXED: Now actually spreading item fields
          product,
        };
      })
    );

    // Populate cart items
    const populatedCart2 = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(), // ✅ FIXED: Now actually spreading item fields
          product,
        };
      })
    );

    // Send full user + populated wishlist + populated cart
    res
      .status(200)
      .json({ user, wishlist: populatedCart, cart: populatedCart2 });
  } catch (error) {
    console.log("Error in ShowWishList", error);
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.post("/removeWishProd", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { pid } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    const wishItem = user.wishlist.find(
      (item) => item.productId.toString() === pid
    );

    if (!wishItem) {
      return res.status(400).json({ message: "Product not found" });
    }

    // remove the product from wishList
    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== pid
    );

    await user.save();

    // populate the wishItems

    const populatedCart = await Promise.all(
      user.wishlist.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    return res
      .status(200)
      .json({ ...user.toObject(), wishlist: populatedCart });
  } catch (error) {
    console.error("Error in removeCartProduct:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Move to AddToCart
router.post("/moveToCart", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { productId, size } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not Registered" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product not found" });
    }

    let itemModel = null;
    if (await Women.findById(productId)) itemModel = "Women";
    else if (await Men.findById(productId)) itemModel = "Men";
    else if (await Accessory.findById(productId)) itemModel = "Accessory";
    else if (await Footwear.findById(productId)) itemModel = "Footwear";

    if (!itemModel) {
      return res.status(400).json({ message: "Product not found" });
    }

    if ((itemModel === "Women" || itemModel === "Men") && !size) {
      return res
        .status(400)
        .json({ message: "Size is required, Select your Size" });
    }

    const alreadyInCart = user.cart.some(
      (item) =>
        item.productId.toString() === productId && item.itemModel === itemModel
    );

    if (alreadyInCart) {
      return res.status(400).json({ message: "Product already moved to cart" });
    }

    user.cart.push({
      productId,
      itemModel,
      ...(size && { size }),
      quantity: 1,
    });

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    const populatedWishlist = await Promise.all(
      user.wishlist.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women")
          product = await Women.findById(item.productId);
        else if (item.itemModel === "Men")
          product = await Men.findById(item.productId);
        else if (item.itemModel === "Accessory")
          product = await Accessory.findById(item.productId);
        else if (item.itemModel === "Footwear")
          product = await Footwear.findById(item.productId);

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women")
          product = await Women.findById(item.productId);
        else if (item.itemModel === "Men")
          product = await Men.findById(item.productId);
        else if (item.itemModel === "Accessory")
          product = await Accessory.findById(item.productId);
        else if (item.itemModel === "Footwear")
          product = await Footwear.findById(item.productId);

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    const userObj = user.toObject();
    delete userObj.password; // remove other sensitive fields if needed

    res.status(200).json({
      ...userObj,
      wishlist: populatedWishlist,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Remove all cart items
router.post("/removeAllCartItem", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  //console.log("calling the backend");
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Registered" });

    // Clear the cart
    user.cart = [];

    // Save the updated user document
    await user.save();

    // todo populate functionality will do it later

    console.log("All cart items removed for user:", userId);
    res.status(200).json({
      message: "All cart items removed successfully",
      ...user.toObject(),
    });
  } catch (error) {
    console.log("Error in removeAllCartItem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/fetchShippingAddress", protectedRoute, async (req, res) => {
  const userId = req?.user?.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not registered" });
    }

    res.status(200).json({ ...user.toObject() });
  } catch (error) {
    console.log("Error in FetchInShippingAdress", error);
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

// Shipping details here via 'PUT' endpoint

router.put("/saveShippingAddress-one", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { email, phone, fullName, address, city, state, zipCode } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    // Basic field validation
    if (
      !email ||
      !phone ||
      !fullName ||
      !address ||
      !city ||
      !state ||
      !zipCode
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all your Credentials !" });
    }

    // Update user info
    user.email = email;
    user.contact = phone;
    user.username = fullName;
    user.address = address;
    user.city = city;
    user.state = state;
    user.zipCode = zipCode;

    await user.save();

    // Safely populate wishlist
    const populatedWishlist = await Promise.all(
      user.wishlist.map(async (item) => {
        try {
          if (!item?.itemModel || !item?.productId) return item;

          let productModel;
          switch (item.itemModel) {
            case "Women":
              productModel = await Women.findById(item.productId);
              break;
            case "Men":
              productModel = await Men.findById(item.productId);
              break;
            case "Accessory":
              productModel = await Accessory.findById(item.productId);
              break;
            case "Footwear":
              productModel = await Footwear.findById(item.productId);
              break;
            default:
              productModel = null;
          }

          return {
            ...(item.toObject ? item.toObject() : item),
            product: productModel,
          };
        } catch (err) {
          console.error("Error populating wishlist item:", err);
          return item;
        }
      })
    );

    // Safely populate cart
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        try {
          if (!item?.itemModel || !item?.productId) return item;

          let productModel;
          switch (item.itemModel) {
            case "Women":
              productModel = await Women.findById(item.productId);
              break;
            case "Men":
              productModel = await Men.findById(item.productId);
              break;
            case "Accessory":
              productModel = await Accessory.findById(item.productId);
              break;
            case "Footwear":
              productModel = await Footwear.findById(item.productId);
              break;
            default:
              productModel = null;
          }

          return {
            ...(item.toObject ? item.toObject() : item),
            product: productModel,
          };
        } catch (err) {
          console.error("Error populating cart item:", err);
          return item;
        }
      })
    );

    // Prepare user object for response
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      ...userObj,
      wishlist: populatedWishlist,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Error saving shipping address-one:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/saveShippingAddress-two", protectedRoute, async (req, res) => {
  const userId = req.user?.id;
  const { paymentMethod } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    // Validate payment method
    const validMethods = ["C.O.D", "googlePay", "PhonePe", "Paytm", "AmazonPay"];
    if (!paymentMethod || !validMethods.includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid or missing payment method!" });
    }

    // Update payment method
    user.paymentMethod = paymentMethod;
    await user.save();

    // Safely populate wishlist
    const populatedWishlist = await Promise.all(
      user.wishlist.map(async (item) => {
        try {
          if (!item?.itemModel || !item?.productId) return item;

          let productModel;
          switch (item.itemModel) {
            case "Women":
              productModel = await Women.findById(item.productId);
              break;
            case "Men":
              productModel = await Men.findById(item.productId);
              break;
            case "Accessory":
              productModel = await Accessory.findById(item.productId);
              break;
            case "Footwear":
              productModel = await Footwear.findById(item.productId);
              break;
            default:
              productModel = null;
          }

          return {
            ...(item.toObject ? item.toObject() : item),
            product: productModel,
          };
        } catch (err) {
          console.error("Error populating wishlist item:", err);
          return item;
        }
      })
    );

    // Safely populate cart
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        try {
          if (!item?.itemModel || !item?.productId) return item;

          let productModel;
          switch (item.itemModel) {
            case "Women":
              productModel = await Women.findById(item.productId);
              break;
            case "Men":
              productModel = await Men.findById(item.productId);
              break;
            case "Accessory":
              productModel = await Accessory.findById(item.productId);
              break;
            case "Footwear":
              productModel = await Footwear.findById(item.productId);
              break;
            default:
              productModel = null;
          }

          return {
            ...(item.toObject ? item.toObject() : item),
            product: productModel,
          };
        } catch (err) {
          console.error("Error populating cart item:", err);
          return item;
        }
      })
    );

    // Prepare user object for response
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      ...userObj,
      wishlist: populatedWishlist,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Error saving shipping address-two:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "",
  });
*/

router.get("/call", (req, res) => {
  res.send("Succesfully checked");
});

/*
if(cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    }

    else if(cartItem.quantity <= 0) {
      return res.status(400).json({ message: "Product quantity cannot be less than 1" });
    }


*/
export default router;
