import React, { useState } from 'react';
import { Search, Heart, User, ShoppingCart, Home, Star, Truck, ShieldCheck, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductShow = () => {
  const [mainImage, setMainImage] = useState('/footwear/fw1.jpg');
  const [zoom, setZoom] = useState(false);
  const [imageOptions, setImageOptions] = useState([
    '/footwear/fw2.jpg',
    '/footwear/fw3.jpg',
    '/footwear/fw4.jpg',
  ]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [reviews, setReviews] = useState([
    { id: 1, user: 'User1', rating: 4, comment: 'Good product' },
    { id: 2, user: 'User2', rating: 5, comment: 'Excellent quality' },
    { id: 3, user: 'User3', rating: 3, comment: 'Average fit' },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [showDetailsOnHover, setShowDetailsOnHover] = useState(true);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Top Navigation */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">BrandName</a>
        </div>
        <div className="navbar-center">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-40 lg:w-64" />
          </div>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <ShoppingCart size={24} />
          </button>
          <button className="btn btn-ghost btn-circle">
            <User size={24} />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Home size={24} />
          </button>
        </div>
      </div>

      {/* Product Variety Navigation */}
      <div className="flex justify-around py-4 bg-base-300">
        <a className="hover:text-primary">Jeans</a>
        <a className="hover:text-primary">Footwear</a>
        <a className="hover:text-primary">Accessories</a>
        <a className="hover:text-primary">Women's Jeans</a>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          {/* Main Image */}
          <div className="relative">
            <motion.img
              src={mainImage}
              alt="Product"
              className="rounded-lg object-cover shadow-xl"
              style={{
                width: '400px',
                height: '400px',
                cursor: zoom ? 'zoom-in' : 'default',
              }}
              onMouseEnter={() => { setZoom(true); setShowDetailsOnHover(false); }}
              onMouseLeave={() => { setZoom(false); setShowDetailsOnHover(true); }}
              whileHover={{ scale: zoom ? 1.5 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <button className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost">
              <Heart size={20} />
            </button>
          </div>

          {/* Image Options */}
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {imageOptions.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="rounded-lg w-20 h-20 object-cover cursor-pointer"
                onClick={() => handleImageClick(image)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          {/* Buttons and Quantity */}
          <div className="mt-6 flex flex-col items-center justify-self-start gap-4">
            
            <div className="flex justify-center gap-2">
              <button className="btn btn-primary">Add to Cart</button>
              <div className="flex items-center">
              <button className="btn btn-sm" onClick={decreaseQuantity}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="input input-bordered w-16 text-center"
                min="1"
              />
              <button className="btn btn-sm" onClick={increaseQuantity}>+</button>
            </div>
              <button className="btn btn-secondary">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ display: showDetailsOnHover ? 'block' : 'block' }}>
          <h2 className="text-2xl font-semibold">WROGN Solid Men Polo Neck White T-Shirt</h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star size={16} className="text-green-500" />
              4.2 | 1,234 Ratings & 567 Reviews
            </div>
          </div>
          <div className="text-xl font-bold">₹499 <span className="text-gray-500 line-through">₹999</span> <span className="text-green-500">50% off</span></div>

          {/* Size Selection */}
          <div className="mt-4">
            Sizes:
            <div className="flex space-x-2 mt-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className={`btn btn-xs ${selectedSize === size ? 'btn-primary' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div className="mt-4">
            <h4 className="font-semibold">Delivery Options</h4>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Enter Pincode" className="input input-bordered input-sm w-24" />
              <button className="btn btn-sm">Check</button>
            </div>
            <p className="text-sm mt-1">Please enter pincode to check delivery availability</p>
          </div>

          {/* Bank Offers */}
          <div className="mt-4">
            <h4 className="font-semibold">Bank Offers</h4>
            <ul className="list-disc list-inside text-sm">
              <li>10% off on HDFC Bank cards, up to ₹100</li>
              <li>5% cashback on Flipkart Axis Bank cards</li>
              <li>Special offer on ICICI Bank cards</li>
            </ul>
          </div>

          {/* Product Highlights */}
          <div className="mt-4">
            <h4 className="font-semibold">Product Highlights</h4>
            <ul className="list-disc list-inside text-sm">
              <li>Material: 100% Cotton</li>
              <li>Fit: Regular Fit</li>
              <li>Sleeve: Half Sleeves</li>
              <li>Neck: Polo Neck</li>
              <li>Occasion: Casual</li>
            </ul>
          </div>

          {/* Warranty and Services */}
          <div className="mt-4">
            <h4 className="font-semibold">Warranty & Services</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Truck size={16} /> Free Delivery
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} /> 1 Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <RotateCw size={16} /> 7 Days Replacement
              </div>
            </div>
          </div>

          {/* Ratings and Reviews */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Ratings & Reviews</h3>
            <div className="overflow-x-auto">
              <div className="grid grid-flow-col gap-4 py-2">
                {reviews.map((review) => (
                  <div key={review.id} className="card w-64 bg-base-100 shadow-md">
                    <div className="card-body">
                      <h2 className="card-title">{review.user}</h2>
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= review.rating ? 'text-orange-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <p className="text-gray-700">
          This stylish polo neck t-shirt from WROGN is perfect for casual wear. Made from high-quality cotton, it offers a comfortable fit and a modern look.
        </p>
      </div>

      {/* Questions and Answers */}
      <div className="container mx-auto mt-6">
        <h3 className="text-xl font-semibold">Questions & Answers</h3>
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Is this product durable?
          </div>
          <div className="collapse-content">
            <p>Yes, it is made of high-quality materials.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            What is the warranty period?
          </div>
          <div className="collapse-content">
            <p>The warranty period is 1 year.</p>
          </div>
        </div>
      </div>

      {/* Related Items Carousel */}
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Related Items</h2>
        <div className="carousel">
          {[
            'https://rukminim2.flixcart.com/image/200/200/l51d30w0/t-shirt/4/2/z/m-astc-bk-wh-rd-new-printed-t-shirt-atlas-trendz-original-imagfs6yep5fgjgy.jpeg?q=90',
            'https://rukminim2.flixcart.com/image/200/200/xif0q/t-shirt/j/f/j/m-t427-navy-one-nbnick-original-imaggsqbgdybcrxz.jpeg?q=90',
            'https://rukminim2.flixcart.com/image/200/200/xif0q/t-shirt/s/w/r/m-t427-dblue-one-nbnick-original-imaggsqbhfmgjdz7.jpeg?q=90',
          ].map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item} alt={`Related ${index + 1}`} className="rounded-lg w-48 h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer p-10 bg-base-300 text-base-content mt-12 flex justify-around">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};

export default ProductShow;
