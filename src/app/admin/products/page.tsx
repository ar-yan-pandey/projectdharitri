'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  buying_link: string;
  image_url: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    buying_link: '',
    image_url: ''
  });

  useEffect(() => {
    checkUserAndFetchProducts();
  }, []);

  const checkUserAndFetchProducts = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        router.push('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setUser(user);
      await fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load products');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      buying_link: '',
      image_url: ''
    });
    setSelectedProduct(null);
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;

    try {
      // Validate form data
      if (!formData.name || formData.price <= 0) {
        toast.error('Name and a valid price are required');
        return;
      }

      const updates = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: formData.price,
        category: formData.category.trim() || null,
        buying_link: formData.buying_link.trim() || null,
        image_url: formData.image_url.trim() || null
      };

      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', selectedProduct.id)
        .select();

      if (error) {
        throw error;
      }

      toast.success('Product updated successfully');
      setIsEditModalOpen(false);
      resetForm();
      await fetchProducts();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProduct.id);

      if (error) throw error;

      toast.success('Product deleted successfully');
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleCreateProduct = async () => {
    try {
      // Validate form data
      if (!formData.name || !formData.price) {
        toast.error('Name and price are required');
        return;
      }

      const { error } = await supabase
        .from('products')
        .insert([{
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          price: formData.price,
          category: formData.category.trim() || null,
          buying_link: formData.buying_link.trim() || null,
          image_url: formData.image_url.trim() || null
        }]);

      if (error) throw error;

      toast.success('Product created successfully');
      setIsCreateModalOpen(false);
      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create product');
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category || '',
      buying_link: product.buying_link || '',
      image_url: product.image_url || ''
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ml-64">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-700 text-3xl font-medium">Products</h3>
            <button
              onClick={() => {
                resetForm();
                setIsCreateModalOpen(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              <FiPlus className="h-5 w-5" />
              New Product
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Link</th>
                      <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">{product.description || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                          {product.buying_link ? (
                            <a href={product.buying_link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              Buy Now
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => openEditModal(product)}
                              className="text-primary hover:text-primary/80"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(product)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Create Modal */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter product description"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Select Category</option>
                      <option value="Feed">Feed</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Supplement">Supplement</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Buying Link
                    </label>
                    <input
                      type="url"
                      placeholder="Enter buying link"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.buying_link}
                      onChange={(e) => setFormData({ ...formData, buying_link: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="Enter image URL"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProduct}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Select Category</option>
                      <option value="Feed">Feed</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Supplement">Supplement</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                  <input
                    type="url"
                    placeholder="Buying Link"
                    className="w-full p-2 border rounded"
                    value={formData.buying_link}
                    onChange={(e) => setFormData({ ...formData, buying_link: e.target.value })}
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    className="w-full p-2 border rounded"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditProduct}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Delete Product</h2>
                <p className="mb-4">
                  Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
