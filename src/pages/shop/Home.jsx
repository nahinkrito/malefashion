import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { FiArrowRight, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { useProducts } from '../../contexts/ProductContext'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import ProductCard from '../../components/shop/ProductCard'

function Home() {
  const { getFeaturedProducts, getNewArrivals, getTopRated, categories } = useProducts()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  
  const featuredProducts = getFeaturedProducts()
  const newArrivals = getNewArrivals(8)
  const topRatedProducts = getTopRated(8)
  
  // Change document title on component mount
  useEffect(() => {
    document.title = "MaleFashion - Premium Men's Clothing"
  }, [])
  
  // Slider settings
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
  }
  
  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div>
      {/* Hero Section with Slider */}
      <section className="relative">
        <Slider {...heroSliderSettings}>
          <div className="relative h-[650px] md:h-[750px]">
            <div className="absolute inset-0 bg-black">
              <img 
                src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1920" 
                alt="Men's Fashion Collection" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="absolute inset-0 flex items-center px-4 md:px-16">
              <div className="container">
                <div className="max-w-lg">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Fall - Winter Collections 2025
                  </h1>
                  <p className="text-white text-lg mb-8">
                    A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.
                  </p>
                  <Link 
                    to="/shop" 
                    className="btn btn-accent"
                  >
                    Shop Now <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[650px] md:h-[750px]">
            <div className="absolute inset-0 bg-black">
              <img 
                src="https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1920" 
                alt="Modern Clothing for Men" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="absolute inset-0 flex items-center px-4 md:px-16">
              <div className="container">
                <div className="max-w-lg">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    New Arrivals Collection
                  </h1>
                  <p className="text-white text-lg mb-8">
                    Discover the latest trends in men's fashion with our curated selection of premium clothing.
                  </p>
                  <Link 
                    to="/shop" 
                    className="btn btn-accent"
                  >
                    Shop Now <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
      
      {/* Categories Banner Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <div key={category.id} className="relative group overflow-hidden rounded-lg">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white mb-2">{category.name}</h3>
                    <Link 
                      to={`/shop/category/${category.slug}`} 
                      className="inline-block px-6 py-2 bg-white text-secondary-900 font-medium rounded hover:bg-accent-500 hover:text-white transition duration-300"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Products</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Handpicked items from our collection that represent the best of what we offer in terms of style, quality, and value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
                addToWishlist={addToWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner Section */}
      <section className="py-16 bg-secondary-900">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Exclusive collection" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Clothings Hot <br />
                <span className="text-accent-500">New Arrivals</span>
              </h2>
              <p className="text-secondary-300 mb-8">
                Be the first to shop the latest drops, limited editions, and exclusive collaborations. Our new arrivals are making waves in the fashion world.
              </p>
              <Link 
                to="/shop" 
                className="btn btn-accent"
              >
                Shop Now <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Slider */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-semibold text-secondary-900">New Arrivals</h2>
            <Link to="/shop" className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          
          <Slider {...productSliderSettings}>
            {newArrivals.map(product => (
              <div key={product.id} className="px-2">
                <ProductCard 
                  product={product} 
                  addToCart={addToCart} 
                  addToWishlist={addToWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      
      {/* Top Rated Products Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Top Rated Products</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Our customers' favorites - these products have received the highest ratings and most positive reviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProducts.slice(0, 8).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
                addToWishlist={addToWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-secondary-900">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-4">Newsletter</h2>
            <p className="text-secondary-300 mb-8">
              Subscribe to our newsletter to get updates on our latest collections, exclusive offers, and fashion news.
            </p>
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 w-full rounded-l sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none"
              />
              <button 
                type="submit" 
                className="btn btn-accent rounded-r sm:rounded-l-none px-8"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home