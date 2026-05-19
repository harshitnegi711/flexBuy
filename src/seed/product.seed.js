import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";


const products = [
  {
    productName: "iPhone 15",
    price: 79999,
    description: "Apple smartphone with A16 chip and dual camera.",
    productImage: "https://picsum.photos/200?1"
  },
  {
    productName: "Samsung Galaxy S24",
    price: 74999,
    description: "Flagship Android phone with AMOLED display.",
    productImage: "https://picsum.photos/200?2"
  },
  {
    productName: "MacBook Air M3",
    price: 114999,
    description: "Lightweight laptop with Apple M3 chip.",
    productImage: "https://picsum.photos/200?3"
  },
  {
    productName: "Dell XPS 15",
    price: 129999,
    description: "Premium laptop for developers and creators.",
    productImage: "https://picsum.photos/200?4"
  },
  {
    productName: "Sony WH-1000XM5",
    price: 29999,
    description: "Noise-cancelling wireless headphones.",
    productImage: "https://picsum.photos/200?5"
  },
  {
    productName: "Apple Watch Series 10",
    price: 42999,
    description: "Smartwatch with health tracking features.",
    productImage: "https://picsum.photos/200?6"
  },
  {
    productName: "iPad Air",
    price: 59999,
    description: "Powerful tablet for productivity and media.",
    productImage: "https://picsum.photos/200?7"
  },
  {
    productName: "Logitech MX Master 3S",
    price: 8999,
    description: "Wireless productivity mouse.",
    productImage: "https://picsum.photos/200?8"
  },
  {
    productName: "Mechanical Keyboard RGB",
    price: 4999,
    description: "RGB mechanical keyboard with blue switches.",
    productImage: "https://picsum.photos/200?9"
  },
  {
    productName: "OnePlus 13",
    price: 64999,
    description: "High-performance Android smartphone.",
    productImage: "https://picsum.photos/200?10"
  },
  {
    productName: "Boat Rockerz 550",
    price: 2499,
    description: "Wireless over-ear headphones.",
    productImage: "https://picsum.photos/200?11"
  },
  {
    productName: "Canon EOS R50",
    price: 68999,
    description: "Mirrorless camera for photography and video.",
    productImage: "https://picsum.photos/200?12"
  },
  {
    productName: "PlayStation 5",
    price: 54999,
    description: "Next-generation gaming console.",
    productImage: "https://picsum.photos/200?13"
  },
  {
    productName: "Xbox Series X",
    price: 52999,
    description: "Powerful gaming console with Game Pass support.",
    productImage: "https://picsum.photos/200?14"
  },
  {
    productName: "Nike Air Max",
    price: 7999,
    description: "Comfortable sports shoes.",
    productImage: "https://picsum.photos/200?15"
  },
  {
    productName: "Puma Running Shoes",
    price: 4999,
    description: "Lightweight running shoes.",
    productImage: "https://picsum.photos/200?16"
  },
  {
    productName: "Samsung 55-inch Smart TV",
    price: 54999,
    description: "4K UHD Smart TV with HDR support.",
    productImage: "https://picsum.photos/200?17"
  },
  {
    productName: "Amazon Echo Dot",
    price: 4499,
    description: "Smart speaker with voice assistant.",
    productImage: "https://picsum.photos/200?18"
  },
  {
    productName: "HP Pavilion Gaming Laptop",
    price: 74999,
    description: "Gaming laptop with RTX graphics.",
    productImage: "https://picsum.photos/200?19"
  },
  {
    productName: "JBL Flip 6",
    price: 9999,
    description: "Portable Bluetooth speaker.",
    productImage: "https://picsum.photos/200?20"
  }
];
