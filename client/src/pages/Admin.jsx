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
  const [showModal, setShowModal] = useState(false);
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
    socials: '',
    topFestivals: '',
  });
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: token,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [products]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/all', {
          headers: {
            Authorization: token,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleShowModal = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const update = (product) => {
    handleShowModal(product);
  };

  const updateProduct = async (productId, product) => {
    try {
      console.log('Updating product with:', product);
      const token = localStorage.getItem('token');
      await axios.put(`/api/products/${productId}`, product, {
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
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const createProduct = async () => {
    try {
      console.log('Product  being created:', newProduct);
      const token = localStorage.getItem('token');
      await axios.post('/api/products', newProduct, {
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
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      // remove the deleted product from the products state
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  // Create User Profile
  const createUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/users/profile', newUser, {
        headers: {
          Authorization: token,
        },
      });
      // Optionally, fetch users again to refresh the list or just update the state
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
                    variant="warning"
                    className="me-2"
                    size="sm"
                    onClick={() => update(product)}
                  >
                    Update
                  </Button>
                  <Button
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
              variant="primary"
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
            <Button variant="primary" onClick={createProduct}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Users Table */}

        <div className="d-flex justify-content-between align-items-center">
          <h1>Users </h1>
          <Button variant="warning" onClick={() => setShowNewUserModal(true)}>
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
                  <Button variant="warning" size="sm">
                    Update
                  </Button>
                  <Button variant="danger" size="sm">
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
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
            <Button variant="primary" onClick={createUser}>
              Add User
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Admin;
