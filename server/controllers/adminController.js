import User from './../models/profileModels/userModel/user.js';
import Product from './../models/mainModels/productModel/product.js';
import { hashPassword } from './../utils/auth.js';

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Deleted User:', user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, username, email, password, socials, aboutMe, topFestivals } =
      req.body;

    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (socials !== undefined) updateFields.socials = socials;
    if (aboutMe !== undefined) updateFields.aboutMe = aboutMe;
    if (topFestivals !== undefined) updateFields.topFestivals = topFestivals;

    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      updateFields.username = username;
    }

    if (password) {
      updateFields.password = await hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Updated User:', user);
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, availability, imageUrl } =
      req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      availability,
      imageUrl,
    });
    const savedProduct = await product.save();
    console.log('New Product:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, category, availability, imageUrl } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, availability, imageUrl },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Updated Product:', product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Deleted Product:', product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  deleteUser,
  updateUserById,
  deleteProduct,
  updateProduct,
  createProduct,
};
