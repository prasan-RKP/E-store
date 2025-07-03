import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Heart, Star } from 'lucide-react';

const ProductShow = () => {
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState('/man1.jpg');
  const [isLoved, setIsLoved] = useState(false);

  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleLove = () => {
    setIsLoved(!isLoved);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">BrandName</div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-gray-400">Home</a></li>
                <li><a href="#" className="hover:text-gray-400">Products</a></li>
                <li><a href="#" className="hover:text-gray-400">About</a></li>
                <li><a href="#" className="hover:text-gray-400">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Product Navigation */}
      <nav className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-600">Jeans</a>
          <a href="#" className="hover:text-gray-600">Footwear</a>
          <a href="#" className="hover:text-gray-600">Accessories</a>
          <a href="#" className="hover:text-gray-600">Women's Jeans</a>
        </div>
      </nav>

      {/* Product Display */}
      <div className="container mx-auto flex flex-col md:flex-row py-8">
        {/* Left Section: Product Images */}
        <div className="md:w-1/2 flex flex-col  space-y-4">
          <div className="flex space-x-4">
            <img
              src="image1.jpg"
              alt="Product"
              className="w-1/4 cursor-pointer hover:opacity-75"
              onClick={() => handleImageClick('image1.jpg')}
            />
            <img
              src="image2.jpg"
              alt="Product"
              className="w-1/4 cursor-pointer hover:opacity-75"
              onClick={() => handleImageClick('image2.jpg')}
            />
            <img
              src="image3.jpg"
              alt="Product"
              className="w-1/4 cursor-pointer hover:opacity-75"
              onClick={() => handleImageClick('image3.jpg')}
            />
            <img
              src="image4.jpg"
              alt="Product"
              className="w-1/4 cursor-pointer hover:opacity-75"
              onClick={() => handleImageClick('image4.jpg')}
            />
          </div>
          <div className="relative">
            <motion.img
              src={selectedImage}
              alt="Main Product"
              className="w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              animate={{ scale: zoom ? 1.2 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <Heart
              className={`absolute top-4 right-4 text-2xl cursor-pointer ${isLoved ? 'text-red-500' : 'text-gray-400'}`}
              onClick={toggleLove}
            />
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-secondary">Buy Now</button>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-1/2 flex flex-col space-y-4">
          <div className="text-3xl font-bold">Product Name</div>
          <div className="text-2xl text-gray-600">$99.99</div>
          <div className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="flex space-x-2">
            <button
              className={`btn btn-sm ${selectedSize === 'M' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleSizeChange('M')}
            >
              M
            </button>
            <button
              className={`btn btn-sm ${selectedSize === 'L' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleSizeChange('L')}
            >
              L
            </button>
            <button
              className={`btn btn-sm ${selectedSize === 'XL' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleSizeChange('XL')}
            >
              XL
            </button>
            <button
              className={`btn btn-sm ${selectedSize === 'XXL' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleSizeChange('XXL')}
            >
              XXL
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star className="text-gray-300" />
              <span className="ml-2 text-gray-600">4.5/5</span>
            </div>
            <div className="text-gray-700">
              <strong>Reviews:</strong>
              <div className="h-32 overflow-y-auto border p-2">
                <p>"Great product, highly recommend!" - John Doe</p>
                <p>"Excellent quality, will buy again!" - Jane Smith</p>
              </div>
            </div>
          </div>
          <div className="border p-4">
            <h3 className="text-xl font-semibold">Bank Offers</h3>
            <p>Special offers available...</p>
          </div>
          <div className="border p-4">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <p>Details about the product...</p>
          </div>
          <div className="border p-4">
            <h3 className="text-xl font-semibold">Questions & Answers</h3>
            <p><strong>Q:</strong> Is this product durable?</p>
            <p><strong>A:</strong> Yes, it is very durable.</p>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Related Items</h2>
        <div className="carousel carousel-center space-x-4">
          <div className="carousel-item">
            <img src="related1.jpg" alt="Related Item" className="w-40 h-40 object-cover" />
          </div>
          <div className="carousel-item">
            <img src="related2.jpg" alt="Related Item" className="w-40 h-40 object-cover" />
          </div>
          <div className="carousel-item">
            <img src="related3.jpg" alt="Related Item" className="w-40 h-40 object-cover" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">BrandName</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ProductShow;

/*
desc to create product :- do create aproductShow component where at the top brandName, searchBar, navItes(cartImage, userImage, home etc) below add some extra navItems kind of products variety(jeans, footwear, accesroies, womenJeans) and below its there will two section left, right and the left section contains at the last left side there will be different angles of images of product when user Will click it that will show at next to him which having a image at the right top side with a love icon and when user WIll hover it it shoukd show the zoom parts fucntionality, and the below the left side section there is two button addtocartButon, BuyNow at the below of the ProductImage , In right side section having product descriptions, price,rating of the particulatr prodcut , sizes(m,l,xl,xxl) below its bank ofrers , and it below there will be a product details Rating and Reviews kind of people feedback session already some of their make the feed back session to an scroll container and below its questiona and answers are there about the product myth, after that the left and right section related itemswill be show witha caraousel kindof a thing and at the last add a footersection do it a modern UI with modern effects (i have already installed the all dependenies You will  give just yhe component code ) use tailwindcss, daisyUI, luicde-react, reactIcons, framer-motion etc add some beautiful iamges hover effcts and animations do create make it to500 to 600 length baove to acquire all the fucntionality




*/
