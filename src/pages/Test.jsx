import React, { useState, useEffect } from 'react';

const EcommerceHomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Helmet>
        <title>Premium Online Store | Shop Best Products Online</title>
        <meta 
          name="description" 
          content="Discover amazing deals on electronics, fashion, and more at our online store. Shop now for the best prices and fast delivery!" 
        />
        <meta 
          name="keywords" 
          content="online shopping, ecommerce, buy electronics, fashion deals, best prices" 
        />
      </Helmet> */}

      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Online Store</h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Online Store</h2>
          <p className="text-gray-600 mb-8">Discover the best products at amazing prices</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain p-4"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {/* Add to cart logic */}}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EcommerceHomePage;