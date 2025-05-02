import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const [editProduct, setEditProduct] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    availability: true,
    imageUrl: 'logo.png',
  });
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    availability: true,
    imageUrl: 'logo.png',
  });
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    aboutMe: '',
    socials: [],
    topFestivals: [],
  });
  const [updateUser, setUpdateUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    aboutMe: '',
    socials: [],
    topFestivals: [],
  });

  // gets products from db
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: token,
          },
        });
        response ? setProducts(response.data) : setProducts([]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [refreshData]);

  //gets all users from db
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/all', {
          headers: {
            Authorization: token,
          },
        });
        response ? setUsers(response.data) : setUsers([]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [updateUser]);

  const handleShowModal = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const update = (product) => {
    handleShowModal(product);
  };

  // shows updated user modal
  const handleShowUpdateUserModal = (user) => {
    setUpdateUser(user);
    setShowUpdateUserModal(true);
  };

  // updates 1 product
  const updateProduct = async (productId, product) => {
    try {
      console.log('Updating product with:', product);
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/products/${productId}`, product, {
        headers: {
          Authorization: token,
        },
      });
      // update the product in the products state
      setProducts(
        products.map((product) =>
          product._id === productId ? { ...product, ...product } : product
        )
      );
      setRefreshData(prev => prev + 1); // Increment to trigger refresh
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // creates new product
  const createProduct = async () => {
    try {
      console.log('Product  being created:', newProduct);
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/products', newProduct, {
        headers: {
          Authorization: token,
        },
      });
      // add the new product to the products state
      setProducts([...products, newProduct]);
      setShowNewProductModal(false); // Close the modal
      // Reset the newProduct state
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        availability: true,
        imageUrl: 'logo.png',
      });
      setRefreshData(prev => prev + 1);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/admin/products/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      // remove the deleted product from the products state
      setProducts(products.filter((product) => product._id !== productId));
      setRefreshData(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Create User Profile
  const createUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/users/profile', newUser, {
        headers: {
          Authorization: token,
        },
      });
      // Update the users state
      setUsers([...users, newUser]);
      setShowNewUserModal(false); // Close the modal
      // Reset the newUser state
      setNewUser({
        username: '',
        name: '',
        email: '',
        password: '',
        aboutMe: '',
        socials: '',
        topFestivals: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Update User Profile
  const updateUserProfile = async (userId, updateUser) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/profile`, updateUser, {
        headers: {
          Authorization: token,
        },
      });
      // Update the users state
      setUsers(
        users.map((user) =>
          user.username === updateUser.username
            ? { ...user, ...updateUser }
            : user
        )
      );
      // Reset the newUser state
      setUpdateUser({
        username: '',
        name: '',
        email: '',
        password: '',
        aboutMe: '',
        socials: '',
        topFestivals: '',
      });
      setShowUpdateUserModal(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  // deletes 1 user
  const deleteUser = async (userId) => {
    console.log('Deleting user with id:', userId);
    try {
      await axios.delete(`/api/admin/users/profile/${userId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      // Remove the deleted user from the users state
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  // displays all product and user info
  return (
    <div>
      <Container className="text-white">
        {/* Products Table */}
        <div className="d-flex justify-content-between align-items-center">
          <h1>Product Inventory</h1>
          <Button
            variant="warning"
            onClick={() => setShowNewProductModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-plus-square"
              viewBox="0 0 18 18"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>{' '}
            New
          </Button>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.availability ? 'in stock' : 'out of stock'}</td>
                <td className="d-flex justify-content-around">
                  <Button
                    variant="light"
                    style={{
                      backgroundColor: '#1B998B',
                      border: 'none',
                    }}
                    className="me-2"
                    size="sm"
                    onClick={() => update(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 18 18"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>{' '}
                    Update
                  </Button>
                  <Button
                    style={{
                      color: 'red',
                      backgroundColor: '#333333',
                      border: ' 1px solid red',
                    }}
                    variant="danger"
                    size="sm"
                    onClick={() => deleteProduct(product._id)}
                  >
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 17"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>{' '}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Update Product Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Product description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="crowns">Crowns</option>
                  <option value="clothes">Clothes</option>
                  <option value="costumes">Costumes</option>
                  <option value="accessories">Accessories</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  value={editProduct.availability ? 'true' : 'false'}
                  onChange={(e) => {
                    console.log('Before update:', editProduct.availability);
                    const updatedAvailability = e.target.value === 'true';
                    setEditProduct({
                      ...editProduct,
                      availability: updatedAvailability,
                    });
                    console.log('After update:', updatedAvailability);
                  }}
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productImageUrl">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  value={editProduct.imageUrl}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, imageUrl: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              style={{ backgroundColor: '#ED217C' }}
              variant="dark"
              onClick={() => {
                updateProduct(editProduct._id, editProduct);
                setShowModal(false);
              }}
            >
              Update Product
            </Button>
          </Modal.Footer>
        </Modal>

        {/* New Product Modal */}
        <Modal
          show={showNewProductModal}
          onHide={() => setShowNewProductModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Product description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="crowns">Crowns</option>
                  <option value="clothes">Clothes</option>
                  <option value="costumes">Costumes</option>
                  <option value="accessories">Accessories</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  value={newProduct.availability ? 'true' : 'false'}
                  onChange={(e) => {
                    const availability = e.target.value === 'true';
                    setNewProduct({
                      ...newProduct,
                      availability,
                    });
                  }}
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productImageUrl">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image Url"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowNewProductModal(false)}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: '#ED217C' }}
              variant="dark"
              onClick={createProduct}
            >
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Users Table */}
        {users.length === 0 ? (
          <div className="text-center">
            <h1>No Users</h1>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h1>Users </h1>
              <Button
                variant="warning"
                onClick={() => setShowNewUserModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-plus-square"
                  viewBox="0 0 18 18"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>{' '}
                New
              </Button>
            </div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>About</th>
                  <th>Socials</th>
                  <th>Festivals</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.aboutMe}</td>
                    <td>{user.socials}</td>
                    <td>{user.topFestivals}</td>
                    <td className="d-flex justify-content-around">
                      <Button
                        style={{ backgroundColor: '#1B998B', border: 'none' }}
                        variant="light"
                        size="sm"
                        onClick={() => handleShowUpdateUserModal(user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 18 18"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>{' '}
                        Update
                      </Button>
                      <Button
                        style={{
                          color: 'red',
                          backgroundColor: '#333333',
                          border: ' 1px solid red',
                        }}
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        {/* New User Modal */}
        <Modal
          show={showNewUserModal}
          onHide={() => setShowNewUserModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="aboutMe">
                <Form.Label>About</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter about me"
                  value={newUser.aboutMe}
                  onChange={(e) =>
                    setNewUser({ ...newUser, aboutMe: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="socials">
                <Form.Label>Socials</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter socials"
                  value={newUser.socials}
                  onChange={(e) =>
                    setNewUser({ ...newUser, socials: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="topFestivals">
                <Form.Label>Festivals</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter top festivals"
                  value={newUser.topFestivals}
                  onChange={(e) =>
                    setNewUser({ ...newUser, topFestivals: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowNewUserModal(false)}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: '#ED217C' }}
              variant="dark"
              onClick={createUser}
            >
              Add User
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Update User Modal */}
        <Modal
          show={showUpdateUserModal}
          onHide={() => setShowUpdateUserModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="updateUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={updateUser.username || ''}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="updateEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={updateUser.email || ''}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="updatePassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={updateUser.password || ''}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="updateAboutMe">
                <Form.Label>About</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter about me"
                  value={updateUser.aboutMe || ''}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, aboutMe: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="updateSocials">
                <Form.Label>Socials</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter socials"
                  value={updateUser.socials || []}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, socials: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="updateTopFestivals">
                <Form.Label>Festivals</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter top festivals"
                  value={updateUser.topFestivals || []}
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      topFestivals: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUpdateUserModal(false)}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: '#ED217C' }}
              variant="dark"
              onClick={() => updateUserProfile(updateUser._id, updateUser)}
            >
              Update User
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Admin;
